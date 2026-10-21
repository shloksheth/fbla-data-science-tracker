import { LETTERS, normalizeSet, parseQuestions, grade, importExample, generationPrompt, starterSet } from './core.mjs';
import { renderTracker, validateTracker, mergeTrackers, dayKey, showScheduledObjectives } from './tracker.mjs';
import { renderSchedule, formatDay } from './schedule.mjs?v=20261020-schedule2';
import { scheduleDay, scheduledObjectives, validateSchedule, mergeSchedule } from './schedule-data.mjs?v=20261020-schedule2';

const app = document.getElementById('app');
const STORAGE = 'set-sprint-v1';
const draftKey = 'set-sprint-import-draft';
const uid = () => crypto.randomUUID();
let db;
let storageBroken = false;
try {
  const saved = localStorage.getItem(STORAGE);
  db = saved ? JSON.parse(saved) : { version: 1, sets: [{ ...normalizeSet(starterSet), id: uid(), createdAt: Date.now(), starter: true }], attempts: [], session: null };
  if (db.version !== 1 || !Array.isArray(db.sets) || !Array.isArray(db.attempts)) throw new Error('Invalid saved library.');
  db.sets.forEach(normalizeSet);
} catch {
  db = { version: 1, sets: [], attempts: [], session: null };
  storageBroken = true;
}
db.tracker = db.tracker || { records: {}, logs: [] };
db.schedule = validateSchedule(db.schedule);
let lastToday = dayKey();
let scheduleDate = lastToday;
let view = 'tracker';
let selectedId = null;
let draft = { title: '', topic: '', raw: '' };
try { draft = { ...draft, ...JSON.parse(localStorage.getItem(draftKey) || '{}') }; } catch {}
let preview = null;
let importError = '';
let reviewFilter = 'missed';
let completedAttempt = null;
let toastTimer;

function el(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (key.startsWith('on')) element.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'class') element.className = value;
    else if (key in element && !key.startsWith('aria')) element[key] = value;
    else element.setAttribute(key, String(value));
  }
  children.flat().forEach(child => {
    if (child !== null && child !== undefined) element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  });
  return element;
}
const button = (text, click, style = '', attrs = {}) => el('button', { type: 'button', class: 'button ' + style, onclick: click, ...attrs }, text);
function toast(message) {
  const box = document.getElementById('toast');
  box.textContent = message;
  box.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { box.hidden = true; }, 4200);
}
function persist() {
  if (storageBroken) { toast('Browser storage could not be read. Export your work before closing this page.'); return false; }
  try { localStorage.setItem(STORAGE, JSON.stringify(db)); return true; }
  catch { toast('Browser storage is full or unavailable. Export your sets before closing.'); return false; }
}
function saveDraft() {
  try { localStorage.setItem(draftKey, JSON.stringify(draft)); } catch {}
}
function go(next, id = selectedId) {
  view = next;
  selectedId = id;
  render();
  window.scrollTo({ top: 0 });
  app.focus({ preventScroll: true });
}
function time(milliseconds) {
  const seconds = Math.floor(Math.max(0, milliseconds) / 1000);
  return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
}
function date(value) { return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); }
function exportJSON(value, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }));
  const link = el('a', { href: url, download: filename });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function copy(text, message) {
  try { await navigator.clipboard.writeText(text); toast(message); }
  catch { toast('Clipboard unavailable. Select and copy the text in the prompt box.'); }
}
function confirmAction(title, text, action, callback) {
  const dialog = document.getElementById('confirm-dialog');
  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-text').textContent = text;
  document.getElementById('confirm-action').textContent = action;
  dialog.returnValue = '';
  dialog.addEventListener('close', () => { if (dialog.returnValue === 'confirm') callback(); }, { once: true });
  dialog.showModal();
}
function field(label, input, hint) {
  return el('label', { class: 'field' }, label, input, hint ? el('span', { class: 'hint' }, hint) : null);
}
function selectedSet() { return db.sets.find(set => set.id === selectedId); }
function backup() {
  exportJSON({ type: 'set-sprint-backup', version: 1, sets: db.sets, attempts: db.attempts, tracker: db.tracker, schedule: db.schedule }, 'data-science-backup.json');
}
function trackerPage() {
  const daily = { date: scheduleDate, label: formatDay(scheduleDate), title: scheduleDay(scheduleDate)?.title || '', ids: scheduledObjectives(scheduleDate, db.schedule), open: () => go('schedule') };
  renderTracker({ app, el, button, tracker: db.tracker, save: persist, exportBackup: backup, openSets: () => go('library'), toast, daily });
}
function schedulePage() {
  renderSchedule({ app, el, button, date: scheduleDate, progress: db.schedule, save: persist,
    chooseDate: value => { if (value) { scheduleDate = value; render(); } },
    openTracker: () => { showScheduledObjectives(); go('tracker'); }, openSets: () => go('library') });
}
function library() {
  const questionCount = db.sets.reduce((sum, set) => sum + set.questions.length, 0);
  const bestAverage = db.attempts.length ? Math.round(db.attempts.reduce((sum, attempt) => sum + attempt.percent, 0) / db.attempts.length) : null;
  const hero = el('section', { class: 'hero' },
    el('div', {},
      el('p', { class: 'eyebrow' }, 'DATA SCIENCE & AI · FBLA'),
      el('h1', {}, 'Question sets'),
      el('p', { class: 'lead' }, 'Import questions, practice, and review results.'),
      el('div', { class: 'actions' }, button('+ Add a question set', () => openImport()), button('Import a file', () => chooseFile(), 'secondary'))
    )
  );
  const stat = (label, value, suffix) => el('div', { class: 'stat' }, el('span', { class: 'stat-label' }, label), el('span', { class: 'stat-value' }, value, suffix ? el('small', {}, suffix) : null));
  app.append(hero);
  if (storageBroken) app.append(el('div', { class: 'error', role: 'alert' }, 'Saved browser data could not be read. This page will not overwrite it. Export any work you create here before closing.'));
  if (db.session) app.append(el('div', { class: 'resume' },
    el('div', {}, el('strong', {}, 'Your practice is waiting'), el('p', {}, db.session.title + ' · Question ' + (db.session.index + 1) + ' of ' + db.session.questions.length)),
    button('Resume →', () => go('quiz'), 'small')));
  app.append(el('section', { class: 'stats', 'aria-label': 'Your practice statistics' },
    stat('SAVED SETS', db.sets.length),
    stat('IN YOUR LIBRARY', questionCount, 'questions'),
    stat('AVERAGE SCORE', bestAverage === null ? '—' : bestAverage + '%', db.attempts.length + ' completed')
  ));
  app.append(el('div', { class: 'section-row' },
    el('h2', {}, 'Your question sets', el('span', { class: 'count' }, db.sets.length + ' sets')),
    el('div', { class: 'toolbar' }, button('Export backup', backup, 'quiet small'))
  ));
  const grid = el('section', { class: 'grid', 'aria-label': 'Question sets' });
  db.sets.forEach(set => {
    const attempts = db.attempts.filter(a => a.setId === set.id && !a.retry);
    const best = attempts.length ? Math.max(...attempts.map(a => a.percent)) : null;
    grid.append(el('article', { class: 'set-card' },
      el('span', { class: 'tag' }, set.topic || 'Mixed practice'),
      el('h3', {}, set.title),
      el('p', { class: 'meta' }, set.questions.length + ' questions · ' + (set.starter ? 'Original starter set' : 'Added ' + date(set.createdAt))),
      el('div', { class: 'bottom' }, el('span', { class: 'best' }, best === null ? 'No completed rounds' : 'Best score ' + best + '%'), button('Open set', () => go('detail', set.id), 'secondary small', { 'aria-label': 'Open ' + set.title }))
    ));
  });
  grid.append(el('button', { class: 'set-card add-card', onclick: () => openImport() }, el('strong', {}, 'Add question set'), el('span', {}, 'Paste questions or import a JSON or text file.')));
  app.append(grid, el('p', { class: 'storage-note' }, 'Your sets and results stay in this browser. Export a backup to move them to another device. Practice questions are not official FBLA exam items.'));
}
function openImport() { preview = null; importError = ''; go('import'); }
function chooseFile() { document.getElementById('file-input').click(); }
function importPage() {
  app.append(button('← Your sets', () => go('library'), 'quiet back'));
  app.append(el('div', { class: 'page-intro' }, el('h1', {}, 'Add question set'), el('p', { class: 'lead' }, 'Paste JSON or numbered multiple-choice questions with answers. Preview before saving.')));
  const content = el('section', { class: 'panel' });
  if (importError) content.append(el('div', { class: 'error', role: 'alert' }, importError));
  if (preview) {
    content.append(el('div', { class: 'success' }, '✓ ' + preview.questions.length + ' questions validated. Check the content below, then save.'));
    const titleInput = el('input', { value: draft.title || preview.title, placeholder: 'Give this set a name', maxLength: 150, oninput: e => { draft.title = e.target.value; saveDraft(); } });
    const topicInput = el('input', { value: draft.topic || preview.topic, placeholder: 'e.g. SQL · joins', maxLength: 100, oninput: e => { draft.topic = e.target.value; saveDraft(); } });
    content.append(field('Set name', titleInput), field('Topic (optional)', topicInput));
    const list = el('div', { class: 'preview-list', tabindex: 0, 'aria-label': 'Imported question preview' });
    preview.questions.forEach((q, i) => list.append(el('div', { class: 'preview-q' },
      el('p', {}, (i + 1) + '. ' + q.question),
      q.options.map((option, j) => el('p', { class: 'meta' }, LETTERS[j] + '. ' + option)),
      el('p', { class: 'answer-line' }, 'Answer: ' + LETTERS[q.answerIndex]),
      el('p', { class: 'meta' }, q.explanation || 'No explanation provided.')
    )));
    content.append(list, el('div', { class: 'actions' },
      button('Save set →', () => {
        const name = titleInput.value.trim();
        if (!name) { titleInput.focus(); toast('Give your set a name first.'); return; }
        const set = { ...preview, title: name, topic: topicInput.value.trim(), id: uid(), createdAt: Date.now() };
        db.sets.unshift(set);
        const saved = persist();
        draft = { title: '', topic: '', raw: '' };
        saveDraft();
        preview = null;
        go('detail', set.id);
        if (saved) toast('Set saved.');
      }),
      button('Back to editing', () => { preview = null; render(); }, 'secondary')));
  } else {
    const rawInput = el('textarea', { value: draft.raw, placeholder: '1. Your question goes here\nA. First choice\nB. Second choice\nC. Third choice\nD. Fourth choice\nAnswer: B\nExplanation: Why B is correct.', spellcheck: false, oninput: e => { draft.raw = e.target.value; saveDraft(); } });
    content.append(el('div', { class: 'field-row' },
      field('Set name (or use the imported title)', el('input', { value: draft.title, placeholder: 'e.g. SQL — round two', maxLength: 150, oninput: e => { draft.title = e.target.value; saveDraft(); } })),
      field('Topic (optional)', el('input', { value: draft.topic, placeholder: 'e.g. Tools for Data & AI', maxLength: 100, oninput: e => { draft.topic = e.target.value; saveDraft(); } }))
    ));
    content.append(field('Paste your questions', rawInput, 'Accepts JSON, numbered text, and copied code blocks. Each question needs choices and a correct answer. Up to 500 questions per set.'));
    content.append(el('div', { class: 'actions' }, button('Preview questions →', () => {
      try { preview = parseQuestions(draft.raw); importError = ''; }
      catch (error) { importError = error.message; }
      render();
    }), button('Import a file', chooseFile, 'secondary'), button('Try an example', () => { draft.raw = importExample; draft.title = ''; draft.topic = 'SQL'; saveDraft(); render(); }, 'quiet')));
  }
  const aside = el('aside', {},
    el('section', { class: 'panel soft', style: 'margin-bottom:18px' },
      el('h3', {}, 'Generate an importable set'),
      el('ol', {}, el('li', {}, 'Copy the question prompt below.'), el('li', {}, 'Choose your topic and question count in chat.'), el('li', {}, 'Paste the generated JSON and save.')),
      button('Copy question prompt', () => copy(generationPrompt, 'Prompt copied. Replace [TOPIC] and [NUMBER] in chat.'), 'secondary small'),
      el('details', { style: 'margin-top:16px' }, el('summary', { class: 'notice' }, 'View prompt'), el('p', { class: 'mono', tabindex: 0 }, generationPrompt))
    ),
    el('section', { class: 'panel' }, el('h3', {}, 'A simple format works.'), el('p', {}, 'JSON is the most reliable option. Numbered text works too:'), el('div', { class: 'mono' }, '1. Question text\nA. Option one\nB. Option two\nC. Option three\nD. Option four\nAnswer: B\nExplanation: Your explanation.'))
  );
  app.append(el('div', { class: 'two-col' }, content, aside));
}
function detail() {
  const set = selectedSet();
  if (!set) { go('library'); return; }
  const attempts = db.attempts.filter(a => a.setId === set.id).slice().reverse();
  app.append(button('← Your sets', () => go('library'), 'quiet back'));
  const wrap = el('div', { class: 'detail-layout' });
  wrap.append(el('div', { class: 'detail-head' },
    el('div', {}, el('span', { class: 'tag' }, set.topic || 'Mixed practice'), el('h1', {}, set.title), el('p', { class: 'lead' }, set.questions.length + ' questions · Original practice material')),
    button('Export set ↓', () => exportJSON({ title: set.title, topic: set.topic, questions: set.questions }, 'practice-set.json'), 'secondary small')
  ));
  const shuffle = el('input', { type: 'checkbox', id: 'shuffle' });
  wrap.append(el('label', { class: 'checks' }, shuffle, 'Shuffle question order'));
  const mode = (icon, title, description, value) => el('button', { class: 'mode', onclick: () => startSession(set, value, shuffle.checked) },
    el('strong', {}, title), el('p', {}, description), el('span', { class: 'start-label' }, 'Start ' + (value === 'study' ? 'practice' : 'test')));
  wrap.append(el('div', { class: 'mode-grid' },
    mode('✧', 'Learn as you go', 'Check each answer, read the explanation, and keep moving at your own pace.', 'study'),
    mode('◷', 'Timed test', 'Answers stay hidden until you finish. A 50-minute limit mirrors the national test window.', 'exam')
  ));
  wrap.append(el('p', { class: 'notice' }, 'For a full diagnostic, import a fresh 100-question set. Shorter sets still use a 50-minute maximum in test mode. The timer keeps running if you leave or reload.'));
  const history = el('section', { class: 'panel', style: 'margin-top:28px' }, el('h2', {}, 'Your rounds'));
  if (!attempts.length) history.append(el('p', {}, 'No completed rounds.'));
  attempts.slice(0, 12).forEach(attempt => history.append(el('div', { class: 'attempt' },
    el('div', {}, el('strong', {}, attempt.percent + '%'), el('span', {}, ' · ' + attempt.correct + '/' + attempt.total + (attempt.retry ? ' · Mistake review' : ' · ' + (attempt.mode === 'exam' ? 'Timed test' : 'Practice')))),
    el('span', {}, date(attempt.completedAt) + ' · ' + time(attempt.elapsed))
  )));
  wrap.append(history, button('Delete set', () => confirmAction('Delete this set?', 'This removes the set and its results from this browser. Export it first if you want a backup.', 'Delete set', () => {
    db.sets = db.sets.filter(s => s.id !== set.id);
    db.attempts = db.attempts.filter(a => a.setId !== set.id);
    if (db.session?.setId === set.id) db.session = null;
    persist(); go('library'); toast('Set deleted.');
  }), 'quiet', { style: 'margin-top:18px;color:var(--red)' }));
  app.append(wrap);
}
function startSession(set, mode, shuffled = false, retryQuestions = null) {
  const launch = () => {
    const questions = structuredClone(retryQuestions || set.questions);
    if (shuffled) for (let i = questions.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [questions[i], questions[j]] = [questions[j], questions[i]]; }
    db.session = { id: uid(), setId: set.id, title: set.title, mode, retry: !!retryQuestions, questions, answers: Array(questions.length).fill(null), checked: Array(questions.length).fill(false), flagged: Array(questions.length).fill(false), index: 0, startedAt: Date.now() };
    persist(); go('quiz', set.id);
  };
  if (db.session) confirmAction('Start a new round?', 'Your unfinished round will be replaced. Your saved sets and completed results stay available.', 'Start new round', launch);
  else launch();
}
function quiz() {
  const s = db.session;
  if (!s) { go('library'); return; }
  const i = s.index;
  const q = s.questions[i];
  const answered = s.answers.filter(a => a !== null).length;
  const wrap = el('div', { class: 'quiz-wrap' });
  wrap.append(el('div', { class: 'quiz-top' }, el('div', {}, button('← Save & leave', () => { persist(); go('library'); }, 'quiet back', { style: 'margin-bottom:12px' }), el('h1', {}, s.title)), el('span', { class: 'timer', id: 'timer', 'aria-label': 'Practice timer' }, '00:00')));
  wrap.append(el('div', { class: 'quiz-label' }, el('span', {}, (s.mode === 'exam' ? 'TIMED TEST' : 'PRACTICE') + ' · QUESTION ' + (i + 1) + ' OF ' + s.questions.length), el('span', {}, answered + ' answered')));
  wrap.append(el('div', { class: 'progress', role: 'progressbar', 'aria-label': 'Questions answered', 'aria-valuemin': 0, 'aria-valuemax': s.questions.length, 'aria-valuenow': answered }, el('span', { style: 'width:' + (answered / s.questions.length * 100) + '%' })));
  const card = el('section', { class: 'question-card', 'aria-label': 'Question ' + (i + 1) });
  card.append(el('div', { class: 'quiz-label' }, el('span', { class: 'tag' }, q.topic || 'Mixed practice'), el('button', { class: 'flag ' + (s.flagged[i] ? 'active' : ''), 'aria-pressed': s.flagged[i], onclick: () => { s.flagged[i] = !s.flagged[i]; persist(); render(); } }, s.flagged[i] ? '⚑ Flagged for review' : '⚑ Flag for review')));
  card.append(el('h2', {}, q.question));
  const revealed = s.mode === 'study' && s.checked[i];
  const options = el('div', { class: 'options', role: 'group', 'aria-label': 'Answer choices' });
  q.options.forEach((option, j) => {
    let style = s.answers[i] === j ? ' selected' : '';
    if (revealed && j === q.answerIndex) style += ' correct';
    else if (revealed && s.answers[i] === j) style += ' wrong';
    options.append(el('button', { class: 'option' + style, disabled: revealed, 'aria-pressed': s.answers[i] === j, onclick: () => { s.answers[i] = j; persist(); render(); } },
      el('span', { class: 'letter' }, LETTERS[j]), el('span', {}, option, revealed && j === q.answerIndex ? ' ✓' : '')
    ));
  });
  card.append(options);
  if (revealed) card.append(el('div', { class: 'explanation ' + (s.answers[i] === q.answerIndex ? '' : 'incorrect'), role: 'status' },
    el('strong', {}, s.answers[i] === q.answerIndex ? 'Correct.' : 'Correct answer: ' + LETTERS[q.answerIndex]),
    el('p', {}, q.explanation || 'No explanation was included in this set. Review this concept before your next round.')));
  wrap.append(card);
  const primary = s.mode === 'study' && !revealed ? button('Check answer', () => { s.checked[i] = true; persist(); render(); }, '', { disabled: s.answers[i] === null }) :
    button(i === s.questions.length - 1 ? 'Finish round →' : 'Next question →', () => {
      if (i === s.questions.length - 1) requestFinish();
      else { s.index++; persist(); render(); window.scrollTo({ top: 0 }); }
    });
  wrap.append(el('div', { class: 'quiz-actions' },
    button('← Previous', () => { s.index--; persist(); render(); }, 'secondary', { disabled: i === 0 }),
    el('div', { class: 'actions' }, button('Finish now', requestFinish, 'quiet'), primary)
  ));
  const map = el('nav', { class: 'question-map', 'aria-label': 'Jump to a question' });
  s.questions.forEach((_, j) => map.append(el('button', { class: 'q-dot' + (s.answers[j] !== null ? ' answered' : '') + (j === i ? ' current' : '') + (s.flagged[j] ? ' flagged' : ''), 'aria-label': 'Question ' + (j + 1) + (s.answers[j] !== null ? ', answered' : ', unanswered') + (s.flagged[j] ? ', flagged' : ''), 'aria-current': j === i ? 'step' : null, onclick: () => { s.index = j; persist(); render(); } }, j + 1)));
  wrap.append(map);
  if (s.mode === 'study') wrap.append(el('p', { class: 'notice', style: 'margin-top:18px' }, 'Your answers save automatically. The practice timer measures elapsed time, including time away.'));
  app.append(wrap);
  updateTimer();
}
function requestFinish() {
  const s = db.session;
  if (!s) return;
  const unanswered = s.answers.filter(a => a === null).length;
  if (unanswered) confirmAction('Finish with unanswered questions?', unanswered + ' unanswered question' + (unanswered === 1 ? ' will' : 's will') + ' count as incorrect. You can review them afterward.', 'Finish round', finish);
  else finish();
}
function finish(expired = false) {
  const s = db.session;
  if (!s) return;
  const result = { ...s, ...grade(s.questions, s.answers), completedAt: Date.now(), elapsed: Math.min(Date.now() - s.startedAt, s.mode === 'exam' ? 50 * 60 * 1000 : Infinity), expired: expired === true };
  db.attempts.push(result);
  db.session = null;
  completedAttempt = result;
  reviewFilter = 'missed';
  persist(); go('results');
}
function updateTimer() {
  const s = db.session;
  if (!s) return;
  const elapsed = Date.now() - s.startedAt;
  if (s.mode === 'exam' && elapsed >= 50 * 60 * 1000) {
    const dialog = document.getElementById('confirm-dialog');
    if (dialog.open) { dialog.returnValue = 'cancel'; dialog.close(); }
    finish(true); return;
  }
  const node = document.getElementById('timer');
  if (node) node.textContent = s.mode === 'exam' ? time(50 * 60 * 1000 - elapsed) + ' left' : time(elapsed);
}
function results() {
  const a = completedAttempt;
  if (!a) { go('library'); return; }
  const missed = a.questions.filter((q, i) => a.answers[i] !== q.answerIndex);
  const review = a.questions.filter((q, i) => a.answers[i] !== q.answerIndex || a.flagged[i]);
  const wrap = el('div', { class: 'quiz-wrap' });
  wrap.append(button('← Back to set', () => go('detail', a.setId), 'quiet back'));
  wrap.append(el('section', { class: 'score-panel' }, el('p', { class: 'eyebrow' }, a.expired ? 'TIME IS UP · ROUND SAVED' : 'ROUND COMPLETE'), el('div', { class: 'score' }, a.percent, el('small', {}, '%')), el('h2', {}, a.correct + ' of ' + a.total + ' correct'), el('p', {}, a.title + ' · ' + time(a.elapsed) + ' elapsed · ' + missed.length + ' to revisit')));
  const set = db.sets.find(s => s.id === a.setId);
  wrap.append(el('div', { class: 'actions' },
    review.length && set ? button('Practice missed & flagged (' + review.length + ')', () => startSession(set, 'study', true, review)) : null,
    set ? button('Practice full set again', () => startSession(set, 'study', true), 'secondary') : null,
    button('Your sets', () => go('library'), 'quiet')
  ));
  wrap.append(el('div', { class: 'filter-row' }, ...[['missed', 'Missed (' + missed.length + ')'], ['flagged', 'Flagged (' + a.flagged.filter(Boolean).length + ')'], ['all', 'All questions']].map(([key, label]) => button(label, () => { reviewFilter = key; render(); }, 'secondary small ' + (reviewFilter === key ? 'active' : '')))));
  let visible = 0;
  a.questions.forEach((q, i) => {
    const correct = a.answers[i] === q.answerIndex;
    if (reviewFilter === 'missed' && correct || reviewFilter === 'flagged' && !a.flagged[i]) return;
    visible++;
    wrap.append(el('article', { class: 'panel review-card' },
      el('p', { class: 'review-title' }, (correct ? '✓ ' : '↺ ') + (i + 1) + '. ' + q.question),
      el('p', {}, 'Your answer: ' + (a.answers[i] === null ? 'Unanswered' : LETTERS[a.answers[i]] + '. ' + q.options[a.answers[i]])),
      !correct ? el('p', { style: 'color:var(--green)' }, 'Correct answer: ' + LETTERS[q.answerIndex] + '. ' + q.options[q.answerIndex]) : null,
      el('p', { class: 'explain' }, q.explanation || 'No explanation was included. Revisit this concept before your next round.')
    ));
  });
  if (!visible) wrap.append(el('p', { class: 'notice' }, reviewFilter === 'missed' ? 'No missed questions in this round. Try a fresh set to check your understanding.' : 'No questions flagged in this round.'));
  app.append(wrap);
}
function render() {
  app.replaceChildren();
  document.getElementById('library-nav').setAttribute('aria-current', view === 'library' ? 'page' : 'false');
  document.getElementById('tracker-nav').setAttribute('aria-current', view === 'tracker' ? 'page' : 'false');
  document.getElementById('schedule-nav').setAttribute('aria-current', view === 'schedule' ? 'page' : 'false');
  ({ tracker: trackerPage, schedule: schedulePage, library, import: importPage, detail, quiz, results }[view] || trackerPage)();
}

document.getElementById('brand').addEventListener('click', event => { event.preventDefault(); go('tracker'); });
document.getElementById('tracker-nav').addEventListener('click', () => go('tracker'));
document.getElementById('schedule-nav').addEventListener('click', () => go('schedule'));
document.getElementById('library-nav').addEventListener('click', () => go('library'));
document.getElementById('new-nav').addEventListener('click', () => openImport());
document.getElementById('file-input').addEventListener('change', async event => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast('Choose a file smaller than 5 MB.'); return; }
  try {
    const text = await file.text();
    let json;
    try { json = JSON.parse(text); } catch {}
    if (json?.type === 'set-sprint-backup') {
      if (!Array.isArray(json.sets)) throw new Error('This backup does not contain a sets array.');
      const incomingTracker = json.tracker ? validateTracker(json.tracker) : null;
      const incomingSchedule = json.schedule ? validateSchedule(json.schedule) : null;
      const sets = json.sets.map(s => ({ ...normalizeSet(s), id: uid(), oldId: s.id, createdAt: s.createdAt || Date.now() }));
      const idMap = new Map(sets.map(s => [s.oldId, s.id]));
      const attempts = Array.isArray(json.attempts) ? json.attempts.map(a => {
        if (!idMap.has(a.setId)) return null;
        const normalized = normalizeSet({ questions: a.questions });
        if (!Array.isArray(a.answers) || a.answers.length !== normalized.questions.length || a.answers.some((v, i) => v !== null && (!Number.isInteger(v) || v < 0 || v >= normalized.questions[i].options.length))) throw new Error('A saved result has invalid answers.');
        return { ...a, ...normalized, title: String(a.title || 'Imported set'), questions: normalized.questions, id: uid(), setId: idMap.get(a.setId), flagged: normalized.questions.map((_, i) => !!a.flagged?.[i]), ...grade(normalized.questions, a.answers) };
      }).filter(Boolean) : [];
      confirmAction('Import this backup?', 'Add ' + sets.length + ' sets and ' + attempts.length + ' results' + (incomingTracker ? ', and merge objective records and practice logs' : '') + '? Existing sets stay. Newer objective notes and statuses take precedence.', 'Import backup', () => {
        db.sets.unshift(...sets.map(({ oldId, ...s }) => s));
        db.attempts.push(...attempts);
        if (incomingTracker) db.tracker = mergeTrackers(db.tracker, incomingTracker);
        if (incomingSchedule) db.schedule = mergeSchedule(db.schedule, incomingSchedule);
        const saved = persist(); go('library'); if (saved) toast('Backup imported.');
      });
    } else {
      draft = { title: '', topic: '', raw: text };
      saveDraft(); openImport();
    }
  } catch (error) { toast(error.message || 'The file could not be read.'); }
});
document.addEventListener('keydown', event => {
  if (view !== 'quiz' || document.getElementById('confirm-dialog').open || /INPUT|TEXTAREA/.test(event.target.tagName)) return;
  const s = db.session;
  if (!s) return;
  const index = LETTERS.indexOf(event.key.toUpperCase());
  if (index >= 0 && index < s.questions[s.index].options.length && !(s.mode === 'study' && s.checked[s.index])) {
    event.preventDefault(); s.answers[s.index] = index; persist(); render();
  }
});
setInterval(updateTimer, 1000);
function refreshDay() {
  const today = dayKey();
  if (today === lastToday) return;
  // Follow midnight only when the user was viewing today, not a browsed date.
  if (scheduleDate === lastToday) scheduleDate = today;
  lastToday = today;
  if (view === 'schedule' || view === 'tracker') render();
}
setInterval(refreshDay, 60000);
window.addEventListener('focus', refreshDay);
if (!storageBroken) persist();
render();

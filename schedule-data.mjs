import { objectives } from './objectives.mjs';

export const resources = {
  guide: ['Lumanite study guide', 'https://lumanite.vercel.app/event/data_science_and_ai/study-guide'],
  practice: ['Lumanite practice', 'https://lumanite.vercel.app/practice/data_science_and_ai'],
  sql: ['SQLBolt lessons', 'https://sqlbolt.com/'],
  pandas: ['Pandas: tables', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html'],
  subset: ['Pandas: select rows and columns', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html'],
  groups: ['Pandas: summary statistics', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html'],
  merge: ['Pandas: combine tables', 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html'],
  nn: ['Google: neural networks', 'https://developers.google.com/machine-learning/crash-course/neural-networks'],
  llm: ['Google: LLM introduction', 'https://developers.google.com/machine-learning/crash-course/llm']
};
const all = objectives.map(o => o.id);
const unit = n => all.filter(id => id.startsWith(n + '.'));
const task = (title, minutes, detail, links = []) => ({ title, minutes, detail, links });
const cards = (detail = 'Recall due cards before revealing the answer. Put missed cards back in the next session; do not spend this block making a large deck.') => task('Flashcard retrieval', [5, 5], detail);
const questions = (count, topic, minutes = [10, 15]) => task('Practice and correct: ' + count + ' questions', minutes, 'Use fresh Lumanite or generated questions on ' + topic + '. Explain each error or guess. The count is a target: stop at the time limit and record unfinished corrections.', ['practice']);
const day = (date, title, ids, tasks, note = '', adaptive = false) => ({ date, title, objectiveIds: ids, tasks: tasks.map((t, i) => ({ ...t, id: date + '-' + (i + 1) })), note, adaptive });

// Time ranges include corrections. Hard concepts may need the later repair blocks.
export const schedule = [
  day('2026-10-21', '100-question diagnostic', all, [
    task('Take Diagnostic 01', [50, 50], 'In Question sets, open Data Science & AI — Diagnostic 01 and choose Timed test. Work without notes; flag guesses. Submit when finished, even if before 50 minutes.'),
    task('Record the baseline', [5, 5], 'Write down score, elapsed time, and number of uncertain answers. Do not start a full explanation review tonight.')
  ], 'This is the one longer weekday test block. If interrupted, the exam timer continues; choose an uninterrupted window.'),
  day('2026-10-22', 'Diagnostic triage only', [], [
    task('Sort mistakes and guesses', [10, 15], 'List missed and flagged questions by objective number. Label each careless mistake, forgotten concept, or unfamiliar topic. Group repeated concepts; do not read every explanation yet.'),
    task('Pick the first repair', [5, 5], 'Choose one important gap for Friday. Record the exact subsection and question numbers in your notes. Select its objective below to highlight it in the tracker.')
  ], 'Light day. This sorts the diagnostic; it does not finish reviewing it.', true),
  day('2026-10-23', 'Diagnostic repair: one concept', [], [
    task('Learn one gap properly', [15, 20], 'Choose your focus objective. Read the matching Lumanite subsection, then work through one example with notes and a second without notes. Leave other unfamiliar topics for their scheduled lessons.', ['guide']),
    questions('3–5', 'your selected diagnostic gap', [10, 15]),
    task('Make up to 3 flashcards', [5, 5], 'Use one question per card. Capture the distinction, rule, or recurring mistake; avoid copying a whole explanation.')
  ], 'If the explanation itself takes the entire block, stop there and leave practice unchecked.', true),
  day('2026-10-24', 'Diagnostic repair: second session', [], [
    cards('Recall due cards before revealing answers. After today’s practice, save corrections and up to 3 new cards within this five-minute allowance.'),
    task('Finish the first gap or learn one more', [20, 25], 'Select the objective below. Finish Friday’s unresolved example before beginning another topic. Read its Lumanite subsection and solve two examples, explaining each step.', ['guide']),
    questions('4–6', 'the repaired concept', [10, 15])
  ], 'One 35–45 minute block around robotics, or two shorter blocks.', true),
  day('2026-10-25', 'Delayed retest', [], [
    cards(),
    task('Retry 4–6 repaired questions', [10, 15], 'Choose Friday’s or Saturday’s objective below. Answer without the explanation visible, then explain why the other choices fail. Keep unresolved unfamiliar topics on the learning list.')
  ], 'Short block; may be split around volunteering.', true),
  day('2026-10-26', 'Buffer day', [], [
    task('Optional retrieval or rest', [0, 10], 'No new lesson. If you have time, recall a few existing cards or finish one quick correction. Otherwise leave this optional task unchecked.')
  ], 'No required study today.'),
  day('2026-10-27', 'Data types and the purpose of data science', ['8.1','8.2','8.3','1.5'], [
    task('Read Lumanite 8.1–8.3', [10, 15], 'Distinguish structured, semi-structured and unstructured data; numerical vs categorical; discrete vs continuous; nominal vs ordinal. Classify six examples of your own.', ['guide']),
    task('Retrieve and make 2 cards', [5, 5], 'Explain two confusing pairs without notes. Turn only those distinctions into cards.')
  ]),
  day('2026-10-28', 'SQL selection, filters and ordering', ['3.1'], [
    task('SQLBolt lessons 1–4', [20, 30], 'Read the examples for SELECT, WHERE, text matching, DISTINCT, ORDER BY and LIMIT. Solve four exercises total across the lessons. Continue unfinished exercises in a repair block.', ['sql']),
    questions('4', 'SQL result prediction and filtering', [10, 15])
  ]),
  day('2026-10-29', 'Database and library vocabulary', ['3.2','3.4','3.5'], [
    task('Read Lumanite 3.2, 3.4 and 3.5', [10, 15], 'Match Pandas, NumPy, PyTorch and R to tasks. Explain tables, records, schemas, primary/foreign keys and the basic meaning of ACID. These are introductions; note anything needing another session.', ['guide']),
    task('Make and recall 3 cards', [5, 5], 'Use library-to-task and key-to-purpose comparisons. Say the answer before checking.')
  ]),
  day('2026-10-30', 'Number representations: first pass', ['8.4'], [
    task('Read Lumanite 8.4 and work conversions', [10, 15], 'Study place value and hexadecimal digits. Work decimal 13 to binary, binary 10110 to decimal, hexadecimal 2F to decimal, and binary 11010110 to hexadecimal. Check by reversing the conversions.', ['guide']),
    task('Write a procedure card', [5, 5], 'Explain decimal-to-binary division and binary-to-hex four-bit groups from memory. Mark any conversion you cannot yet do independently.')
  ], 'Short first session. More conversion practice is scheduled November 3.'),
  day('2026-10-31', 'SQL aggregates and groups', ['3.1','3.5'], [
    cards(),
    task('SQLBolt lessons 10–11', [25, 30], 'Work through COUNT, SUM, AVG, GROUP BY and HAVING. Solve three exercises total and explain WHERE vs HAVING and COUNT(*) vs COUNT(column). Revisit basic filters if they block you.', ['sql']),
    questions('4', 'SQL aggregation and grouped output', [10, 15])
  ], '40–50 minutes total; split into two blocks if needed.'),
  day('2026-11-01', 'SQL joins and missing values', ['3.1','3.5'], [
    task('SQLBolt lessons 6–8', [20, 30], 'Read INNER JOIN, LEFT/OUTER JOIN and NULL examples. Draw two tiny tables. Predict matching rows, retained unmatched rows and NULL output; solve two exercises.', ['sql']),
    questions('3', 'join output and IS NULL', [10, 15])
  ], 'If volunteering reduces the time, finish the worked example and use November 16 for remaining practice.'),
  day('2026-11-02', 'Pandas and cleaning: first session', ['3.2','3.3','2.4','2.5','8.6'], [
    cards(),
    task('Read Lumanite 3.3 and Pandas examples', [20, 25], 'Read the table tutorial and the selection tutorial through boolean row filtering. Distinguish Series from DataFrame; predict a column selection and boolean filter. Read 3.3 on missing values, duplicates and type conversion.', ['guide','pandas','subset']),
    questions('4', 'Pandas filtering, duplicates and missing-data choices', [10, 15])
  ]),
  day('2026-11-03', 'Conversions and data sources', ['8.4','8.5'], [
    task('Revisit conversions', [10, 15], 'Without notes, convert decimal 26 to binary, binary 111001 to decimal, hex 3A to decimal and binary 10101111 to hex. Check using place value. Finish October 30’s unresolved example first.'),
    task('Read Lumanite 8.5', [5, 5], 'Match surveys, sensors, transactions, logs, APIs and public datasets to the data they can provide and one quality limitation each.', ['guide'])
  ]),
  day('2026-11-04', 'Pandas grouping, combining and workflow', ['3.3','8.6','8.7'], [
    task('Read selected Pandas examples', [20, 25], 'In Summary statistics, read aggregation and groupby examples. In Combine tables, read concat and merge examples. Predict two short snippets; distinguish stacking rows from joining on a key.', ['groups','merge']),
    task('Read Lumanite 8.6–8.7', [5, 10], 'Put problem definition, acquisition, preparation, exploration, modeling, evaluation and communication in a sensible order; explain why the process loops.', ['guide']),
    questions('3–4', 'data wrangling and workflow', [10, 15])
  ]),
  day('2026-11-05', 'Generative AI: uses and limits', ['4.1','4.2','4.3'], [
    task('Read Lumanite 4.1–4.3', [10, 15], 'Explain generating vs classifying. Consider one healthcare, research, art and business example; identify verification needs and one failure mode for each.', ['guide']),
    task('Recall and make 2 cards', [5, 5], 'Distinguish a useful capability from a reliability claim. Explain why fluent output can still be wrong.')
  ]),
  day('2026-11-06', 'AI subfields and language models', ['4.4','4.5','4.6'], [
    cards(),
    task('Read Lumanite 4.4–4.6', [15, 20], 'Distinguish computer vision, NLP, interaction and robotics. Explain tokens, next-token prediction, training vs inference, context, zero-shot and few-shot examples. Use Google’s LLM introduction for unclear concepts; this is not the full course.', ['guide','llm']),
    questions('5–6', 'AI subfields and LLM capabilities', [10, 15])
  ]),
  day('2026-11-07', 'Machine learning foundations and data splits', ['5.1','5.2','5.4','5.5','2.6'], [
    cards(),
    task('Read Lumanite 5.1, 5.2, 5.4 and 5.5', [20, 25], 'Explain features, labels and learned parameters; training, validation and test roles; leakage; supervised, unsupervised and reinforcement learning. Match regression, classification and clustering to six scenarios.', ['guide']),
    questions('6–8', 'learning categories, selection and data leakage', [15, 20])
  ]),
  day('2026-11-08', 'Trees, neural networks and deep learning', ['5.3','5.6'], [
    task('Read Lumanite 5.3 and 5.6', [20, 25], 'Trace a decision tree. Sketch inputs, hidden layers and outputs; explain weights, activation, loss and adjustment during training. Compare overfitting and underfitting. Use Google’s introductory neural-network explanations if needed; do not attempt its whole module today.', ['guide','nn']),
    questions('4', 'tree paths, neural networks and model fit', [10, 15])
  ]),
  day('2026-11-09', 'Logic and knowledge representation', ['6.1','6.2','6.3','6.5'], [
    cards(),
    task('Read Lumanite 6.1–6.3 and 6.5', [20, 25], 'Translate four statements using AND, OR, NOT, implication and quantifiers. Distinguish a statement from its converse and test an invalid inference. Compare rules, graphs, ontologies and embeddings at an introductory level.', ['guide']),
    questions('4', 'logical translations and representation choices', [10, 15])
  ]),
  day('2026-11-10', 'Bayesian networks: first session', ['6.3','6.4'], [
    task('Read Lumanite 6.4 and draw a network', [10, 15], 'Draw a three-node directed acyclic graph. Label nodes, parents, children and an associated conditional probability. Explain why a directed edge alone does not prove causation.', ['guide']),
    task('Make 2 retrieval cards', [5, 5], 'Explain a DAG and P(A given B). Identify the condition that changes the denominator.')
  ]),
  day('2026-11-11', 'Probability reasoning: second session', ['6.3','6.4','1.4'], [
    cards(),
    task('Work conditional-probability examples', [20, 25], 'Use two small two-way tables to calculate conditional probabilities. Work one base-rate example with counts before using Bayes’ formula; interpret two simple networks. Read the relevant Lumanite explanations when stuck.', ['guide']),
    questions('4', 'conditional probability and network interpretation', [10, 15])
  ]),
  day('2026-11-12', 'Privacy, bias and credibility', unit(7), [
    task('Read Lumanite 7.1–7.4', [10, 15], 'For a short scenario, name affected stakeholders, a bias source, a privacy/security risk and a safeguard. Distinguish hallucination, misinformation, data leakage and prompt injection.', ['guide']),
    questions('3', 'ethical decisions and LLM risks', [10, 10])
  ]),
  day('2026-11-13', 'Statistics and analysis: targeted review', [...unit(1), ...unit(2)], [
    cards(),
    task('Repair the weakest Unit 1–2 concept', [15, 20], 'Use your diagnostic and logs to choose one subsection, rather than rereading both units. Solve a worked example independently. Scan the other objective descriptions for untested gaps.', ['guide']),
    task('Practice 6–8 questions and record gaps', [20, 25], 'Use fresh questions on mean/spread, normal distributions, expected value, charts and regression. Review errors and note uncertainty about quartiles, variance formulas, covariance/correlation, z-scores or multivariate methods.', ['practice'])
  ], 'Units 1–2 were previously studied. This is review, not enough time to learn both from scratch.'),
  day('2026-11-14', 'Fresh full mock', all, [
    task('Take one fresh 100-question mock', [50, 50], 'Use a new generated set or Lumanite full test. Do not reuse Diagnostic 01 to measure readiness. Accuracy comes first; flag uncertain answers and record elapsed time.', ['practice']),
    task('Record and sort results', [5, 5], 'Save score, time and uncertainty count. Identify the two highest-priority gaps for the next two days; leave detailed review for those sessions.')
  ], 'One 55-minute block around robotics. No second full mock is packed into the repair days.'),
  day('2026-11-15', 'Mock review: first repair', [], [
    cards(),
    task('Repair one mock gap', [15, 20], 'Select its objective below. Explain the misconception, read the matching subsection and solve two examples. Group repeat mistakes; do not merely reread the answer key.', ['guide']),
    questions('4–6', 'the selected mock weakness', [10, 15])
  ], '30–40 minutes, split if needed. Use Monday for unfinished review.', true),
  day('2026-11-16', 'Mock review and catch-up', [], [
    cards(),
    task('Finish unresolved learning', [20, 25], 'Select your weakest remaining objective. Finish a previous lesson or repair another mock gap; solve a new example without notes. This block takes priority over extra question volume.', ['guide']),
    questions('5–8', 'your selected remaining gap', [15, 20])
  ], '40–50 minutes. If the backlog is larger, record it honestly instead of marking it ready.', true),
  day('2026-11-17', 'Readiness audit and light retrieval', all, [
    cards(),
    task('Audit all 44 objective records', [10, 10], 'Check each objective for independent practice and delayed recall. Keep unlearned or uncertain topics visible. Completing a schedule task does not change its Ready status.'),
    task('Short targeted retest', [5, 10], 'Answer 3–5 fresh questions on the most fragile concept. Record score and uncertainty. Write the remaining gap list and your next review date; do not cram a new full test.')
  ], '20–25 minutes, split around other commitments. November 17 is the preparation target, not a guarantee of a perfect score.')
];

export function scheduleDay(date) { return schedule.find(day => day.date === date); }
export function adjacentDay(date, direction) {
  const dates = schedule.map(day => day.date);
  return direction > 0 ? dates.find(d => d > date) || null : dates.filter(d => d < date).at(-1) || null;
}
export function scheduledObjectives(date, progress) {
  const day = scheduleDay(date);
  return [...new Set([...(day?.objectiveIds || []), ...(day?.adaptive && progress?.focus?.[date]?.objectiveId ? [progress.focus[date].objectiveId] : [])])];
}
export function validateSchedule(value = {}) {
  if (!value || typeof value !== 'object') throw new Error('Invalid schedule backup.');
  const next = { tasks: {}, focus: {}, notes: {} };
  const taskIds = new Set(schedule.flatMap(day => day.tasks.map(t => t.id)));
  for (const [key, row] of Object.entries(value.tasks || {})) {
    if (taskIds.has(key) && row && typeof row.done === 'boolean') next.tasks[key] = { done: row.done, updatedAt: Number(row.updatedAt) || 0 };
  }
  for (const [key, row] of Object.entries(value.focus || {})) {
    if (scheduleDay(key)?.adaptive && row && (row.objectiveId === '' || objectives.some(o => o.id === row.objectiveId))) next.focus[key] = { objectiveId: row.objectiveId, updatedAt: Number(row.updatedAt) || 0 };
  }
  for (const [key, row] of Object.entries(value.notes || {})) {
    if (scheduleDay(key) && row) next.notes[key] = { text: String(row.text || '').slice(0, 10000), updatedAt: Number(row.updatedAt) || 0 };
  }
  return next;
}
export function mergeSchedule(current, incoming) {
  const result = validateSchedule(current), next = validateSchedule(incoming);
  for (const group of ['tasks','focus','notes']) for (const [key, row] of Object.entries(next[group])) {
    if (!result[group][key] || row.updatedAt > result[group][key].updatedAt) result[group][key] = row;
  }
  return result;
}

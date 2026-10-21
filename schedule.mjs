import { objectives } from './objectives.mjs';
import { dayKey } from './tracker.mjs';
import { schedule, scheduleDay, adjacentDay, resources, scheduledObjectives } from './schedule-data.mjs';

export function formatDay(date) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}
const minutesLabel = ([min, max]) => min === max ? min + ' min' : min + '–' + max + ' min';

export function renderSchedule({ app, el, button, date, progress, save, chooseDate, openTracker, openSets }) {
  const today = dayKey(), day = scheduleDay(date);
  const previous = adjacentDay(date, -1), next = adjacentDay(date, 1);
  const repaint = () => { app.replaceChildren(); renderSchedule({ app, el, button, date, progress, save, chooseDate, openTracker, openSets }); };
  app.append(el('div', { class: 'page-heading' },
    el('div', {}, el('p', { class: 'eyebrow' }, 'OCTOBER 21 – NOVEMBER 17, 2026'), el('h1', {}, 'Study schedule')),
    button('Today', () => chooseDate(today), 'secondary small', { disabled: date === today })));
  app.append(el('div', { class: 'schedule-navigation', 'aria-label': 'Browse schedule days' },
    button('←', () => chooseDate(previous), 'secondary', { disabled: !previous, 'aria-label': 'Previous day' }),
    el('h2', { 'aria-live': 'polite' }, formatDay(date), date === today ? el('span', { class: 'schedule-today' }, 'Today') : null),
    button('→', () => chooseDate(next), 'secondary', { disabled: !next, 'aria-label': 'Next day' })));
  if (!day) {
    app.append(el('p', { class: 'schedule-message' }, date < schedule[0].date ? 'Your schedule starts October 21. No tasks are scheduled for this date. Use the right arrow to begin.' : 'The schedule ends November 17. Use the left arrow to revisit your tasks.'));
    return;
  }
  const totals = day.tasks.reduce((sum, task) => [sum[0] + task.minutes[0], sum[1] + task.minutes[1]], [0, 0]);
  const done = day.tasks.filter(t => progress.tasks[t.id]?.done).length;
  app.append(el('div', { class: 'schedule-heading' }, el('h2', {}, day.title),
    el('p', { class: 'meta' }, minutesLabel(totals) + ' total · ' + done + '/' + day.tasks.length + ' tasks checked')));
  if (day.note) app.append(el('p', { class: 'notice' }, day.note));
  if (day.adaptive) {
    const select = el('select', { 'aria-label': 'Focus objective', onchange: event => {
      // Keep a timestamp even when cleared, so backup merges preserve the change.
      progress.focus[date] = { objectiveId: event.target.value, updatedAt: Date.now() }; save(); repaint();
    } }, el('option', { value: '' }, 'Choose from your diagnostic or practice results'),
    objectives.map(o => el('option', { value: o.id, selected: progress.focus[date]?.objectiveId === o.id }, o.id + ' ' + o.name)));
    app.append(el('label', { class: 'field schedule-focus' }, 'Focus objective', select));
  }
  const list = el('ol', { class: 'schedule-tasks', 'aria-label': 'Daily tasks' });
  day.tasks.forEach(task => {
    const checkbox = el('input', { type: 'checkbox', checked: !!progress.tasks[task.id]?.done, 'aria-label': task.title, onchange: event => {
      progress.tasks[task.id] = { done: event.target.checked, updatedAt: Date.now() }; save(); repaint();
    } });
    list.append(el('li', { class: progress.tasks[task.id]?.done ? 'schedule-task completed' : 'schedule-task' },
      el('div', { class: 'schedule-task-heading' }, el('label', { class: 'schedule-check' }, checkbox, el('strong', {}, task.title)), el('span', { class: 'meta' }, minutesLabel(task.minutes))),
      el('p', {}, task.detail),
      task.links.length ? el('div', { class: 'schedule-links' }, task.links.map(key => el('a', { href: resources[key][1], target: '_blank', rel: 'noopener' }, resources[key][0]))) : null));
  });
  app.append(list);
  const ids = scheduledObjectives(date, progress);
  app.append(el('div', { class: 'actions schedule-actions' },
    button('View highlighted objectives', openTracker, 'secondary', { disabled: !ids.length }),
    button('Question sets', openSets, 'quiet')));
  const notes = el('textarea', { class: 'notes', value: progress.notes[date]?.text || '', placeholder: 'Unfinished examples, actual minutes, or what needs another session…', oninput: event => {
    progress.notes[date] = { text: event.target.value.slice(0, 10000), updatedAt: Date.now() }; save();
  } });
  app.append(el('label', { class: 'field schedule-notes' }, 'Session notes / carry-over', notes));
  app.append(el('details', { class: 'schedule-guidance' }, el('summary', {}, 'How to use the time limits'),
    el('p', {}, 'Stop at the upper time limit. If learning takes longer, reduce the question count and record the unfinished work here. Use the repair days for it. A checked task records completion; it does not mark an objective Ready. Flashcards support recall; examples and fresh questions check application.')));
}

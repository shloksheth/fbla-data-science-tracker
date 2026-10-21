import test from 'node:test';
import assert from 'node:assert/strict';
import { objectives } from '../objectives.mjs';
import { dayKey } from '../tracker.mjs';
import { schedule, scheduleDay, adjacentDay, scheduledObjectives, validateSchedule, mergeSchedule, taskDone, practiceRequest } from '../schedule-data.mjs';

test('every date October 21 through November 17 has at most three tasks', () => {
  assert.equal(schedule.length, 28);
  assert.equal(scheduleDay('2026-10-20'), undefined);
  for (let i = 0; i < 28; i++) {
    assert.equal(schedule[i].date, dayKey(new Date(2026, 9, 21 + i)));
    assert.ok(schedule[i].tasks.length >= 1 && schedule[i].tasks.length <= 3);
  }
  assert.equal(new Set(schedule.flatMap(day => day.tasks.map(t => t.id))).size, schedule.flatMap(day => day.tasks).length);
});
test('date arrows handle today outside the plan and disable the endpoints', () => {
  assert.equal(adjacentDay('2026-10-20', 1), '2026-10-21');
  assert.equal(adjacentDay('2026-10-20', -1), null);
  assert.equal(adjacentDay('2026-10-21', -1), null);
  assert.equal(adjacentDay('2026-11-17', 1), null);
  assert.equal(adjacentDay('2026-11-18', -1), '2026-11-17');
  assert.equal(adjacentDay('2026-10-31', 1), '2026-11-01');
});
test('the learning and review plan names every objective without relying on full tests', () => {
  const known = new Set(objectives.map(o => o.id));
  const covered = new Set(schedule.filter(d => !['2026-10-21','2026-11-14','2026-11-17'].includes(d.date)).flatMap(d => d.objectiveIds));
  assert.deepEqual([...covered].sort(), [...known].sort());
  for (const d of schedule) {
    assert.ok(d.objectiveIds.every(id => known.has(id)));
    for (const t of d.tasks) assert.ok(t.minutes[0] >= 0 && t.minutes[1] >= t.minutes[0]);
  }
});
test('adaptive review highlights only the objective the user selects', () => {
  assert.deepEqual(scheduledObjectives('2026-11-15', {}), []);
  const p = { focus: { '2026-11-15': { objectiveId: '3.1' } } };
  assert.deepEqual(scheduledObjectives('2026-11-15', p), ['3.1']);
  assert.deepEqual(scheduledObjectives('2026-10-20', p), []);
  assert.deepEqual(scheduledObjectives('2026-10-28', p), ['3.1']);
});
test('backup merge preserves newer completion, notes and cleared review focus', () => {
  const current = { tasks: {'2026-10-23-1': {done:false,updatedAt:20}}, focus: {'2026-11-15': {objectiveId:'',updatedAt:20}}, notes: {'2026-11-15': {text:'Needs another example',updatedAt:20}} };
  const incoming = { tasks: {'2026-10-23-1': {done:true,updatedAt:10},'2026-10-23-2':{done:true,updatedAt:30}}, focus: {'2026-11-15': {objectiveId:'3.1',updatedAt:10}}, notes: {'2026-11-15': {text:'Old',updatedAt:10}} };
  const result = mergeSchedule(current, incoming);
  assert.equal(result.tasks['2026-10-23-1'].done, false);
  assert.equal(result.tasks['2026-10-23-2'].done, true);
  assert.equal(result.focus['2026-11-15'].objectiveId, '');
  assert.equal(result.notes['2026-11-15'].text, 'Needs another example');
});
test('old backups need no schedule field and unrecognized entries are ignored', () => {
  assert.deepEqual(validateSchedule(), {tasks:{}, focus:{}, notes:{}});
  assert.deepEqual(validateSchedule({tasks:{unknown:{done:true}},focus:{'2026-11-15':{objectiveId:'9.9'}}}), {tasks:{},focus:{},notes:{}});
});

test('the workload stays within the selected light and regular day budgets', () => {
  for (const day of schedule) {
    const [low, high] = day.tasks.reduce((s,t)=>[s[0]+t.minutes[0],s[1]+t.minutes[1]],[0,0]);
    assert.ok(low >= (day.light ? 25 : 45), day.date);
    assert.ok(high <= (day.light ? 35 : 60), day.date);
    for (const task of day.tasks) if(task.practice) {
      assert.equal(task.practice.breakdown.reduce((n,[count])=>n+count,0),task.practice.count,day.date);
    }
  }
});

test('premade flashcard assignments use existing ranges and exclude misleading network cards', () => {
  const counts = {quizletFbla:93, quizletSql:30, quizletBases:27};
  for(const task of schedule.flatMap(d=>d.tasks)) if(task.flashcards) {
    const {deck,range,count} = task.flashcards;
    const cards = range.split(' and ').flatMap(part=>{
      const [first,last] = part.split('–').map(Number);
      return Array.from({length:(last||first)-first+1},(_,i)=>first+i);
    });
    assert.equal(cards.length,count);
    assert.ok(cards.every(n=>n>=1 && n<=counts[deck]));
    if(deck==='quizletFbla') assert.ok(cards.every(n=>n<58||n>61));
    assert.ok(count>=15);
  }
});

test('revised assignments do not inherit old completion, but retain the old backup record', () => {
  const task=scheduleDay('2026-10-28').tasks[2];
  const progress=validateSchedule({tasks:{[task.id]:{done:true,updatedAt:10}}});
  assert.equal(progress.tasks[task.id].done,true);
  assert.equal(taskDone(progress,task),false);
  progress.tasks[task.id].revision=task.revision;
  assert.equal(taskDone(validateSchedule(progress),task),true);
});

test('question requests contain the exact mix, selected review objective, and import format', () => {
  const day=scheduleDay('2026-11-15'), task=day.tasks[2];
  const prompt=practiceRequest(day,task,'3.1');
  assert.match(prompt,/25 multiple-choice questions/);
  assert.match(prompt,/selected objective 3.1: SQL queries/);
  assert.match(prompt,/15 questions: the selected weakest objective/);
  assert.match(prompt,/Return only valid JSON/);
  assert.match(prompt,/2026-11-15/);
});

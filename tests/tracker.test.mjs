import test from 'node:test';
import assert from 'node:assert/strict';
import { objectives, units } from '../objectives.mjs';
import { objectiveSummary, validateTracker, mergeTrackers } from '../tracker.mjs';
const log=(date,changes={})=>({id:date,objectiveId:'3.1',date,total:10,correct:10,uncertain:0,fresh:true,createdAt:1,...changes});
test('covers 44 unique objectives with the complete test allocation',()=>{
  assert.equal(objectives.length,44);
  assert.equal(new Set(objectives.map(o=>o.id)).size,44);
  assert.equal(units.reduce((n,u)=>n+u.weight,0),100);
});
test('accuracy excludes repeated questions and retains uncertain counts',()=>{
  const s=objectiveSummary({logs:[log('2026-10-20',{correct:8,uncertain:2}),log('2026-10-21',{total:90,correct:90,fresh:false})]},'3.1');
  assert.equal(s.accuracy,80);assert.equal(s.total,10);assert.equal(s.uncertain,2);
});
test('retest intervals advance through 1, 3, 7 days; mistakes restart at one day',()=>{
  const tracker={logs:[log('2026-10-20')]};
  assert.equal(objectiveSummary(tracker,'3.1').due,'2026-10-21');
  tracker.logs.push(log('2026-10-21'));
  assert.equal(objectiveSummary(tracker,'3.1').due,'2026-10-24');
  tracker.logs.push(log('2026-10-24'));
  assert.equal(objectiveSummary(tracker,'3.1').due,'2026-10-31');
  tracker.logs.push(log('2026-10-31',{correct:9}));
  assert.equal(objectiveSummary(tracker,'3.1').due,'2026-11-01');
});
test('same-day repeats do not advance the review interval',()=>{
  assert.equal(objectiveSummary({logs:[log('2026-10-20'),log('2026-10-20',{id:'repeat',createdAt:2})]},'3.1').due,'2026-10-21');
});
test('backup merge preserves newer records and deduplicates logs',()=>{
  const current={records:{'3.1':{status:'Learning',notes:'Keep',updatedAt:10}},logs:[log('2026-10-20')]};
  const incoming={records:{'3.1':{status:'Ready',notes:'Old',updatedAt:1}},logs:[log('2026-10-20'),log('2026-10-21')]};
  const merged=mergeTrackers(current,incoming);
  assert.equal(merged.records['3.1'].notes,'Keep');assert.equal(merged.logs.length,2);
});
test('invalid counts and statuses fail backup validation',()=>{
  assert.throws(()=>validateTracker({records:{},logs:[log('2026-10-20',{correct:11})]}),/Invalid/);
  assert.throws(()=>validateTracker({records:{'3.1':{status:'Guaranteed 100'}},logs:[]}),/Invalid/);
});

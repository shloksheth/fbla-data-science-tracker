import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSet, parseQuestions, grade, importExample, starterSet } from '../core.mjs';

test('imports numbered questions with explanations and topics', () => {
  const set = parseQuestions(importExample);
  assert.equal(set.title, 'SQL quick practice');
  assert.equal(set.questions.length, 2);
  assert.equal(set.questions[0].answerIndex, 1);
  assert.equal(set.questions[1].answerIndex, 2);
});
test('imports canonical JSON and fenced JSON', () => {
  const json = JSON.stringify(starterSet);
  const fence = String.fromCharCode(96).repeat(3);
  assert.equal(parseQuestions(fence + 'json\n' + json + '\n' + fence).questions.length, 8);
  assert.deepEqual(parseQuestions(json), normalizeSet(starterSet));
});
test('supports chat emphasis, parentheses, lower-case labels and multiline explanations', () => {
  const set = parseQuestions('**1.** Pick one.\na) Yes\nb) No\n**Answer: A**\nExplanation: First line.\nSecond line.');
  assert.equal(set.questions[0].answerIndex, 0);
  assert.equal(set.questions[0].explanation, 'First line.\nSecond line.');
});
test('preserves multiline SQL and literal HTML without executing or stripping it', () => {
  const q = parseQuestions('1. Read this query:\nSELECT name\nFROM people;\nA. <img src=x onerror=alert(1)>\nB. Other\nAnswer: B').questions[0];
  assert.match(q.question, /SELECT name\nFROM people;/);
  assert.equal(q.options[0], '<img src=x onerror=alert(1)>');
});
test('rejects missing answer, out-of-range answer and skipped choices', () => {
  assert.throws(() => parseQuestions('1. Test?\nA. One\nB. Two'), /Question 1/);
  assert.throws(() => parseQuestions('1. Test?\nA. One\nB. Two\nAnswer: D'), /Question 1/);
  assert.throws(() => parseQuestions('1. Test?\nA. One\nC. Three\nAnswer: A'), /in order/);
});
test('rejects partial imports when a later question is broken', () => {
  assert.throws(() => parseQuestions(importExample + '\n3. Broken?\nA. Only one\nAnswer: A'), /Question 3/);
});
test('rejects malformed JSON and blank input', () => {
  assert.throws(() => parseQuestions('{"questions": ['), /JSON is not valid/);
  assert.throws(() => parseQuestions(' '), /Paste/);
});
test('supports raw arrays, zero-based indexes and exact answer text', () => {
  const q = { question: 'Pick', options: ['one', 'two'], answerIndex: 0 };
  assert.equal(normalizeSet([q]).questions[0].answerIndex, 0);
  assert.equal(normalizeSet([{ ...q, answerIndex: undefined, answer: 'two' }]).questions[0].answerIndex, 1);
  assert.throws(() => normalizeSet([{ ...q, answerIndex: 2 }]), /valid answer/);
});
test('grading includes unanswered questions as incorrect', () => {
  const questions = normalizeSet(starterSet).questions;
  assert.deepEqual(grade(questions, questions.map(q => q.answerIndex)), { correct: 8, total: 8, percent: 100 });
  assert.deepEqual(grade(questions, [1, null, 0, null, null, null, null, null]), { correct: 2, total: 8, percent: 25 });
});
test('exported normalized sets round-trip with their answers intact', () => {
  const set = normalizeSet(starterSet);
  assert.deepEqual(parseQuestions(JSON.stringify(set)), set);
});

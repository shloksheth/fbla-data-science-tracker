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
export const schedule = [
  { date: "2026-10-21", title: "100-question diagnostic", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","3.1","3.2","3.3","3.4","3.5","4.1","4.2","4.3","4.4","4.5","4.6","5.1","5.2","5.3","5.4","5.5","5.6","6.1","6.2","6.3","6.4","6.5","7.1","7.2","7.3","7.4","8.1","8.2","8.3","8.4","8.5","8.6","8.7"], adaptive: false, tasks: [
    {"title":"Take Diagnostic 01","minutes":[50,50],"detail":"Open Diagnostic 01 in Question sets. Take the timed test without notes and flag guesses.","links":[],"id":"2026-10-21-1"},
    {"title":"Record the baseline","minutes":[5,5],"detail":"Save your score, time and number of guesses.","links":[],"id":"2026-10-21-2"}
  ] },
  { date: "2026-10-22", title: "Diagnostic triage only", objectiveIds: [], adaptive: true, tasks: [
    {"title":"Sort mistakes and guesses","minutes":[10,15],"detail":"Group missed and guessed questions by topic. Label each as a mistake, forgotten concept or new material.","links":[],"id":"2026-10-22-1"},
    {"title":"Pick the first repair","minutes":[5,5],"detail":"Choose one weak topic for Friday and select its objective below.","links":[],"id":"2026-10-22-2"}
  ] },
  { date: "2026-10-23", title: "Diagnostic repair: one concept", objectiveIds: [], adaptive: true, tasks: [
    {"title":"Learn one gap properly","minutes":[15,20],"detail":"Read the Lumanite section for your selected topic. Solve one example with notes and one without.","links":["guide"],"id":"2026-10-23-1"},
    {"title":"Practice and correct: 3–5 questions","minutes":[10,15],"detail":"Answer 3–5 questions on your selected diagnostic gap. Review mistakes.","links":["practice"],"id":"2026-10-23-2"},
    {"title":"Make up to 3 flashcards","minutes":[5,5],"detail":"Make 3 cards from mistakes or facts you forgot.","links":[],"id":"2026-10-23-3"}
  ] },
  { date: "2026-10-24", title: "Diagnostic repair: second session", objectiveIds: [], adaptive: true, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review your cards. Add up to 3 cards from today’s mistakes.","links":[],"id":"2026-10-24-1"},
    {"title":"Finish the first gap or learn one more","minutes":[20,25],"detail":"Finish Friday’s topic or choose another weak topic. Read its Lumanite section and solve 2 examples.","links":["guide"],"id":"2026-10-24-2"},
    {"title":"Practice and correct: 4–6 questions","minutes":[10,15],"detail":"Answer 4–6 questions on the repaired concept. Review mistakes.","links":["practice"],"id":"2026-10-24-3"}
  ] },
  { date: "2026-10-25", title: "Delayed retest", objectiveIds: [], adaptive: true, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-10-25-1"},
    {"title":"Retry 4–6 repaired questions","minutes":[10,15],"detail":"Retry 4–6 questions from Friday or Saturday without notes. Check each answer.","links":[],"id":"2026-10-25-2"}
  ] },
  { date: "2026-10-26", title: "Buffer day", objectiveIds: [], adaptive: false, tasks: [
    {"title":"Optional retrieval or rest","minutes":[0,10],"detail":"Optional: review flashcards for up to 10 minutes.","links":[],"id":"2026-10-26-1"}
  ] },
  { date: "2026-10-27", title: "Data types and the purpose of data science", objectiveIds: ["8.1","8.2","8.3","1.5"], adaptive: false, tasks: [
    {"title":"Read Lumanite 8.1–8.3","minutes":[10,15],"detail":"Read about data structures and variable types. Classify 6 examples.","links":["guide"],"id":"2026-10-27-1"},
    {"title":"Retrieve and make 2 cards","minutes":[5,5],"detail":"Make 2 cards on distinctions you confuse.","links":[],"id":"2026-10-27-2"}
  ] },
  { date: "2026-10-28", title: "SQL selection, filters and ordering", objectiveIds: ["3.1"], adaptive: false, tasks: [
    {"title":"SQLBolt lessons 1–4","minutes":[20,30],"detail":"Read SELECT, WHERE, text matching, DISTINCT, ORDER BY and LIMIT. Complete 4 SQLBolt exercises.","links":["sql"],"id":"2026-10-28-1"},
    {"title":"Answer 10 practice questions","minutes":[15,20],"detail":"Use Lumanite or generated questions on SQL filters and query output. Review mistakes.","links":["practice"],"id":"2026-10-28-2"}
  ] },
  { date: "2026-10-29", title: "Database and library vocabulary", objectiveIds: ["3.2","3.4","3.5"], adaptive: false, tasks: [
    {"title":"Read Lumanite 3.2, 3.4 and 3.5","minutes":[10,15],"detail":"Read about Pandas, NumPy, PyTorch, R, database keys and ACID.","links":["guide"],"id":"2026-10-29-1"},
    {"title":"Make and recall 3 cards","minutes":[5,5],"detail":"Make 3 cards on libraries and database keys.","links":[],"id":"2026-10-29-2"}
  ] },
  { date: "2026-10-30", title: "Number representations: first pass", objectiveIds: ["8.4"], adaptive: false, tasks: [
    {"title":"Read Lumanite 8.4 and work conversions","minutes":[10,15],"detail":"Convert 13 to binary, 10110 to decimal, hex 2F to decimal, and binary 11010110 to hex. Check your answers.","links":["guide"],"id":"2026-10-30-1"},
    {"title":"Write a procedure card","minutes":[5,5],"detail":"Make a card for decimal-to-binary and binary-to-hex steps.","links":[],"id":"2026-10-30-2"}
  ] },
  { date: "2026-10-31", title: "SQL aggregates and groups", objectiveIds: ["3.1","3.5"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-10-31-1"},
    {"title":"SQLBolt lessons 10–11","minutes":[25,30],"detail":"Study COUNT, SUM, AVG, GROUP BY and HAVING. Complete 3 exercises. Compare WHERE/HAVING and COUNT(*)/COUNT(column).","links":["sql"],"id":"2026-10-31-2"},
    {"title":"Practice and correct: 4 questions","minutes":[10,15],"detail":"Answer 4 questions on SQL aggregation and grouped output. Review mistakes.","links":["practice"],"id":"2026-10-31-3"}
  ] },
  { date: "2026-11-01", title: "SQL joins and missing values", objectiveIds: ["3.1","3.5"], adaptive: false, tasks: [
    {"title":"SQLBolt lessons 6–8","minutes":[20,30],"detail":"Study INNER JOIN, LEFT JOIN and NULL. Complete 2 exercises and predict the output rows.","links":["sql"],"id":"2026-11-01-1"},
    {"title":"Practice and correct: 3 questions","minutes":[10,15],"detail":"Answer 3 questions on join output and IS NULL. Review mistakes.","links":["practice"],"id":"2026-11-01-2"}
  ] },
  { date: "2026-11-02", title: "Pandas and cleaning: first session", objectiveIds: ["3.2","3.3","2.4","2.5","8.6"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-02-1"},
    {"title":"Read Lumanite 3.3 and Pandas examples","minutes":[20,25],"detail":"Read Lumanite 3.3 and the linked Pandas table/filtering examples. Practice column selection, filters, missing values and duplicates.","links":["guide","pandas","subset"],"id":"2026-11-02-2"},
    {"title":"Practice and correct: 4 questions","minutes":[10,15],"detail":"Answer 4 questions on Pandas filtering, duplicates and missing-data choices. Review mistakes.","links":["practice"],"id":"2026-11-02-3"}
  ] },
  { date: "2026-11-03", title: "Conversions and data sources", objectiveIds: ["8.4","8.5"], adaptive: false, tasks: [
    {"title":"Revisit conversions","minutes":[10,15],"detail":"Convert 26 to binary, 111001 to decimal, hex 3A to decimal, and binary 10101111 to hex. Check your answers.","links":[],"id":"2026-11-03-1"},
    {"title":"Read Lumanite 8.5","minutes":[5,5],"detail":"Read about surveys, sensors, transactions, logs, APIs and public datasets.","links":["guide"],"id":"2026-11-03-2"}
  ] },
  { date: "2026-11-04", title: "Pandas grouping, combining and workflow", objectiveIds: ["3.3","8.6","8.7"], adaptive: false, tasks: [
    {"title":"Read selected Pandas examples","minutes":[20,25],"detail":"Read groupby, aggregation, concat and merge examples. Predict the output of 2 snippets.","links":["groups","merge"],"id":"2026-11-04-1"},
    {"title":"Read Lumanite 8.6–8.7","minutes":[5,10],"detail":"Read the data science process and explain each stage in order.","links":["guide"],"id":"2026-11-04-2"},
    {"title":"Answer 10 practice questions","minutes":[15,20],"detail":"Use Lumanite or generated questions on Pandas and the data science process. Review mistakes.","links":["practice"],"id":"2026-11-04-3"}
  ] },
  { date: "2026-11-05", title: "Generative AI: uses and limits", objectiveIds: ["4.1","4.2","4.3"], adaptive: false, tasks: [
    {"title":"Read Lumanite 4.1–4.3","minutes":[10,15],"detail":"Read about generative AI, its uses and limitations. Give 4 examples of its use.","links":["guide"],"id":"2026-11-05-1"},
    {"title":"Recall and make 2 cards","minutes":[5,5],"detail":"Make 2 cards on AI capabilities and limitations.","links":[],"id":"2026-11-05-2"}
  ] },
  { date: "2026-11-06", title: "AI subfields and language models", objectiveIds: ["4.4","4.5","4.6"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-06-1"},
    {"title":"Read Lumanite 4.4–4.6","minutes":[15,20],"detail":"Read about AI subfields, tokens, next-token prediction, context, training/inference and zero-shot/few-shot prompts.","links":["guide","llm"],"id":"2026-11-06-2"},
    {"title":"Practice and correct: 5–6 questions","minutes":[10,15],"detail":"Answer 5–6 questions on AI subfields and LLM capabilities. Review mistakes.","links":["practice"],"id":"2026-11-06-3"}
  ] },
  { date: "2026-11-07", title: "Machine learning foundations and data splits", objectiveIds: ["5.1","5.2","5.4","5.5","2.6"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-07-1"},
    {"title":"Read Lumanite 5.1, 5.2, 5.4 and 5.5","minutes":[20,25],"detail":"Study features, labels, data splits, leakage and learning categories. Classify 6 example problems.","links":["guide"],"id":"2026-11-07-2"},
    {"title":"Practice and correct: 6–8 questions","minutes":[15,20],"detail":"Answer 6–8 questions on learning categories, selection and data leakage. Review mistakes.","links":["practice"],"id":"2026-11-07-3"}
  ] },
  { date: "2026-11-08", title: "Trees, neural networks and deep learning", objectiveIds: ["5.3","5.6"], adaptive: false, tasks: [
    {"title":"Read Lumanite 5.3 and 5.6","minutes":[20,25],"detail":"Trace a decision tree. Study neural-network layers, weights, activation, loss, overfitting and underfitting.","links":["guide","nn"],"id":"2026-11-08-1"},
    {"title":"Practice and correct: 4 questions","minutes":[10,15],"detail":"Answer 4 questions on tree paths, neural networks and model fit. Review mistakes.","links":["practice"],"id":"2026-11-08-2"}
  ] },
  { date: "2026-11-09", title: "Logic and knowledge representation", objectiveIds: ["6.1","6.2","6.3","6.5"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-09-1"},
    {"title":"Read Lumanite 6.1–6.3 and 6.5","minutes":[20,25],"detail":"Translate 4 logic statements. Practice implication, converse and quantifiers. Compare rules, graphs, ontologies and embeddings.","links":["guide"],"id":"2026-11-09-2"},
    {"title":"Practice and correct: 4 questions","minutes":[10,15],"detail":"Answer 4 questions on logical translations and representation choices. Review mistakes.","links":["practice"],"id":"2026-11-09-3"}
  ] },
  { date: "2026-11-10", title: "Bayesian networks: first session", objectiveIds: ["6.3","6.4"], adaptive: false, tasks: [
    {"title":"Read Lumanite 6.4 and draw a network","minutes":[10,15],"detail":"Draw a 3-node Bayesian network. Label parents, children and conditional probabilities. Review dependency vs causation.","links":["guide"],"id":"2026-11-10-1"},
    {"title":"Make 2 retrieval cards","minutes":[5,5],"detail":"Make 2 cards on DAGs and conditional probability.","links":[],"id":"2026-11-10-2"}
  ] },
  { date: "2026-11-11", title: "Probability reasoning: second session", objectiveIds: ["6.3","6.4","1.4"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-11-1"},
    {"title":"Work conditional-probability examples","minutes":[20,25],"detail":"Solve 2 conditional-probability table problems and 1 Bayes problem. Interpret 2 simple networks.","links":["guide"],"id":"2026-11-11-2"},
    {"title":"Answer 10 practice questions","minutes":[15,20],"detail":"Use Lumanite or generated questions on conditional probability and Bayesian networks. Review mistakes.","links":["practice"],"id":"2026-11-11-3"}
  ] },
  { date: "2026-11-12", title: "Privacy, bias and credibility", objectiveIds: ["7.1","7.2","7.3","7.4"], adaptive: false, tasks: [
    {"title":"Read Lumanite 7.1–7.4","minutes":[10,15],"detail":"Read about ethical dilemmas, bias, privacy, prompt injection and misinformation. Match each risk to a safeguard.","links":["guide"],"id":"2026-11-12-1"},
    {"title":"Practice and correct: 3 questions","minutes":[10,10],"detail":"Answer 3 questions on ethical decisions and LLM risks. Review mistakes.","links":["practice"],"id":"2026-11-12-2"}
  ] },
  { date: "2026-11-13", title: "Statistics and analysis: targeted review", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-13-1"},
    {"title":"Repair the weakest Unit 1–2 concept","minutes":[15,20],"detail":"Choose your weakest statistics or analysis topic. Reread its section and solve 1 example without notes.","links":["guide"],"id":"2026-11-13-2"},
    {"title":"Practice 6–8 questions and record gaps","minutes":[20,25],"detail":"Answer 6–8 questions on statistics, charts and regression. Review mistakes.","links":["practice"],"id":"2026-11-13-3"}
  ] },
  { date: "2026-11-14", title: "Fresh full mock", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","3.1","3.2","3.3","3.4","3.5","4.1","4.2","4.3","4.4","4.5","4.6","5.1","5.2","5.3","5.4","5.5","5.6","6.1","6.2","6.3","6.4","6.5","7.1","7.2","7.3","7.4","8.1","8.2","8.3","8.4","8.5","8.6","8.7"], adaptive: false, tasks: [
    {"title":"Take one fresh 100-question mock","minutes":[50,50],"detail":"Take a new generated or Lumanite 100-question test. Flag guesses and record your time.","links":["practice"],"id":"2026-11-14-1"},
    {"title":"Record and sort results","minutes":[5,5],"detail":"Save your score. Choose 2 weak topics to review on Sunday and Monday.","links":[],"id":"2026-11-14-2"}
  ] },
  { date: "2026-11-15", title: "Mock review: first repair", objectiveIds: [], adaptive: true, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-15-1"},
    {"title":"Repair one mock gap","minutes":[15,20],"detail":"Select a weak mock-test topic. Read its Lumanite section and solve 2 examples.","links":["guide"],"id":"2026-11-15-2"},
    {"title":"Practice and correct: 4–6 questions","minutes":[10,15],"detail":"Answer 4–6 questions on the selected mock weakness. Review mistakes.","links":["practice"],"id":"2026-11-15-3"}
  ] },
  { date: "2026-11-16", title: "Mock review and catch-up", objectiveIds: [], adaptive: true, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-16-1"},
    {"title":"Finish unresolved learning","minutes":[20,25],"detail":"Finish an incomplete lesson or review another weak topic. Solve 1 new example without notes.","links":["guide"],"id":"2026-11-16-2"},
    {"title":"Practice and correct: 5–8 questions","minutes":[15,20],"detail":"Answer 5–8 questions on your selected remaining gap. Review mistakes.","links":["practice"],"id":"2026-11-16-3"}
  ] },
  { date: "2026-11-17", title: "Readiness audit and light retrieval", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","3.1","3.2","3.3","3.4","3.5","4.1","4.2","4.3","4.4","4.5","4.6","5.1","5.2","5.3","5.4","5.5","5.6","6.1","6.2","6.3","6.4","6.5","7.1","7.2","7.3","7.4","8.1","8.2","8.3","8.4","8.5","8.6","8.7"], adaptive: false, tasks: [
    {"title":"Review flashcards","minutes":[5,5],"detail":"Review due cards. Answer before checking.","links":[],"id":"2026-11-17-1"},
    {"title":"Audit all 44 objective records","minutes":[10,10],"detail":"Check all 44 objectives. List topics you still cannot explain or solve.","links":[],"id":"2026-11-17-2"},
    {"title":"Short targeted retest","minutes":[5,10],"detail":"Answer 3–5 fresh questions on your weakest topic. Check answers and record remaining gaps.","links":[],"id":"2026-11-17-3"}
  ] }
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

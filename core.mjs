export const LETTERS = 'ABCDEF';

export function normalizeSet(input) {
  const source = Array.isArray(input) ? { questions: input } : input;
  if (!source || !Array.isArray(source.questions) || !source.questions.length) throw new Error('Add at least one question in a questions array.');
  if (source.questions.length > 500) throw new Error('Please split sets larger than 500 questions.');
  const questions = source.questions.map((q, i) => {
    const prefix = 'Question ' + (i + 1) + ': ';
    if (!q || typeof q !== 'object') throw new Error(prefix + 'expected a question object.');
    const question = String(q.question ?? q.prompt ?? '').trim();
    const options = Array.isArray(q.options) ? q.options.map(v => String(v).trim()) : [];
    if (!question) throw new Error(prefix + 'question text is missing.');
    if (options.length < 2 || options.length > 6 || options.some(v => !v)) throw new Error(prefix + 'provide 2–6 nonempty options.');
    let answerIndex = q.answerIndex;
    if (answerIndex === undefined) {
      const answer = String(q.answer ?? q.correctAnswer ?? '').trim();
      const label = answer.match(/^([A-F])(?:[.)]|\s|$)/i);
      answerIndex = label ? LETTERS.indexOf(label[1].toUpperCase()) : options.indexOf(answer);
    }
    if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex >= options.length) throw new Error(prefix + 'provide a valid answer letter, such as A, or a zero-based answerIndex.');
    return { question, options, answerIndex, explanation: String(q.explanation ?? '').trim(), topic: String(q.topic ?? source.topic ?? '').trim() };
  });
  return { title: String(source.title ?? '').trim(), topic: String(source.topic ?? '').trim(), questions };
}

export function parseQuestions(raw) {
  const text = raw.trim().replace(/^\uFEFF/, '');
  if (!text) throw new Error('Paste your questions first.');
  const fence = String.fromCharCode(96).repeat(3);
  const clean = text.replace(new RegExp('^' + fence + '(?:json|text|markdown)?\\s*\\n?', 'i'), '').replace(new RegExp('\\n?' + fence + '\\s*$'), '').trim();
  if (/^[{[]/.test(clean)) {
    try { return normalizeSet(JSON.parse(clean)); }
    catch (error) {
      if (error instanceof SyntaxError) throw new Error('The JSON is not valid. Check commas and quotation marks, or use the numbered text format.');
      throw error;
    }
  }
  const questions = [];
  let current = null;
  let destination = 'question';
  let title = '';
  for (const original of clean.split(/\r?\n/)) {
    // Copied chat emphasis is harmless; imported content never becomes HTML.
    const line = original.replace(/\*\*/g, '').trim();
    if (!line || /^---+$/.test(line)) continue;
    const start = line.match(/^(?:#{1,6}\s*)?(?:Question\s+)?(\d+)[.)\:]\s*(.*)$/i);
    const option = line.match(/^([A-F])[.)\:]\s+(.+)$/i);
    const answer = line.match(/^(?:(?:Correct\s+)?Answer|Correct)\s*:\s*([A-F])(?:[.)]|\s|$)/i);
    const explanation = line.match(/^Explanation\s*:\s*(.*)$/i);
    const topic = line.match(/^Topic\s*:\s*(.*)$/i);
    if (start) {
      if (current) questions.push(current);
      current = { question: start[2], options: [], explanation: '', answer: '' };
      destination = 'question';
    } else if (!current) {
      if (!title && /^(?:#{1,6}\s+|Title:\s*)/i.test(line)) title = line.replace(/^(?:#{1,6}\s+|Title:\s*)/i, '');
      else throw new Error('Start each question with 1. or 1), and label choices A. B. C. D. Unexpected text: ' + line.slice(0, 65));
    } else if (answer) {
      current.answer = answer[1].toUpperCase();
      destination = 'answer';
    } else if (explanation) {
      current.explanation = explanation[1];
      destination = 'explanation';
    } else if (topic) {
      current.topic = topic[1];
      destination = 'topic';
    } else if (option) {
      const expected = LETTERS[current.options.length];
      if (option[1].toUpperCase() !== expected) throw new Error('Question ' + (questions.length + 1) + ': choices must be labeled in order, starting with A.');
      current.options.push(option[2]);
      destination = 'option';
    } else if (destination === 'option') current.options[current.options.length - 1] += '\n' + original.trim();
    else if (destination === 'answer' || destination === 'topic') throw new Error('Unexpected line after an answer or topic: ' + line.slice(0, 65));
    else current[destination] += (current[destination] ? '\n' : '') + original.trim();
  }
  if (current) questions.push(current);
  return normalizeSet({ title, questions });
}

export function grade(questions, answers) {
  const correct = questions.reduce((sum, q, i) => sum + (answers[i] === q.answerIndex ? 1 : 0), 0);
  return { correct, total: questions.length, percent: Math.round(correct / questions.length * 100) };
}

export const importExample = [
  'Title: SQL quick practice', '',
  '1. Which clause filters individual rows before grouping?',
  'A. HAVING', 'B. WHERE', 'C. ORDER BY', 'D. GROUP BY',
  'Answer: B', 'Explanation: WHERE filters rows before GROUP BY. HAVING filters groups after aggregation.', 'Topic: SQL', '',
  '2. Which expression counts every row, including rows with missing values?',
  'A. COUNT(column_name)', 'B. SUM(*)', 'C. COUNT(*)', 'D. AVG(column_name)',
  'Answer: C', 'Explanation: COUNT(*) counts all rows. COUNT(column_name) counts non-NULL values in that column.', 'Topic: SQL'
].join('\n');

export const generationPrompt = 'Create an original FBLA Data Science & AI practice set on [TOPIC] with [NUMBER] multiple-choice questions. Include applications and plausible distractors. Return only valid JSON with this structure: {"title":"Set name","topic":"Topic","questions":[{"question":"Question text","options":["First option","Second option","Third option","Fourth option"],"answer":"A","explanation":"Explain the correct answer and the main trap.","topic":"Specific skill"}]}. Use answer letters A–D. Verify each answer; do not claim these are official FBLA questions.';

export const starterSet = {
  title: 'SQL essentials', topic: 'Tools for Data & AI', questions: [
    {question:'Which clause filters individual rows before grouping?',options:['HAVING','WHERE','ORDER BY','GROUP BY'],answer:'B',explanation:'WHERE filters input rows. HAVING filters groups after aggregation.',topic:'SQL · filtering'},
    {question:'A table has 8 rows. The score column contains NULL in 3 rows. What does SELECT COUNT(score) return?',options:['8','3','5','NULL'],answer:'C',explanation:'COUNT(column) counts non-NULL values, so 8 − 3 = 5.',topic:'SQL · NULL'},
    {question:'Which query returns each department with its average salary?',options:['SELECT department, AVG(salary) FROM employees GROUP BY department;','SELECT department, salary FROM employees ORDER BY AVG(salary);','SELECT AVG(department), salary FROM employees;','SELECT department FROM employees WHERE AVG(salary);'],answer:'A',explanation:'GROUP BY forms a group for each department, then AVG computes a salary average within each group.',topic:'SQL · aggregation'},
    {question:'A LEFT JOIN from customers to orders guarantees which result?',options:['Only customers with orders appear.','Only unmatched customers appear.','Every order appears, even without a customer.','Every customer appears, with NULL order fields where no match exists.'],answer:'D',explanation:'A LEFT JOIN preserves all rows from its left table. One customer may appear multiple times if several orders match.',topic:'SQL · joins'},
    {question:'Which condition finds rows whose email value is missing (NULL)?',options:['email = NULL','email IS NULL','email == NULL','email = 0'],answer:'B',explanation:'Use IS NULL to test missing SQL values. Equality comparisons with NULL do not evaluate to true.',topic:'SQL · NULL'},
    {question:'After grouping employees by department, which clause keeps only groups with more than 10 employees?',options:['WHERE COUNT(*) > 10','ORDER BY COUNT(*) > 10','HAVING COUNT(*) > 10','SELECT COUNT(*) > 10'],answer:'C',explanation:'HAVING filters grouped results and can use aggregate functions.',topic:'SQL · aggregation'},
    {question:'Which keyword removes duplicate rows from a SELECT result?',options:['DISTINCT','UNIQUE ROWS','GROUP ALL','REMOVE'],answer:'A',explanation:'SELECT DISTINCT returns distinct combinations of the selected columns.',topic:'SQL · selection'},
    {question:'What does ORDER BY score DESC do?',options:['Removes scores below the average.','Groups equal scores.','Sorts scores from lowest to highest.','Sorts scores from highest to lowest.'],answer:'D',explanation:'DESC means descending order. ASC requests ascending order.',topic:'SQL · sorting'}
  ]
};

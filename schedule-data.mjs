import { objectives } from './objectives.mjs';
import { generationPrompt } from './core.mjs';

export const resources = {
  "guide": [
    "Lumanite study guide",
    "https://lumanite.vercel.app/event/data_science_and_ai/study-guide"
  ],
  "practice": [
    "Lumanite practice",
    "https://lumanite.vercel.app/practice/data_science_and_ai"
  ],
  "sql": [
    "SQLBolt lessons",
    "https://sqlbolt.com/"
  ],
  "pandas": [
    "Pandas: tables",
    "https://pandas.pydata.org/docs/getting_started/intro_tutorials/01_table_oriented.html"
  ],
  "subset": [
    "Pandas: select rows and columns",
    "https://pandas.pydata.org/docs/getting_started/intro_tutorials/03_subset_data.html"
  ],
  "groups": [
    "Pandas: summary statistics",
    "https://pandas.pydata.org/docs/getting_started/intro_tutorials/06_calculate_statistics.html"
  ],
  "merge": [
    "Pandas: combine tables",
    "https://pandas.pydata.org/docs/getting_started/intro_tutorials/08_combine_dataframes.html"
  ],
  "nn": [
    "Google: neural networks",
    "https://developers.google.com/machine-learning/crash-course/neural-networks"
  ],
  "llm": [
    "Google: LLM introduction",
    "https://developers.google.com/machine-learning/crash-course/llm"
  ],
  "quizletFbla": [
    "Quizlet: FBLA Data Science & AI (93 cards)",
    "https://quizlet.com/1160359305/data-science-and-ai-fbla-test-flash-cards/"
  ],
  "quizletSql": [
    "Quizlet: SQL (30 cards)",
    "https://quizlet.com/1213787600/sql-flash-cards/"
  ],
  "quizletBases": [
    "Quizlet: Number Systems (27 cards)",
    "https://quizlet.com/9521485/ap-computer-science-number-systems-flash-cards/"
  ],
  "networks": [
    "Textbook: Bayesian networks, section 9.3",
    "https://artint.info/3e/html/ArtInt3e.Ch9.S3.html"
  ],
  "objectives": [
    "Official study objectives",
    "https://www.mbaresearch.org/wp-content/uploads/2026/03/FBLA-HS-Data-Science-and-AI-Study-Guide.pdf"
  ]
};

// Revised tasks keep their IDs; revision numbers distinguish old checkmarks.
export const schedule = [
  { date: "2026-10-21", title: "100-question diagnostic", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","3.1","3.2","3.3","3.4","3.5","4.1","4.2","4.3","4.4","4.5","4.6","5.1","5.2","5.3","5.4","5.5","5.6","6.1","6.2","6.3","6.4","6.5","7.1","7.2","7.3","7.4","8.1","8.2","8.3","8.4","8.5","8.6","8.7"], light: false, adaptive: false, tasks: [
    {"title":"Take Diagnostic 01","minutes":[50,50],"detail":"Open Diagnostic 01 in Question sets and choose Timed test. Work without notes, flag guesses and submit when finished.","links":[],"id":"2026-10-21-1","revision":2},
    {"title":"Record your result","minutes":[5,10],"detail":"Save your score, elapsed time and number of guesses. List missed question numbers. Detailed review starts tomorrow.","links":[],"id":"2026-10-21-2","revision":2}
  ] },
  { date: "2026-10-22", title: "Sort the diagnostic", objectiveIds: [], light: true, adaptive: true, tasks: [
    {"title":"Sort missed and guessed questions","minutes":[15,20],"detail":"Group questions by objective number. Mark each as a careless mistake, forgotten material or a new topic. Select the topic with the most errors in Focus objective; save the question numbers in Notes.","links":[],"id":"2026-10-22-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[10,15],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–15. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"1–15","count":15},"id":"2026-10-22-2","revision":2}
  ] },
  { date: "2026-10-23", title: "Statistics review", objectiveIds: ["1.1","1.2","1.3","1.4","1.5"], light: false, adaptive: false, tasks: [
    {"title":"Review Lumanite 1.1–1.5","minutes":[20,25],"detail":"Review mean/median/mode/range, sample vs population variance, standard deviation, covariance vs correlation, the 68–95–99.7 rule, z-scores, expected value and variable types. Work one spread calculation and one expected-value example.","links":["guide"],"id":"2026-10-23-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–20. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"1–20","count":20},"id":"2026-10-23-2","revision":2},
    {"title":"Answer 25 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":25,"breakdown":[[5,"mean, median, mode and range"],[5,"variance, standard deviation and covariance"],[5,"normal distributions and z-scores"],[5,"expected value"],[5,"discrete and continuous variables"]]},"id":"2026-10-23-3","revision":2}
  ] },
  { date: "2026-10-24", title: "Charts, cleaning and analysis", objectiveIds: ["2.1","2.2","2.3","2.4","2.5","2.6"], light: false, adaptive: false, tasks: [
    {"title":"Review Lumanite 2.1–2.6","minutes":[20,25],"detail":"Review chart choice, boxplots/histograms/scatterplots, multiple linear vs logistic regression, dependence vs interdependence, cleaning and algorithm applications. Focus on diagnostic errors; explain one boxplot and one regression scenario.","links":["guide"],"id":"2026-10-24-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 6–25. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"6–25","count":20},"id":"2026-10-24-2","revision":2},
    {"title":"Answer 25 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":25,"breakdown":[[5,"choosing charts"],[5,"interpreting charts, quartiles and outliers"],[5,"multivariate analysis and regression"],[5,"cleaning and data quality"],[5,"linear regression, decision trees and k-means applications"]]},"id":"2026-10-24-3","revision":2}
  ] },
  { date: "2026-10-25", title: "Data foundations", objectiveIds: ["8.1","8.2","8.3","8.5","8.7"], light: false, adaptive: false, tasks: [
    {"title":"Read Lumanite 8.1–8.3, 8.5 and 8.7","minutes":[15,20],"detail":"Study the purpose of data science, structured/semi-structured/unstructured data, numeric/categorical data, data sources and the project workflow. Classify 6 real examples and put the workflow stages in order.","links":["guide"],"id":"2026-10-25-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 74–93. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"74–93","count":20},"id":"2026-10-25-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[25,30],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[5,"data structures and variable types"],[5,"data sources and their limitations"],[5,"data science workflow"],[5,"statistics and chart review"]]},"id":"2026-10-25-3","revision":2}
  ] },
  { date: "2026-10-26", title: "Short mixed review", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","8.1","8.2","8.3","8.5","8.7"], light: true, adaptive: false, tasks: [
    {"title":"Quizlet: study 20 premade cards","minutes":[10,15],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–20. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"1–20","count":20},"id":"2026-10-26-1","revision":2},
    {"title":"Answer 15 fresh questions and review mistakes","minutes":[15,20],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":15,"breakdown":[[5,"statistics"],[5,"data types and sources"],[5,"workflow and chart interpretation"]]},"id":"2026-10-26-2","revision":2}
  ] },
  { date: "2026-10-27", title: "Foundations retest", objectiveIds: ["8.1","8.2","8.3","8.5","8.7"], light: true, adaptive: false, tasks: [
    {"title":"Quizlet: study 15 premade cards","minutes":[10,15],"detail":"Open Flashcards mode and turn shuffle off. Study cards 74–88. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"74–88","count":15},"id":"2026-10-27-1","revision":2},
    {"title":"Answer 15 fresh questions and review mistakes","minutes":[15,20],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":15,"breakdown":[[5,"numeric, categorical, discrete and continuous examples"],[5,"structured, semi-structured and unstructured data"],[5,"data sources and workflow"]]},"id":"2026-10-27-2","revision":2}
  ] },
  { date: "2026-10-28", title: "SQL: selection and numeric filters", objectiveIds: ["3.1"], light: false, adaptive: false, tasks: [
    {"title":"SQLBolt lessons 1–2","minutes":[20,25],"detail":"Read SELECT/FROM and WHERE with comparisons, AND/OR, BETWEEN and IN. Complete 4 exercises: 2 from lesson 1 and 2 from lesson 2. Predict the returned rows before running each query.","links":["sql"],"id":"2026-10-28-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–15. Say the answer, flip the card, and repeat missed cards once.","links":["quizletSql"],"flashcards":{"deck":"quizletSql","range":"1–15","count":15},"id":"2026-10-28-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[8,"SELECT, columns and query output"],[8,"numeric WHERE filters, BETWEEN, IN and AND/OR"],[4,"data types and chart review"]]},"id":"2026-10-28-3","revision":2}
  ] },
  { date: "2026-10-29", title: "SQL: text filters and sorting", objectiveIds: ["3.1"], light: true, adaptive: false, tasks: [
    {"title":"Read SQLBolt lessons 3–4","minutes":[10,15],"detail":"Read LIKE, %, _, DISTINCT, ORDER BY and LIMIT. Trace the examples, then complete 2 exercises total across lessons 3–4.","links":["sql"],"id":"2026-10-29-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,8],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–15. Say the answer, flip the card, and repeat missed cards once.","links":["quizletSql"],"flashcards":{"deck":"quizletSql","range":"1–15","count":15},"id":"2026-10-29-2","revision":2},
    {"title":"Answer 10 fresh questions and review mistakes","minutes":[10,12],"detail":"Finish this SQL set on October 31 with 5 more text-filter/sorting questions plus aggregation practice. Check today’s answers and write corrections.","links":["practice"],"practice":{"count":10,"breakdown":[[4,"LIKE and wildcard matching"],[3,"DISTINCT, ORDER BY and LIMIT"],[3,"selection and numeric filter review"]]},"id":"2026-10-29-3","revision":2}
  ] },
  { date: "2026-10-30", title: "Number systems: first session", objectiveIds: ["8.4"], light: true, adaptive: false, tasks: [
    {"title":"Read Lumanite 8.4","minutes":[10,15],"detail":"Study place value, decimal-to-binary division, hexadecimal digits A–F and binary-to-hex four-bit groups. Follow one worked conversion in each direction.","links":["guide"],"id":"2026-10-30-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,8],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–15. Say the answer, flip the card, and repeat missed cards once.","links":["quizletBases"],"flashcards":{"deck":"quizletBases","range":"1–15","count":15},"id":"2026-10-30-2","revision":2},
    {"title":"Solve 6 conversions","minutes":[10,12],"detail":"Convert decimal 13 and 26 to binary; binary 10110 and 111001 to decimal; hex 2F to decimal; binary 11010110 to hex. Check each answer by reversing the conversion.","links":[],"id":"2026-10-30-3","revision":2}
  ] },
  { date: "2026-10-31", title: "SQL: aggregation and grouped results", objectiveIds: ["3.1","3.5"], light: false, adaptive: false, tasks: [
    {"title":"SQLBolt lessons 10–11","minutes":[20,25],"detail":"Read COUNT, SUM, AVG, GROUP BY and HAVING; solve 2 aggregate exercises. Explain WHERE vs HAVING and COUNT(*) vs COUNT(column).","links":["sql"],"id":"2026-10-31-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 16–30. Say the answer, flip the card, and repeat missed cards once.","links":["quizletSql"],"flashcards":{"deck":"quizletSql","range":"16–30","count":15},"id":"2026-10-31-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[10,"aggregates and GROUP BY"],[5,"HAVING vs WHERE and NULL counts"],[5,"text filters, sorting and DISTINCT"]]},"id":"2026-10-31-3","revision":2}
  ] },
  { date: "2026-11-01", title: "SQL joins and relational databases", objectiveIds: ["3.1","3.5"], light: false, adaptive: false, tasks: [
    {"title":"SQLBolt lessons 6–8 and Lumanite 3.5","minutes":[20,25],"detail":"Read INNER JOIN, LEFT/OUTER JOIN, NULL, primary keys and foreign keys. Solve 2 SQLBolt exercises total. Draw 2 small tables and predict matched and unmatched rows.","links":["sql","guide"],"id":"2026-11-01-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–15. Say the answer, flip the card, and repeat missed cards once.","links":["quizletSql"],"flashcards":{"deck":"quizletSql","range":"1–15","count":15},"id":"2026-11-01-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[10,"INNER JOIN vs LEFT JOIN output"],[5,"NULL and IS NULL"],[5,"keys, table relationships and schemas"]]},"id":"2026-11-01-3","revision":2}
  ] },
  { date: "2026-11-02", title: "Pandas, libraries and R", objectiveIds: ["3.2","3.3","3.4","3.5","2.4","2.5"], light: false, adaptive: false, tasks: [
    {"title":"Read Lumanite 3.2–3.4 and the Pandas examples","minutes":[20,25],"detail":"Read the table tutorial and row/column selection tutorial through boolean filtering. Compare Series/DataFrame, Pandas/NumPy/PyTorch and Python/R. Review missing values, duplicates, type conversion and ACID basics in 3.5.","links":["guide","pandas","subset"],"id":"2026-11-02-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 21–40. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"21–40","count":20},"id":"2026-11-02-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[8,"Pandas selection, filtering and missing values"],[6,"Pandas, NumPy, PyTorch and R uses"],[3,"cleaning and data quality"],[3,"relational database and ACID basics"]]},"id":"2026-11-02-3","revision":2}
  ] },
  { date: "2026-11-03", title: "Conversions: second session", objectiveIds: ["8.4","8.5"], light: true, adaptive: false, tasks: [
    {"title":"Quizlet: study 15 premade cards","minutes":[10,15],"detail":"Open Flashcards mode and turn shuffle off. Study cards 13–27. Say the answer, flip the card, and repeat missed cards once.","links":["quizletBases"],"flashcards":{"deck":"quizletBases","range":"13–27","count":15},"id":"2026-11-03-1","revision":2},
    {"title":"Answer 15 fresh questions and review mistakes","minutes":[15,20],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":15,"breakdown":[[4,"decimal to binary"],[4,"binary to decimal"],[4,"hexadecimal and four-bit grouping"],[3,"data source choices"]]},"id":"2026-11-03-2","revision":2}
  ] },
  { date: "2026-11-04", title: "Pandas grouping and merging", objectiveIds: ["3.3","8.6","8.7","2.4","2.5"], light: false, adaptive: false, tasks: [
    {"title":"Read the linked Pandas examples and Lumanite 8.6–8.7","minutes":[20,25],"detail":"In Summary statistics, read aggregation and groupby. In Combine tables, read concat and merge. Trace one grouped calculation and one key-based merge. Review encoding, scaling, reshaping and workflow order.","links":["groups","merge","guide"],"id":"2026-11-04-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 74–93. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"74–93","count":20},"id":"2026-11-04-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[6,"groupby and aggregation output"],[6,"merge vs concat output"],[4,"encoding, scaling and transformation"],[4,"workflow and cleaning decisions"]]},"id":"2026-11-04-3","revision":2}
  ] },
  { date: "2026-11-05", title: "Generative AI", objectiveIds: ["4.1","4.2","4.3"], light: true, adaptive: false, tasks: [
    {"title":"Read Lumanite 4.1–4.3","minutes":[10,15],"detail":"Compare generation with classification. Study healthcare, research, art and business uses; explain hallucination, bias and why outputs need checking.","links":["guide"],"id":"2026-11-05-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,8],"detail":"Open Flashcards mode and turn shuffle off. Study cards 34–48. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"34–48","count":15},"id":"2026-11-05-2","revision":2},
    {"title":"Answer 10 fresh questions and review mistakes","minutes":[10,12],"detail":"This starts a 15-question generative-AI set. Finish its last 5 questions tomorrow, alongside the new LLM questions. Check answers and write corrections.","links":["practice"],"practice":{"count":10,"breakdown":[[4,"generative AI vs classification"],[3,"applications and suitable uses"],[3,"limitations, bias and verification"]]},"id":"2026-11-05-3","revision":2}
  ] },
  { date: "2026-11-06", title: "AI subfields and LLMs", objectiveIds: ["4.4","4.5","4.6"], light: false, adaptive: false, tasks: [
    {"title":"Read Lumanite 4.4–4.6","minutes":[20,25],"detail":"Compare computer vision, NLP, interaction and robotics. Explain tokens, next-token prediction, context, training vs inference and zero-shot vs few-shot prompts. Use only the opening LLM explanation in the linked Google module.","links":["guide","llm"],"id":"2026-11-06-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 34–53. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"34–53","count":20},"id":"2026-11-06-2","revision":2},
    {"title":"Answer 25 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":25,"breakdown":[[5,"generative AI applications and limitations from November 5"],[5,"AI subfields"],[5,"tokens, context and prediction"],[5,"training, inference and prompting"],[5,"LLM uses and limitations"]]},"id":"2026-11-06-3","revision":2}
  ] },
  { date: "2026-11-07", title: "Machine learning and data splits", objectiveIds: ["5.1","5.2","5.4","5.5","2.6"], light: false, adaptive: false, tasks: [
    {"title":"Read Lumanite 5.1, 5.2, 5.4 and 5.5","minutes":[20,25],"detail":"Study features/labels, model parameters, training/validation/test roles, leakage and supervised/unsupervised/reinforcement learning. Match regression, classification and clustering to 6 scenarios.","links":["guide"],"id":"2026-11-07-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 34–53. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"34–53","count":20},"id":"2026-11-07-2","revision":2},
    {"title":"Answer 25 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":25,"breakdown":[[6,"training, validation and test roles"],[6,"learning categories"],[6,"algorithm selection"],[7,"leakage and model evaluation scenarios"]]},"id":"2026-11-07-3","revision":2}
  ] },
  { date: "2026-11-08", title: "Trees, neural networks and model fit", objectiveIds: ["5.3","5.6"], light: false, adaptive: false, tasks: [
    {"title":"Read Lumanite 5.3 and 5.6","minutes":[20,25],"detail":"Trace 2 decision-tree paths. Sketch neural-network inputs, hidden layers and outputs. Explain weights, activation, loss, overfitting and underfitting; read the introductory neural-network examples in Google’s module.","links":["guide","nn"],"id":"2026-11-08-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 44–57 and 62–67. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"44–57 and 62–67","count":20},"id":"2026-11-08-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[6,"decision-tree paths"],[6,"neural-network behavior and loss"],[4,"overfitting vs underfitting"],[4,"deep learning applications and tradeoffs"]]},"id":"2026-11-08-3","revision":2}
  ] },
  { date: "2026-11-09", title: "Logic and knowledge representation", objectiveIds: ["6.1","6.2","6.3","6.5"], light: false, adaptive: false, tasks: [
    {"title":"Read Lumanite 6.1–6.3 and 6.5","minutes":[20,25],"detail":"Study predicates, variables, AND/OR/NOT, implication and quantifiers. Translate 2 statements and test a converse. Compare rules, knowledge graphs, ontologies and embeddings.","links":["guide"],"id":"2026-11-09-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 44–57 and 62–67. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"44–57 and 62–67","count":20},"id":"2026-11-09-2","revision":2},
    {"title":"Answer 20 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":20,"breakdown":[[8,"predicate and quantifier translations"],[4,"implication and invalid inferences"],[4,"logical vs probabilistic reasoning"],[4,"knowledge representation choices"]]},"id":"2026-11-09-3","revision":2}
  ] },
  { date: "2026-11-10", title: "Bayesian-network structure", objectiveIds: ["6.3","6.4"], light: true, adaptive: false, tasks: [
    {"title":"Read Lumanite 6.4 and the textbook introduction","minutes":[10,15],"detail":"Read the opening definition and network components in textbook section 9.3. Identify nodes, parents, children, conditional probabilities and directed cycles. Arrows describe dependencies; they do not by themselves prove causation.","links":["guide","networks"],"id":"2026-11-10-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,8],"detail":"Open Flashcards mode and turn shuffle off. Study cards 44–57 and 62. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"44–57 and 62","count":15},"id":"2026-11-10-2","revision":2},
    {"title":"Answer 10 fresh questions and review mistakes","minutes":[10,12],"detail":"This starts a 20-question network set. Finish the other 10 tomorrow, alongside probability practice. Check answers and write corrections.","links":["practice"],"practice":{"count":10,"breakdown":[[4,"nodes, parents, children and edges"],[3,"DAGs and conditional-probability tables"],[3,"dependency, causation and reasoning choices"]]},"id":"2026-11-10-3","revision":2}
  ] },
  { date: "2026-11-11", title: "Conditional probability and networks", objectiveIds: ["6.3","6.4","1.4"], light: false, adaptive: false, tasks: [
    {"title":"Work 3 probability examples","minutes":[15,20],"detail":"Use the Lumanite probability explanations: calculate 2 conditional probabilities from two-way tables, then solve 1 base-rate example using counts. Label the condition in P(A given B) before calculating.","links":["guide","networks"],"id":"2026-11-11-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 1–20. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"1–20","count":20},"id":"2026-11-11-2","revision":2},
    {"title":"Answer 25 fresh questions and review mistakes","minutes":[25,30],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":25,"breakdown":[[6,"conditional probability using small tables"],[10,"network structure and conditional-probability interpretation from November 10"],[4,"expected value"],[5,"probability and reasoning definitions"]]},"id":"2026-11-11-3","revision":2}
  ] },
  { date: "2026-11-12", title: "Privacy, bias and credibility", objectiveIds: ["7.1","7.2","7.3","7.4"], light: true, adaptive: false, tasks: [
    {"title":"Read Lumanite 7.1–7.4","minutes":[10,15],"detail":"Study stakeholder tradeoffs, sampling/label/proxy bias, privacy, prompt injection, hallucinations and misinformation. For each risk, name a suitable safeguard.","links":["guide"],"id":"2026-11-12-1","revision":2},
    {"title":"Quizlet: study 15 premade cards","minutes":[5,8],"detail":"Open Flashcards mode and turn shuffle off. Study cards 64–78. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"64–78","count":15},"id":"2026-11-12-2","revision":2},
    {"title":"Answer 10 fresh questions and review mistakes","minutes":[10,12],"detail":"Start with these 10 scenarios. Five more ethics questions are included in tomorrow’s mixed set. Check answers and write corrections.","links":["practice"],"practice":{"count":10,"breakdown":[[3,"ethical tradeoffs"],[3,"bias sources and mitigation"],[2,"LLM privacy and security"],[2,"credibility and verification"]]},"id":"2026-11-12-3","revision":2}
  ] },
  { date: "2026-11-13", title: "Cumulative review", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","7.1","7.2","7.3","7.4","8.1","8.2","8.3","8.4","8.5","8.6","8.7"], light: false, adaptive: false, tasks: [
    {"title":"Review the weakest previously studied topic","minutes":[15,20],"detail":"Use diagnostic results and practice logs to choose the weakest statistics, analysis or foundations objective. Read its exact Lumanite section, then solve 1 new example without notes. Check off other objectives only if you can explain them.","links":["guide","objectives"],"id":"2026-11-13-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 64–83. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"64–83","count":20},"id":"2026-11-13-2","revision":2},
    {"title":"Answer 30 fresh questions and review mistakes","minutes":[25,30],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":30,"breakdown":[[10,"data foundations, sources and conversions"],[10,"statistics and probability"],[5,"charts, regression and cleaning"],[5,"ethics and credibility"]]},"id":"2026-11-13-3","revision":2}
  ] },
  { date: "2026-11-14", title: "Fresh 100-question mock", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","3.1","3.2","3.3","3.4","3.5","4.1","4.2","4.3","4.4","4.5","4.6","5.1","5.2","5.3","5.4","5.5","5.6","6.1","6.2","6.3","6.4","6.5","7.1","7.2","7.3","7.4","8.1","8.2","8.3","8.4","8.5","8.6","8.7"], light: false, adaptive: false, tasks: [
    {"title":"Take a new full test","minutes":[50,50],"detail":"Use a fresh generated 100-question set or Lumanite full test. Work without notes, flag guesses and record elapsed time. Do not reuse Diagnostic 01.","links":["practice"],"practice":{"count":100,"breakdown":[[15,"probability and statistics"],[15,"data analysis"],[10,"tools"],[10,"AI basics"],[10,"machine learning"],[10,"representation and reasoning"],[10,"privacy and ethics"],[20,"data foundations"]]},"id":"2026-11-14-1","revision":2},
    {"title":"Record results and choose review topics","minutes":[5,10],"detail":"Save score, time and uncertainty count. Group errors by objective. Select the 2 objectives with the most missed or guessed answers for Sunday and Monday.","links":[],"id":"2026-11-14-2","revision":2}
  ] },
  { date: "2026-11-15", title: "Mock review: weakest objective", objectiveIds: [], light: false, adaptive: true, tasks: [
    {"title":"Review your weakest mock-test objective","minutes":[20,25],"detail":"Choose the objective with the most missed or guessed mock answers in Focus objective. Read its Lumanite section, correct those answers and solve 2 worked examples before starting the fresh set.","links":["guide"],"id":"2026-11-15-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 21–40. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"21–40","count":20},"id":"2026-11-15-2","revision":2},
    {"title":"Answer 25 fresh questions and review mistakes","minutes":[20,25],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":25,"breakdown":[[15,"the selected weakest objective from the mock"],[5,"SQL and Python review"],[5,"data foundations review"]]},"id":"2026-11-15-3","revision":2}
  ] },
  { date: "2026-11-16", title: "Mock review: second objective", objectiveIds: [], light: false, adaptive: true, tasks: [
    {"title":"Review the second-weakest mock objective","minutes":[15,20],"detail":"Select the next objective with the most errors. Finish its incomplete reading or exercises and solve 1 new example without notes. Log correct answers and guesses separately.","links":["guide"],"id":"2026-11-16-1","revision":2},
    {"title":"Quizlet: study 20 premade cards","minutes":[5,10],"detail":"Open Flashcards mode and turn shuffle off. Study cards 34–53. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"34–53","count":20},"id":"2026-11-16-2","revision":2},
    {"title":"Answer 30 fresh questions and review mistakes","minutes":[25,30],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":30,"breakdown":[[15,"the selected second-weakest mock objective"],[5,"data foundations"],[5,"statistics and analysis"],[5,"AI, ML, reasoning and ethics"]]},"id":"2026-11-16-3","revision":2}
  ] },
  { date: "2026-11-17", title: "Final audit and retest", objectiveIds: ["1.1","1.2","1.3","1.4","1.5","2.1","2.2","2.3","2.4","2.5","2.6","3.1","3.2","3.3","3.4","3.5","4.1","4.2","4.3","4.4","4.5","4.6","5.1","5.2","5.3","5.4","5.5","5.6","6.1","6.2","6.3","6.4","6.5","7.1","7.2","7.3","7.4","8.1","8.2","8.3","8.4","8.5","8.6","8.7"], light: true, adaptive: false, tasks: [
    {"title":"Quizlet: study 15 premade cards","minutes":[5,8],"detail":"Open Flashcards mode and turn shuffle off. Study cards 74–88. Say the answer, flip the card, and repeat missed cards once.","links":["quizletFbla"],"flashcards":{"deck":"quizletFbla","range":"74–88","count":15},"id":"2026-11-17-1","revision":2},
    {"title":"Audit all 44 objectives","minutes":[8,10],"detail":"Use the official objectives and your logs. Mark the topics you can explain and solve independently; list any remaining gaps in Notes. Keep uncertain objectives in Reviewing.","links":["objectives"],"id":"2026-11-17-2","revision":2},
    {"title":"Answer 15 fresh questions and review mistakes","minutes":[12,17],"detail":"Use generated questions or Lumanite. After checking answers, write the correct rule for each mistake or guess.","links":["practice"],"practice":{"count":15,"breakdown":[[5,"your remaining weakest objective"],[5,"data foundations"],[5,"SQL, Python and reasoning review"]]},"id":"2026-11-17-3","revision":2}
  ] }
];

export function scheduleDay(date) { return schedule.find(day => day.date === date); }
export function taskDone(progress, task) {
  const record = progress.tasks[task.id];
  return record?.done === true && record.revision === task.revision;
}
export function practiceRequest(day, task, focusId = '') {
  if (!task.practice) return '';
  const focus = objectives.find(o => o.id === focusId);
  const mix = task.practice.breakdown.map(([count, topic]) => count + ' questions: ' + topic).join('; ');
  const topic = day.title + (focus ? ' — selected objective ' + focus.id + ': ' + focus.name + '. Skills: ' + focus.skills : '');
  return generationPrompt.replace('[TOPIC]', topic).replace('[NUMBER]', String(task.practice.count))
    + '\nUse this exact question mix: ' + mix + '.'
    + '\nUse new wording and examples. Include recall, short calculations or code-output questions where relevant, and applied scenarios. Give one unambiguous correct answer per question, balance answer positions, and check numerical answers and SQL/Pandas outputs.'
    + '\nFor SQL, use SQLite and state any case-sensitivity or NULL assumptions. For Pandas output questions, include the input rows. Treat Bayesian-network arrows as conditional dependencies, not automatic proof of causation.'
    + '\nSet title: ' + day.date + ' — ' + day.title + '. Return JSON for import into my tracker.';
}
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
    if (taskIds.has(key) && row && typeof row.done === 'boolean') next.tasks[key] = { done: row.done, updatedAt: Number(row.updatedAt) || 0, ...(Number.isInteger(row.revision) ? {revision:row.revision} : {}) };
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

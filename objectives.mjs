export const units = [
  { name: 'Probability and statistics', weight: 15, items: [
    ['Central tendency and range', 'Calculate mean, median, mode, and range; choose measures for skewed data and outliers.'],
    ['Variance, standard deviation, covariance', 'Calculate and interpret spread; distinguish sample and population formulas, covariance, and correlation.'],
    ['Normal distributions', 'Recognize normal-distribution properties; use the empirical rule and basic z-scores.'],
    ['Expected value', 'Calculate probability-weighted outcomes and interpret the long-run average.'],
    ['Variable types', 'Distinguish discrete counts from continuous measurements.']
  ]},
  { name: 'Data analysis', weight: 15, items: [
    ['Choose visualizations', 'Select charts for comparisons, distributions, relationships, and change over time.'],
    ['Interpret charts', 'Read histograms, boxplots, and scatterplots, including quartiles, outliers, bins, and patterns.'],
    ['Multivariate methods', 'Distinguish dependence and interdependence methods; interpret multiple linear and logistic regression.'],
    ['Data cleaning', 'Choose and justify cleaning, correction, removal, or imputation.'],
    ['Data quality', 'Identify duplicates, unreliable sources, missingness, inconsistent formats, and incomplete coverage.'],
    ['Algorithm applications', 'Choose linear regression, decision trees, or k-means for practical problems.']
  ]},
  { name: 'Tools for data and AI', weight: 10, items: [
    ['SQL queries', 'Write and interpret selection, filtering, sorting, grouping, aggregation, NULL checks, and basic joins.'],
    ['Libraries and packages', 'Match Pandas, NumPy, and PyTorch to suitable tasks.'],
    ['Python data preparation', 'Interpret short Pandas operations for cleaning, filtering, transforming, grouping, and merging.'],
    ['R for data science', 'Explain uses of R for statistical analysis, modeling, and visualization.'],
    ['Relational databases', 'Understand tables, records, schemas, primary and foreign keys, relationships, and ACID basics.']
  ]},
  { name: 'AI basics', weight: 10, items: [
    ['Generative AI', 'Explain generation from learned patterns and distinguish it from classification.'],
    ['Capabilities and limitations', 'Identify suitable uses, unreliable outputs, and situations requiring verification.'],
    ['Generative AI applications', 'Explain applications, benefits, and limitations in healthcare, research, art, and business.'],
    ['AI subfields', 'Distinguish computer vision, language processing, human interaction, and robotics.'],
    ['Large language models', 'Explain tokens, next-token prediction, context, training, and inference at an introductory level.'],
    ['LLM capabilities', 'Recognize summarization, translation, extraction, coding, and zero-shot or few-shot tasks.']
  ]},
  { name: 'Machine learning', weight: 10, items: [
    ['Learning fundamentals', 'Explain features, labels, parameters, predictions, and learning from data.'],
    ['Training, validation, and testing', 'Distinguish dataset roles and identify leakage or misuse of test data.'],
    ['Algorithm behavior', 'Trace decision trees; explain neural networks, loss, learning functions, overfitting, and underfitting.'],
    ['Learning categories', 'Distinguish supervised, unsupervised, and reinforcement learning.'],
    ['Algorithm selection', 'Select regression, classification, clustering, or reinforcement learning for a scenario.'],
    ['Deep learning', 'Explain its relationship to neural networks, machine learning, and AI; recognize applications and tradeoffs.']
  ]},
  { name: 'Representation and reasoning', weight: 10, items: [
    ['Predicate logic', 'Understand predicates, variables, logical operators, implications, and quantifiers.'],
    ['Apply predicate logic', 'Translate short statements and identify valid or invalid inferences.'],
    ['Logical and probabilistic reasoning', 'Distinguish rule-based deductions from reasoning with uncertainty.'],
    ['Bayesian networks', 'Interpret nodes, directed edges, parent-child relationships, DAGs, and conditional probabilities; distinguish dependency from causation.'],
    ['Knowledge representation', 'Explain introductory uses of rules, knowledge graphs, ontologies, and embeddings.']
  ]},
  { name: 'Privacy and ethics', weight: 10, items: [
    ['Ethical dilemmas', 'Identify stakeholders, harms, benefits, and competing interests in AI applications.'],
    ['Algorithmic bias', 'Recognize bias from sampling, history, labels, proxy variables, or deployment; choose mitigations.'],
    ['LLM privacy and security', 'Recognize data exposure, leakage, prompt injection, and appropriate safeguards.'],
    ['Credibility and misinformation', 'Recognize hallucinations and deceptive content; verify evidence and sources.']
  ]},
  { name: 'Data literacy and foundations', weight: 20, items: [
    ['Nature of data science', 'Explain the roles of statistics, computing, domain knowledge, and decision-making.'],
    ['Data structure', 'Distinguish structured, unstructured, and common semi-structured examples.'],
    ['Numeric and categorical data', 'Distinguish numerical, categorical, discrete, continuous, nominal, and ordinal examples.'],
    ['Binary, decimal, and hexadecimal', 'Convert among bases using place value, hexadecimal digits, and four-bit groups.'],
    ['Data sources', 'Identify information obtainable from surveys, sensors, transactions, logs, APIs, and public datasets.'],
    ['Wrangling and transformation', 'Explain cleaning, reshaping, combining, encoding, scaling, and type conversion.'],
    ['Data science process', 'Explain problem definition, acquisition, preparation, exploration, modeling, interpretation, and iteration.']
  ]}
];
export const objectives = units.flatMap((unit, u) => unit.items.map(([name, skills], i) => ({ id: (u + 1) + '.' + (i + 1), unit: u + 1, unitName: unit.name, name, skills })));

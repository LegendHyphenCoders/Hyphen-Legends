import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Course } from '../models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const coursesSeedData = [
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    category: 'Data & AI',
    level: 'beginner',
    duration: '4 months',
    tuition: 10999,
    shortDescription:
      'Transform raw business data into actionable visual insights using Excel, SQL, Power BI, and Python.',
    featured: true,
    isActive: true,
    modules: [
      {
        title: 'Advanced Spreadsheet Modeling & Business Math',
        lessons: 4,
        topics: [
          'Dynamic arrays, XLOOKUP, INDEX/MATCH, and nested logic',
          'Pivot tables, Power Query data transformation, and data models',
          'Statistical distributions, business KPIs, and variance analysis',
          'Executive summary dashboards and financial modeling basics',
        ],
      },
      {
        title: 'Relational Databases & SQL for Analytics',
        lessons: 4,
        topics: [
          'Relational schema design, normalization, and constraints',
          'Complex JOINs, subqueries, CTEs, and Window Functions (OVER, PARTITION BY)',
          'Aggregations, cohort retention calculations, and time-series extraction',
          'Database performance tuning and query indexing strategies',
        ],
      },
      {
        title: 'Business Intelligence & Interactive Dashboards',
        lessons: 4,
        topics: [
          'Power BI architecture, DAX measures, and calculated columns',
          'Star schema dimensional modeling and relationships',
          'Drill-down charts, KPI cards, and custom visualization components',
          'Publishing to Power BI Service, automated refreshes, and role-level security',
        ],
      },
      {
        title: 'Exploratory Data Analysis with Python & Capstone',
        lessons: 4,
        topics: [
          'Python fundamentals: Pandas dataframes, NumPy arrays, and data wrangling',
          'Visual storytelling with Matplotlib and Seaborn',
          'Automating ETL pipelines and scheduled report generation',
          'End-to-End Capstone project defense and portfolio review',
        ],
      },
    ],
    capstone: {
      title: 'E-Commerce Customer Retention & Churn Dashboard',
      description:
        'Built a dimensional Power BI model analyzing repeat order cycles and CLV across 100,000+ orders with SQL and DAX.',
    },
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    category: 'Data & AI',
    level: 'intermediate',
    duration: '5 months',
    tuition: 13999,
    shortDescription:
      'Master statistical modeling, predictive algorithms, data wrangling, and end-to-end predictive systems in Python.',
    featured: true,
    isActive: true,
    modules: [
      {
        title: 'Mathematics & Statistics for Data Science',
        lessons: 4,
        topics: [
          'Descriptive and inferential statistics, hypothesis testing (Z-test, T-test, ANOVA)',
          'Linear algebra: Vectors, matrices, eigenvalues, and dimensionality reduction',
          'Probability distributions and Bayesian thinking',
        ],
      },
      {
        title: 'Advanced Python & Scientific Computing',
        lessons: 4,
        topics: [
          'Vectorized numerical operations with NumPy',
          'Advanced data manipulation, grouping, and pivots with Pandas',
          'Feature engineering: Encoding, scaling, imputation, and outlier detection',
        ],
      },
      {
        title: 'Supervised & Unsupervised Machine Learning',
        lessons: 6,
        topics: [
          'Linear & Logistic Regression with regularizations (L1 Lasso, L2 Ridge)',
          'Decision Trees, Random Forests, and Gradient Boosting (XGBoost, LightGBM)',
          'K-Means clustering and PCA decomposition',
        ],
      },
      {
        title: 'MLOps, Pipeline Serialization & Deployment',
        lessons: 6,
        topics: [
          'Building reproducible Scikit-Learn preprocessing pipelines',
          'Model tracking and serialization (Joblib/ONNX)',
          'Deploying inference endpoints with FastAPI and Docker containers',
        ],
      },
    ],
    capstone: {
      title: 'Loan Default Risk Scoring Model',
      description:
        'Trained an XGBoost risk classification model evaluating 40+ credit indicators with SMOTE balance correction and FastAPI deployment.',
    },
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning',
    category: 'Data & AI',
    level: 'advanced',
    duration: '4 months',
    tuition: 12999,
    shortDescription:
      'Deep dive into advanced algorithms, neural network architectures, computer vision, and modern NLP architectures.',
    featured: true,
    isActive: true,
    modules: [
      {
        title: 'Mathematical Foundations & Advanced ML Theory',
        lessons: 4,
        topics: [
          'Convex optimization, gradient descent variants (SGD, Adam, RMSprop)',
          'Kernel methods and Support Vector Machines',
          'Dimensionality reduction: t-SNE, UMAP, and spectral embeddings',
        ],
      },
      {
        title: 'Deep Learning Foundations with PyTorch',
        lessons: 4,
        topics: [
          'Tensors, autograd, backpropagation, and computational graphs in PyTorch',
          'Multilayer Perceptrons, activation functions, and regularization',
          'Building training loops and GPU acceleration with CUDA',
        ],
      },
      {
        title: 'Computer Vision & Convolutional Networks',
        lessons: 4,
        topics: [
          'Convolutional operations, pooling, and spatial hierarchy',
          'ResNet and transfer learning on domain-specific datasets',
          'Object detection overview with YOLO',
        ],
      },
      {
        title: 'NLP, Embeddings & Transformer Foundations',
        lessons: 4,
        topics: [
          'Attention mechanisms and Transformer encoder-decoder mechanics',
          'Hugging Face transformers: Fine-tuning BERT for text classification',
          'Model quantization and inference deployment with FastAPI',
        ],
      },
    ],
    capstone: {
      title: 'Medical Image Pathology Classifier',
      description:
        'Fine-tuned ResNet-50 on chest X-ray scans to classify respiratory abnormalities with 93% AUC in PyTorch.',
    },
  },
  {
    slug: 'full-stack-development',
    title: 'Full Stack Development',
    category: 'Software Engineering',
    level: 'intermediate',
    duration: '5 months',
    tuition: 11999,
    shortDescription:
      'Build scalable modern web applications from front to back with React, Node.js, Express, MongoDB, and PostgreSQL.',
    featured: true,
    isActive: true,
    modules: [
      {
        title: 'Modern Frontend: HTML5, CSS3, Modern JavaScript (ES6+)',
        lessons: 4,
        topics: [
          'Semantic HTML5, CSS Grid/Flexbox layouts, and modern responsive design',
          'JavaScript event loop, promises, closures, and async/await',
          'Git/GitHub version control workflow',
        ],
      },
      {
        title: 'React.js Ecosystem & State Architecture',
        lessons: 5,
        topics: [
          'Component lifecycles, JSX, custom hooks, and React Router v6',
          'State management (Context API and Zustand/Redux Toolkit)',
          'Performance optimization: memoization and code splitting',
        ],
      },
      {
        title: 'Backend Engineering with Node.js & Express',
        lessons: 5,
        topics: [
          'RESTful API architecture, middleware pipelines, and error handling',
          'Authentication & authorization: JWT tokens and bcrypt encryption',
          'Input validation, rate limiting, and security best practices',
        ],
      },
      {
        title: 'Databases, ORMs & Production Cloud Deployment',
        lessons: 6,
        topics: [
          'NoSQL data modeling with MongoDB and Mongoose schemas',
          'Relational databases with PostgreSQL and ORM queries',
          'CI/CD pipelines and hosting on Vercel and Render',
        ],
      },
    ],
    capstone: {
      title: 'Collaborative Project Management SaaS',
      description:
        'Full-stack Kanban board with real-time updates, drag-and-drop tasks, and workspace role permission control.',
    },
  },
  {
    slug: 'java-development',
    title: 'Java Development',
    category: 'Software Engineering',
    level: 'beginner',
    duration: '4 months',
    tuition: 10999,
    shortDescription:
      'Enterprise software engineering with Java 17+, Object-Oriented Design, Spring Boot microservices, and Hibernate/JPA.',
    featured: false,
    isActive: true,
    modules: [
      {
        title: 'Core Java & OOP Architecture',
        lessons: 4,
        topics: [
          'JVM memory model, Heap, Stack, and garbage collection',
          'Object-Oriented Programming: Encapsulation, Inheritance, Polymorphism, Abstraction',
          'Exception handling and custom exception hierarchies',
        ],
      },
      {
        title: 'Java Collections, Generics & Modern Features',
        lessons: 4,
        topics: [
          'Collections Framework: ArrayList, LinkedList, HashMap, ConcurrentHashMap',
          'Java 8+ Lambdas, Functional Interfaces, and Stream API pipelines',
          'Multithreading, thread safety, and synchronization',
        ],
      },
      {
        title: 'Relational Data Access & Hibernate/JPA',
        lessons: 4,
        topics: [
          'JDBC prepared statements and SQL injection prevention',
          'Hibernate ORM, entity mappings, and relationship cascading',
          'JPA queries, JPQL, and lazy vs eager fetch optimizations',
        ],
      },
      {
        title: 'Spring Boot Microservices & REST APIs',
        lessons: 4,
        topics: [
          'Spring core: Inversion of Control (IoC) and Dependency Injection (DI)',
          'Building production REST APIs with Spring Web and Spring Data JPA',
          'Unit & Integration testing with JUnit 5 and Mockito',
        ],
      },
    ],
    capstone: {
      title: 'Enterprise Banking Account Management Service',
      description:
        'Core banking API with transaction isolation, debit/credit audit logging, and account statements built with Spring Boot & PostgreSQL.',
    },
  },
  {
    slug: 'tally-and-accounting',
    title: 'Tally and Accounting',
    category: 'Finance & Accounting',
    level: 'beginner',
    duration: '2 months',
    tuition: 8999,
    shortDescription:
      'Practical accounting, GST computation, TDS, payroll processing, and financial reporting with Tally Prime.',
    featured: false,
    isActive: true,
    modules: [
      {
        title: 'Accounting Fundamentals & Tally Prime Setup',
        lessons: 2,
        topics: [
          'Double-entry bookkeeping and Golden Rules of Accounting',
          'Company creation, chart of accounts, and ledger hierarchies',
          'Bank Reconciliation Statements (BRS) and cash book maintenance',
        ],
      },
      {
        title: 'Inventory Management & Bill Allocations',
        lessons: 2,
        topics: [
          'Stock groups, categories, units of measure, and warehouse tracking',
          'Purchase orders, delivery notes, and invoice generation',
          'Batch-wise inventory and expiry tracking',
        ],
      },
      {
        title: 'GST (Goods and Services Tax) & Taxation Rules',
        lessons: 2,
        topics: [
          'CGST, SGST, IGST, and HSN/SAC code mapping',
          'Interstate vs intrastate sales and purchase invoices',
          'Generating GSTR-1, GSTR-2B, and GSTR-3B summary reports',
        ],
      },
      {
        title: 'TDS, Payroll & Year-End Financial Statements',
        lessons: 2,
        topics: [
          'TDS deduction slabs and voucher entries',
          'Payroll processing, salary slips, and attendance vouchers',
          'Generating final Profit & Loss accounts and Balance Sheets',
        ],
      },
    ],
    capstone: {
      title: 'Retail Trading Firm Complete Year Bookkeeping',
      description:
        'Managed end-to-end accounting for a multi-product trading business from company setup to year-end audited balance sheet in Tally Prime.',
    },
  },
  {
    slug: 'python-programming',
    title: 'Python Programming',
    category: 'Software Engineering',
    level: 'beginner',
    duration: '2 months',
    tuition: 5999,
    shortDescription:
      'Master Python from basic syntax to object-oriented programming, data structures, automation scripts, and file APIs.',
    featured: false,
    isActive: true,
    modules: [
      {
        title: 'Python Fundamentals & Control Flow',
        lessons: 2,
        topics: [
          'Variables, dynamic typing, primitive data types, and operators',
          'Conditional logic and loops (while, for, range, enumerate)',
          'String formatting (f-strings) and clean code style',
        ],
      },
      {
        title: 'Data Structures & Functional Logic',
        lessons: 2,
        topics: [
          'Lists, Tuples, Sets, and Dictionaries: Performance and methods',
          'Comprehensions with filtering',
          'Functions, *args, **kwargs, lambda expressions, map, and filter',
        ],
      },
      {
        title: 'Object-Oriented Programming (OOP) & Modules',
        lessons: 2,
        topics: [
          'Classes, instances, __init__ constructor, and inheritance',
          'Dunder methods (__str__, __repr__, __len__)',
          'Modular packages and virtual environments',
        ],
      },
      {
        title: 'File Operations, APIs & Automation Projects',
        lessons: 2,
        topics: [
          'Reading/writing Text, CSV, and JSON files',
          'Exception handling: try-except-finally blocks',
          'Consuming REST APIs using the Requests library and web automation',
        ],
      },
    ],
    capstone: {
      title: 'Automated Desktop File Organizer & Cleaner',
      description:
        'System utility script that monitors directories and categorizes files by extensions with timestamped logging.',
    },
  },
  {
    slug: 'advanced-excel-and-sql',
    title: 'Advanced Excel and SQL',
    category: 'Data & AI',
    level: 'beginner',
    duration: '2 months',
    tuition: 6999,
    shortDescription:
      'The ultimate corporate analyst duo: Complex Excel modeling, Power Query, automated reporting, and relational SQL queries.',
    featured: false,
    isActive: true,
    modules: [
      {
        title: 'Advanced Formulas & Dynamic Arrays in Excel',
        lessons: 2,
        topics: [
          'XLOOKUP, FILTER, SORT, UNIQUE, and multi-condition IFS',
          'Text and date functions (TEXTSPLIT, NETWORKDAYS)',
          'Conditional formatting and spreadsheet audit shortcuts',
        ],
      },
      {
        title: 'Power Query, Pivot Tables & Executive Dashboards',
        lessons: 2,
        topics: [
          'Transforming multi-file folder data using Power Query',
          'Multi-table Pivot Tables, Calculated Fields, and timeline slicers',
          'Designing executive KPI summary dashboards',
        ],
      },
      {
        title: 'Relational Database Foundations & SQL Basics',
        lessons: 2,
        topics: [
          'Primary keys, foreign keys, and relational integrity',
          'SELECT, WHERE, operators (IN, BETWEEN, LIKE), and ORDER BY',
          'Aggregations with GROUP BY and HAVING',
          'JOIN operations: INNER, LEFT, RIGHT, and FULL OUTER',
        ],
      },
      {
        title: 'Advanced SQL Techniques & Excel Integration',
        lessons: 2,
        topics: [
          'Subqueries, CTEs (Common Table Expressions)',
          'Window functions: ROW_NUMBER, RANK, DENSE_RANK',
          'Connecting Excel directly to live SQL databases for automated refresh',
        ],
      },
    ],
    capstone: {
      title: 'Executive SaaS Metric Cockpit (SQL + Excel)',
      description:
        'Live analytical dashboard tracking Monthly Recurring Revenue (MRR), churn, and customer acquisition costs with direct database connection.',
    },
  },
  {
    slug: 'advanced-excel',
    title: 'Advanced Excel',
    category: 'Data & AI',
    level: 'beginner',
    duration: '1 month',
    tuition: 3999,
    shortDescription:
      'Master spreadsheet modeling, dynamic array formulas, nested lookups, Power Query automation, and executive dashboards.',
    featured: false,
    isActive: true,
    modules: [
      {
        title: 'Modern Dynamic Formulas & Spreadsheet Logic',
        lessons: 2,
        topics: [
          'XLOOKUP, FILTER, SORT, UNIQUE, and multi-condition IFS logic',
          'Advanced text and date manipulation: DATEVALUE, TEXTSPLIT, NETWORKDAYS',
          'Dynamic named ranges and audit shortcuts',
          'Multi-tier conditional formatting and custom data validation drop-downs',
        ],
      },
      {
        title: 'Power Query ETL, Pivot Tables & Executive Dashboards',
        lessons: 2,
        topics: [
          'Automated file imports, appending multiple files, and unpivoting',
          'Cleaning messy text, column splitting, and null value handling',
          'Advanced Pivot Tables, calculated items, and interactive slicers',
          'Designing high-impact C-suite KPI executive dashboards',
        ],
      },
    ],
    capstone: {
      title: 'Automated Regional Sales Consolidation Pipeline',
      description:
        'Zero-touch Power Query workbook combining 12 monthly regional sheets into an executive revenue summary.',
    },
  },
  {
    slug: 'sql',
    title: 'SQL for Analytics',
    category: 'Data & AI',
    level: 'beginner',
    duration: '1 month',
    tuition: 4999,
    shortDescription:
      'Master relational database querying, complex JOINs, aggregations, Window Functions, and query optimization.',
    featured: false,
    isActive: true,
    modules: [
      {
        title: 'Relational Architecture, Queries & Aggregations',
        lessons: 2,
        topics: [
          'Relational concepts: Primary Keys, Foreign Keys, schemas, and data types',
          'SELECT, WHERE filtering, operators (LIKE, IN, BETWEEN), and ORDER BY',
          'Aggregations: COUNT, SUM, AVG, MIN, MAX with GROUP BY and HAVING filters',
          'String and date transformation functions in PostgreSQL and MySQL',
        ],
      },
      {
        title: 'Complex Joins, Subqueries & Window Functions',
        lessons: 2,
        topics: [
          'Table JOINs: INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins',
          'Subqueries, correlated subqueries, and Common Table Expressions (CTEs)',
          'Analytical Window Functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD',
          'Query optimization, execution plan analysis (EXPLAIN), and index design',
        ],
      },
    ],
    capstone: {
      title: 'E-Commerce Customer Lifecycle & Cohort SQL Study',
      description:
        'Complex CTEs and Window Functions on 500,000+ orders to calculate monthly customer retention rates.',
    },
  },
];

async function seedCourses() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('CRITICAL: MONGODB_URI is not defined. Cannot run seed script.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB Atlas for seeding...');
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    console.log('Connected to MongoDB Atlas.');

    console.log('Dropping existing Course collection...');
    await Course.deleteMany({});
    console.log('Existing courses removed.');

    console.log(`Inserting ${coursesSeedData.length} courses...`);
    const inserted = await Course.insertMany(coursesSeedData);
    console.log(`Successfully seeded ${inserted.length} courses into MongoDB:`);
    inserted.forEach((c) => console.log(`  - [${c.category}] ${c.title} (slug: ${c.slug}, tuition: ₹${c.tuition})`));

    console.log('\nSeed completed successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed script failed:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedCourses();

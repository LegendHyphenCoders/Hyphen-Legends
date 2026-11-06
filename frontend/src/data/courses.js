/**
 * Centralized Course Catalog for HL Stack.
 * All draft fees and durations are editable in this single file.
 * Prices are strictly labeled as proposed fees to maintain full pricing transparency.
 */

export const courses = [
  {
    id: "data-analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    shortDescription:
      "Transform raw business data into actionable visual insights using Excel, SQL, Power BI, and Python.",
    fullDescription:
      "Our Data Analytics program is engineered to build end-to-end analytical capability. You will start from foundational business intelligence querying and progress through statistical analysis, data cleaning pipelines, and interactive executive dashboards in Power BI and Tableau. Designed for aspiring analysts seeking corporate and product analytics roles.",
    category: "Data & AI",
    skillLevel: "Beginner to Intermediate",
    duration: "4 months",
    proposedFee: 10999,
    feeDisplay: "₹10,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: true,
    classFormat: "Live Online Classes + Weekly Mentored Lab Sessions",
    weeklyCommitment: "6-8 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Advanced Spreadsheet Modeling & Business Math",
        duration: "Weeks 1-4",
        topics: [
          "Dynamic arrays, XLOOKUP, INDEX/MATCH, and nested logic",
          "Pivot tables, Power Query data transformation, and data models",
          "Statistical distributions, business KPIs, and variance analysis",
          "Executive summary dashboards and financial modeling basics",
        ],
      },
      {
        number: 2,
        title: "Relational Databases & SQL for Analytics",
        duration: "Weeks 5-8",
        topics: [
          "Relational schema design, normalization, and constraints",
          "Complex JOINs, subqueries, CTEs, and Window Functions (OVER, PARTITION BY)",
          "Aggregations, cohort retention calculations, and time-series extraction",
          "Database performance tuning and query indexing strategies",
        ],
      },
      {
        number: 3,
        title: "Business Intelligence & Interactive Dashboards",
        duration: "Weeks 9-12",
        topics: [
          "Power BI architecture, DAX measures, and calculated columns",
          "Star schema dimensional modeling and relationships",
          "Drill-down charts, KPI cards, and custom visualization components",
          "Publishing to Power BI Service, automated refreshes, and role-level security",
        ],
      },
      {
        number: 4,
        title: "Exploratory Data Analysis with Python & Capstone",
        duration: "Weeks 13-16",
        topics: [
          "Python fundamentals: Pandas dataframes, NumPy arrays, and data wrangling",
          "Visual storytelling with Matplotlib and Seaborn",
          "Automating ETL pipelines and scheduled report generation",
          "End-to-End Capstone project defense and portfolio review",
        ],
      },
    ],
    learningOutcomes: [
      "Extract and clean messy datasets from relational databases using complex SQL queries.",
      "Design scalable business dashboards in Power BI with optimized DAX calculations.",
      "Conduct exploratory statistical analysis in Python to uncover revenue leakage and customer trends.",
      "Communicate data-driven insights through structured executive slide decks and case studies.",
      "Construct end-to-end business intelligence portfolios hosted on GitHub.",
    ],
    projects: [
      {
        title: "E-Commerce Customer Retention & Churn Dashboard",
        description:
          "Built a dimensional Power BI model analyzing repeat order cycles and CLV across 100,000+ orders.",
        tech: ["SQL", "Power BI", "DAX", "Excel"],
      },
      {
        title: "Healthcare Clinic Utilization & Patient Flow ETL",
        description:
          "Automated Python data cleaning pipeline processing appointment data, calculating average doctor wait times.",
        tech: ["Python", "Pandas", "PostgreSQL"],
      },
      {
        title: "FinTech Transaction Fraud Detection Analytics",
        description:
          "Analyzed suspicious debit transactions using Window Functions to flag velocity breaches in near real-time.",
        tech: ["PostgreSQL", "Window Functions", "Tableau"],
      },
    ],
    prerequisites: [
      "No prior coding experience required.",
      "Basic familiarity with operating a computer and basic mathematics/arithmetic.",
      "Commitment to 6-8 hours of weekly live sessions and practical assignments.",
    ],
    whoShouldJoin: [
      "Fresh college graduates aiming for Junior Data Analyst or Business Analyst roles.",
      "Operations, Sales, and Marketing professionals looking to make data-driven decisions.",
      "IT professionals seeking to pivot toward modern business intelligence tooling.",
    ],
    faqs: [
      {
        q: "Do I need a technical degree or computer science background?",
        a: "No. The course starts from foundational spreadsheet and SQL logic, progressing step-by-step into Python analytics.",
      },
      {
        q: "Are the classes live or pre-recorded?",
        a: "All core sessions are live and interactive with screen sharing and instant mentor Q&A. Class recordings are provided for revision.",
      },
      {
        q: "What software tools do I need to install?",
        a: "We provide guided setup for free community tools: PostgreSQL, Power BI Desktop, VS Code, and Python (Anaconda).",
      },
    ],
  },

  {
    id: "data-science",
    slug: "data-science",
    title: "Data Science",
    shortDescription:
      "Master statistical modeling, predictive algorithms, data wrangling, and end-to-end predictive systems in Python.",
    fullDescription:
      "Our comprehensive Data Science curriculum bridges rigorous mathematical fundamentals with modern computational workflows. From exploratory analysis and probability theory to regression modeling, feature engineering, and model deployment via REST APIs, this course equips you to solve predictive problems on real-world datasets.",
    category: "Data & AI",
    skillLevel: "Intermediate",
    duration: "5 months",
    proposedFee: 13999,
    feeDisplay: "₹13,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: true,
    classFormat: "Live Online Classes + Mentor-Guided Code Reviews",
    weeklyCommitment: "8-10 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Mathematics & Statistics for Data Science",
        duration: "Weeks 1-4",
        topics: [
          "Descriptive and inferential statistics, hypothesis testing (Z-test, T-test, ANOVA)",
          "Linear algebra: Vectors, matrices, eigenvalues, and dimensionality reduction",
          "Multivariable calculus concepts for optimization algorithms (gradient descent)",
          "Probability distributions (Normal, Poisson, Binomial) and Bayesian thinking",
        ],
      },
      {
        number: 2,
        title: "Advanced Python & Scientific Computing",
        duration: "Weeks 5-8",
        topics: [
          "Vectorized numerical operations with NumPy",
          "Advanced data manipulation, grouping, and pivots with Pandas",
          "Feature engineering: Encoding, scaling, imputation, and outlier detection",
          "Data visualization with Matplotlib, Seaborn, and Plotly interactive charts",
        ],
      },
      {
        number: 3,
        title: "Supervised & Unsupervised Machine Learning",
        duration: "Weeks 9-14",
        topics: [
          "Linear & Logistic Regression with regularizations (L1 Lasso, L2 Ridge)",
          "Decision Trees, Random Forests, and Gradient Boosting (XGBoost, LightGBM)",
          "K-Means clustering, hierarchical clustering, and PCA decomposition",
          "Model evaluation metrics: ROC-AUC, precision-recall, confusion matrices, F1 score",
        ],
      },
      {
        number: 4,
        title: "MLOps, Pipeline Serialization & Deployment",
        duration: "Weeks 15-20",
        topics: [
          "Building reproducible Scikit-Learn preprocessing pipelines",
          "Model tracking, experiment logging, and model serialization (Joblib/ONNX)",
          "Deploying inference endpoints with FastAPI and Docker containers",
          "Interactive demo apps with Streamlit and cloud deployment walkthrough",
        ],
      },
    ],
    learningOutcomes: [
      "Formulate real business questions as quantitative predictive machine learning models.",
      "Execute rigorous exploratory analysis and clean real-world noisy sensor or transactional data.",
      "Tune ensemble algorithms like XGBoost and interpret feature importance using SHAP values.",
      "Wrap predictive models into production FastAPI endpoints packaged with Docker.",
      "Showcase polished, reproducible GitHub repositories with Jupyter notebooks and documentation.",
    ],
    projects: [
      {
        title: "Loan Default Risk Scoring Model",
        description:
          "Trained an XGBoost risk classification model evaluating 40+ credit indicators with SMOTE balance correction.",
        tech: ["Python", "Scikit-Learn", "XGBoost", "FastAPI"],
      },
      {
        title: "Customer Lifetime Value & Clustering Engine",
        description:
          "Segmented enterprise SaaS customers using RFM metrics and K-Means to identify high-value cohorts.",
        tech: ["NumPy", "Pandas", "Matplotlib", "Streamlit"],
      },
      {
        title: "Real Estate Valuation Microservice",
        description:
          "Containerized regression model serving housing valuations based on geographical and demographic data.",
        tech: ["FastAPI", "Docker", "Joblib", "Render"],
      },
    ],
    prerequisites: [
      "Basic programming exposure in Python or any other language.",
      "High school mathematics (algebra and basic calculus/statistics familiarity).",
      "Laptop or PC with minimum 8GB RAM.",
    ],
    whoShouldJoin: [
      "Software developers and analysts seeking to transition into Data Science roles.",
      "STEM degree students aiming for high-impact analytics and modeling careers.",
      "Professionals looking to automate complex predictive decision-making.",
    ],
    faqs: [
      {
        q: "Is prior machine learning knowledge required?",
        a: "No. We begin with mathematical foundations and basic programming before introducing machine learning libraries.",
      },
      {
        q: "Will we learn deep learning in this course?",
        a: "This program focuses thoroughly on statistical machine learning and production deployment. For dedicated neural network architectures, check our Machine Learning course.",
      },
      {
        q: "Are the projects based on toy datasets or real data?",
        a: "Projects use real-world datasets with missing values, skewed distributions, and realistic edge cases.",
      },
    ],
  },

  {
    id: "machine-learning",
    slug: "machine-learning",
    title: "Machine Learning",
    shortDescription:
      "Deep dive into advanced algorithms, neural network architectures, computer vision, and modern NLP architectures.",
    fullDescription:
      "Engineered for builders who want to delve into mathematical and algorithmic depth. This course covers both classic machine learning theory and modern deep neural networks with PyTorch, transfer learning, transformer architectures, and production model serving.",
    category: "Data & AI",
    skillLevel: "Intermediate to Advanced",
    duration: "4 months",
    proposedFee: 12999,
    feeDisplay: "₹12,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: true,
    classFormat: "Live Online Classes + Guided Computational Labs",
    weeklyCommitment: "8-10 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Mathematical Foundations & Advanced ML Theory",
        duration: "Weeks 1-4",
        topics: [
          "Convex optimization, gradient descent variants (SGD, Adam, RMSprop)",
          "Kernel methods, Support Vector Machines, and margin maximization",
          "Ensemble methods: Bagging, Boosting, Stacking, and calibration",
          "Dimensionality reduction: t-SNE, UMAP, and spectral embeddings",
        ],
      },
      {
        number: 2,
        title: "Deep Learning Foundations with PyTorch",
        duration: "Weeks 5-8",
        topics: [
          "Tensors, autograd, backpropagation, and computational graphs in PyTorch",
          "Multilayer Perceptrons (MLPs), activation functions, and regularization (Dropout, BatchNorm)",
          "Loss functions: Cross-entropy, Focal loss, MSE, and custom losses",
          "Building training loops, checkpointing, and GPU acceleration with CUDA",
        ],
      },
      {
        number: 3,
        title: "Computer Vision & Convolutional Networks",
        duration: "Weeks 9-12",
        topics: [
          "Convolutional operations, pooling, and spatial hierarchy",
          "ResNet, EfficientNet, and modern backbone architectures",
          "Transfer learning and fine-tuning on domain-specific image datasets",
          "Object detection and segmentation overview (YOLO concepts)",
        ],
      },
      {
        number: 4,
        title: "NLP, Embeddings & Transformer Foundations",
        duration: "Weeks 13-16",
        topics: [
          "Word embeddings: Word2Vec, GloVe, and dense vector representations",
          "Attention mechanisms, Self-Attention, and Transformer encoder-decoder mechanics",
          "Hugging Face transformers: Fine-tuning BERT for classification and sentiment analysis",
          "Model quantization, ONNX export, and serving via Triton or FastAPI",
        ],
      },
    ],
    learningOutcomes: [
      "Implement deep neural networks from scratch and debug gradient behavior in PyTorch.",
      "Fine-tune pre-trained vision models and evaluate domain-specific accuracy.",
      "Utilize Hugging Face transformers for real-world text classification and named-entity extraction.",
      "Serialize and optimize weights for efficient cloud inference latency.",
      "Conduct rigorous ablation experiments and write scientific documentation.",
    ],
    projects: [
      {
        title: "Medical Image Pathology Classifier",
        description:
          "Fine-tuned ResNet-50 on chest X-ray scans to classify respiratory abnormalities with 93% AUC.",
        tech: ["PyTorch", "Torchvision", "CUDA", "FastAPI"],
      },
      {
        title: "Customer Support Ticket Intent & Sentiment Classifier",
        description:
          "Fine-tuned DistilBERT transformer to automatically route support emails to relevant technical queues.",
        tech: ["Transformers", "HuggingFace", "Python", "Docker"],
      },
      {
        title: "Real-time Vehicle Detection & Counting System",
        description:
          "Integrated lightweight YOLO pipeline processing video streams for parking density measurement.",
        tech: ["OpenCV", "PyTorch", "Streamlit"],
      },
    ],
    prerequisites: [
      "Solid understanding of Python programming (functions, OOP, libraries).",
      "Foundational linear algebra and calculus (derivatives and matrix multiplication).",
      "Access to Google Colab or a computer with dedicated GPU recommended (Colab free tier is supported).",
    ],
    whoShouldJoin: [
      "Software engineers wanting to specialize in Applied Machine Learning.",
      "Data analysts transitioning to AI and deep learning research/engineering.",
      "Computer science students planning a career in AI applications.",
    ],
    faqs: [
      {
        q: "Do I need an expensive GPU laptop?",
        a: "No. All deep learning lab sessions are optimized to run on free Google Colab or Kaggle cloud GPUs.",
      },
      {
        q: "Which deep learning framework do you teach?",
        a: "We teach PyTorch, the industry standard for AI research and modern production deployments.",
      },
      {
        q: "Is this suitable for a total beginner to programming?",
        a: "We recommend our Python Programming course first if you have never written code before.",
      },
    ],
  },

  {
    id: "full-stack-development",
    slug: "full-stack-development",
    title: "Full Stack Development",
    shortDescription:
      "Build scalable modern web applications from front to back with React, Node.js, Express, MongoDB, and PostgreSQL.",
    fullDescription:
      "A complete professional web development track covering responsive user interfaces, RESTful and GraphQL APIs, asynchronous microservices, authentication systems, database architecture, and automated cloud deployments.",
    category: "Software Engineering",
    skillLevel: "Beginner to Advanced",
    duration: "5 months",
    proposedFee: 11999,
    feeDisplay: "₹11,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: true,
    classFormat: "Live Online Coding Sessions + Real Codebase Reviews",
    weeklyCommitment: "8-10 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Modern Frontend: HTML5, CSS3, Modern JavaScript (ES6+)",
        duration: "Weeks 1-4",
        topics: [
          "Semantic HTML5, accessibility (a11y), and CSS Grid/Flexbox layouts",
          "Responsive typography, CSS variables, and modern animation techniques",
          "JavaScript engine fundamentals: Event loop, closures, promises, and async/await",
          "DOM manipulation, fetch API, modular code design, and Git/GitHub version control",
        ],
      },
      {
        number: 2,
        title: "React.js Ecosystem & State Architecture",
        duration: "Weeks 5-9",
        topics: [
          "Component lifecycles, JSX, props, state, and custom hooks",
          "Client-side routing with React Router v6 and route protections",
          "Global state management (Context API and Zustand/Redux Toolkit)",
          "Performance optimization: memoization, code splitting, and lazy loading",
        ],
      },
      {
        number: 3,
        title: "Backend Engineering with Node.js & Express",
        duration: "Weeks 10-14",
        topics: [
          "Node.js runtime, event emitters, streams, and file I/O",
          "RESTful API architecture, middleware pipelines, and error handling",
          "Authentication & authorization: JWT tokens, HTTP-only cookies, and bcrypt",
          "Input validation, rate limiting, CORS configuration, and security best practices",
        ],
      },
      {
        number: 4,
        title: "Databases, ORMs & Production Cloud Deployment",
        duration: "Weeks 15-20",
        topics: [
          "NoSQL data modeling with MongoDB and Mongoose schemas",
          "Relational databases with PostgreSQL and Prisma / Sequelize ORM",
          "Database indexing, transactions, and migration strategies",
          "CI/CD pipelines, Docker containerization, and hosting on Vercel/Render/AWS",
        ],
      },
    ],
    learningOutcomes: [
      "Architect and code production-ready responsive single page applications (SPAs) with React.",
      "Design and document secure REST APIs following industry standards.",
      "Implement multi-role user authentication with JWT and encrypted credential storage.",
      "Model relational and document database schemas with foreign keys, indexes, and cascades.",
      "Deploy full-stack projects to cloud platforms with continuous deployment pipelines.",
    ],
    projects: [
      {
        title: "Collaborative Project Management SaaS",
        description:
          "Full-stack Kanban board with real-time updates, drag-and-drop tasks, and workspace permission control.",
        tech: ["React", "Node.js", "Express", "PostgreSQL", "TailwindCSS"],
      },
      {
        title: "E-Commerce Platform with Cart & Payment Flow Simulation",
        description:
          "Modular store with product search, category filters, session carts, order management, and admin dashboard.",
        tech: ["React", "Express", "MongoDB", "JWT"],
      },
      {
        title: "Developer Community Knowledge Sharing Hub",
        description:
          "Q&A community platform with markdown editor, upvoting, tag filtering, and user reputation points.",
        tech: ["React", "Node.js", "MongoDB", "Vite"],
      },
    ],
    prerequisites: [
      "No mandatory prior programming experience needed.",
      "Basic understanding of computers and internet concepts.",
      "Dedication to write code consistently every week.",
    ],
    whoShouldJoin: [
      "Aspiring software engineers targeting Frontend, Backend, or Full Stack roles.",
      "College students preparing for technical interviews and IT service/product placements.",
      "Professionals transitioning from non-coding IT support or operations roles.",
    ],
    faqs: [
      {
        q: "Do we learn both frontend and backend?",
        a: "Yes. The curriculum covers the entire stack: React for UI, Node.js/Express for backend logic, and PostgreSQL/MongoDB for persistence.",
      },
      {
        q: "Will we build projects from scratch or follow boilerplate?",
        a: "You write every line from an empty folder, learning clean project architecture, routing, and deployment.",
      },
      {
        q: "Is Git and GitHub included?",
        a: "Yes. From week one you commit code to GitHub, creating a visible activity streak for recruiters.",
      },
    ],
  },

  {
    id: "java-development",
    slug: "java-development",
    title: "Java Development",
    shortDescription:
      "Enterprise software engineering with Java 17+, Object-Oriented Design, Spring Boot microservices, and Hibernate/JPA.",
    fullDescription:
      "Java remains the backbone of global banking, telecommunications, and enterprise systems. This rigorous course covers Java core mechanics, Collections framework, multithreading, relational database querying with JDBC and JPA, and microservice development with Spring Boot.",
    category: "Software Engineering",
    skillLevel: "Beginner to Intermediate",
    duration: "4 months",
    proposedFee: 10999,
    feeDisplay: "₹10,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: false,
    classFormat: "Live Online Classes + Practical Problem Sets",
    weeklyCommitment: "6-8 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Core Java & OOP Architecture",
        duration: "Weeks 1-4",
        topics: [
          "JVM memory model: Heap, Stack, garbage collection, and classloaders",
          "Object-Oriented Programming: Encapsulation, Inheritance, Polymorphism, Abstraction",
          "Interfaces, abstract classes, access modifiers, and SOLID design principles",
          "Exception handling architecture and custom checked/unchecked exceptions",
        ],
      },
      {
        number: 2,
        title: "Java Collections, Generics & Modern Features",
        duration: "Weeks 5-8",
        topics: [
          "Collections Framework: ArrayList, LinkedList, HashMap, ConcurrentHashMap, TreeSet",
          "Generics, type bounds, and wildcard mechanics",
          "Java 8+ Lambdas, Functional Interfaces, and Stream API data pipelines",
          "Multithreading, thread safety, synchronization, and ExecutorService",
        ],
      },
      {
        number: 3,
        title: "Relational Data Access & Hibernate/JPA",
        duration: "Weeks 9-12",
        topics: [
          "JDBC connections, prepared statements, and SQL injection prevention",
          "Hibernate ORM, entity mappings, relationships (@OneToMany, @ManyToMany)",
          "JPA queries, JPQL, criteria queries, and lazy vs eager fetch optimizations",
          "Database connection pooling with HikariCP and transaction management",
        ],
      },
      {
        number: 4,
        title: "Spring Boot Microservices & REST APIs",
        duration: "Weeks 13-16",
        topics: [
          "Spring core: Inversion of Control (IoC) and Dependency Injection (DI)",
          "Building production REST APIs with Spring Web and Spring Data JPA",
          "Validation with Hibernate Validator and centralized exception handling",
          "Unit & Integration testing with JUnit 5 and Mockito",
        ],
      },
    ],
    learningOutcomes: [
      "Master object-oriented architecture and enterprise coding conventions in Java.",
      "Manipulate large datasets efficiently using the Java Streams and Collections framework.",
      "Develop secure, production-tested RESTful microservices using Spring Boot.",
      "Connect and manage PostgreSQL or MySQL databases using Spring Data JPA and Hibernate.",
      "Write automated unit tests using JUnit 5 and Mockito for robust code coverage.",
    ],
    projects: [
      {
        title: "Enterprise Banking Account Management Service",
        description:
          "Core banking API with transaction isolation, debit/credit audit logging, and account statements.",
        tech: ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "JUnit"],
      },
      {
        title: "Employee Leave & Performance Tracking System",
        description:
          "Internal enterprise service managing employee hierarchy, leave approvals, and role permissions.",
        tech: ["Spring Boot", "Spring Data JPA", "MySQL", "Swagger"],
      },
      {
        title: "Digital Library & Reservation Microservice",
        description:
          "High-concurrency reservation system utilizing Java multithreading and transactional locking.",
        tech: ["Java", "Spring Boot", "H2 Database", "Maven"],
      },
    ],
    prerequisites: [
      "Familiarity with basic computer logic and problem solving.",
      "Zero prior Java experience required — course begins with fundamental syntax.",
      "PC or Mac with at least 8GB RAM to run IntelliJ IDEA and Maven.",
    ],
    whoShouldJoin: [
      "Engineering and BCA/MCA students preparing for MNC and product enterprise campus drives.",
      "Developers looking to build high-scale, strictly typed backend microservices.",
      "Software testers or legacy developers upskilling to backend engineering.",
    ],
    faqs: [
      {
        q: "Which version of Java is taught?",
        a: "We teach Java 17 and 21 LTS, focusing on modern language features like records, pattern matching, and enhanced switch expressions.",
      },
      {
        q: "Is Spring Boot covered in this course?",
        a: "Yes! A full month is dedicated to Spring Boot, Spring Data JPA, and building REST microservices.",
      },
      {
        q: "What IDE will we use?",
        a: "We use IntelliJ IDEA Community Edition and configure Apache Maven for dependency management.",
      },
    ],
  },

  {
    id: "tally-and-accounting",
    slug: "tally-and-accounting",
    title: "Tally and Accounting",
    shortDescription:
      "Practical accounting, GST computation, TDS, payroll processing, and financial reporting with Tally Prime.",
    fullDescription:
      "A hands-on, job-oriented curriculum for commerce graduates, aspiring accountants, and small business owners. Learn modern computerized accounting principles, voucher entries, GST returns calculation, bank reconciliations, and financial year-end statements in Tally Prime.",
    category: "Finance & Accounting",
    skillLevel: "Beginner",
    duration: "2 months",
    proposedFee: 7499,
    feeDisplay: "₹7,499",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: false,
    classFormat: "Live Practical Sessions with Simulated Company Records",
    weeklyCommitment: "5-6 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Accounting Fundamentals & Tally Prime Setup",
        duration: "Weeks 1-2",
        topics: [
          "Double-entry bookkeeping, Golden Rules of Accounting, and ledger hierarchies",
          "Company creation, configuration, chart of accounts, and groups in Tally Prime",
          "Voucher types: Payment, Receipt, Contra, Journal, Sales, and Purchase vouchers",
          "Bank Reconciliation Statements (BRS) and cash book maintenance",
        ],
      },
      {
        number: 2,
        title: "Inventory Management & Bill Allocations",
        duration: "Weeks 3-4",
        topics: [
          "Stock groups, categories, units of measure, and godown/warehouse tracking",
          "Purchase orders, delivery notes, rejection slips, and invoice generation",
          "Batch-wise inventory, expiry tracking, and manufacturing journal entries",
          "Price levels, discount structures, and cost centers",
        ],
      },
      {
        number: 3,
        title: "GST (Goods and Services Tax) & Taxation Rules",
        duration: "Weeks 5-6",
        topics: [
          "GST structure: CGST, SGST, IGST, and HSN/SAC code mapping",
          "Interstate vs intrastate sales and purchase invoice generation with tax",
          "Reverse Charge Mechanism (RCM) and GST composition scheme basics",
          "Generating and reviewing GSTR-1, GSTR-2B, and GSTR-3B summary reports",
        ],
      },
      {
        number: 4,
        title: "TDS, Payroll & Year-End Financial Statements",
        duration: "Weeks 7-8",
        topics: [
          "Tax Deducted at Source (TDS) entries, deduction slabs, and ledger setup",
          "Payroll processing: Employee groups, attendance vouchers, pay heads, and salary slips",
          "Generating Profit & Loss accounts, Balance Sheets, and Trial Balance reports",
          "Auditing checklists, data export to Excel, and year-end closing entries",
        ],
      },
    ],
    learningOutcomes: [
      "Operate Tally Prime confidently for everyday commercial bookkeeping operations.",
      "Execute error-free GST sales and purchase entries with correct HSN classifications.",
      "Perform monthly bank reconciliation statements with precision.",
      "Calculate salary pay heads, professional tax deductions, and generate pay slips.",
      "Prepare final Trial Balance, Profit & Loss, and Balance Sheet reports for auditors.",
    ],
    prerequisites: [
      "Basic understanding of mathematics and arithmetic.",
      "Commerce background is beneficial but not required — basic accounting is taught from the start.",
      "Windows PC with access to Tally Prime Educational mode (free).",
    ],
    whoShouldJoin: [
      "B.Com, BBA, and Arts graduates seeking accounting and audit assistant jobs.",
      "Business owners wanting to digitize and inspect their firm's financial health.",
      "Administrative and office professionals expanding their corporate financial skills.",
    ],
    faqs: [
      {
        q: "Do I need to buy expensive Tally software?",
        a: "No! Tally Prime offers a free Educational Mode which is 100% sufficient for practicing all course modules.",
      },
      {
        q: "Is GST filing covered in this course?",
        a: "Yes! We teach invoice creation with tax computation, input credit verification, and generating GSTR-1 & 3B reports.",
      },
      {
        q: "Will I learn how to export data to Microsoft Excel?",
        a: "Yes, exporting ledgers and trial balances to Excel for MIS reporting is a core component.",
      },
    ],
  },

  {
    id: "python-programming",
    slug: "python-programming",
    title: "Python Programming",
    shortDescription:
      "Master Python from basic syntax to object-oriented programming, data structures, automation scripts, and file APIs.",
    fullDescription:
      "A fast-paced, high-clarity foundational course in Python 3. Perfect for total beginners or professionals transitioning into tech. Learn core syntax, data structures, functional paradigms, OOP, web scraping, and automation scripts.",
    category: "Programming",
    skillLevel: "Beginner",
    duration: "2 months",
    proposedFee: 5999,
    feeDisplay: "₹5,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: false,
    classFormat: "Live Interactive Classes + Daily Coding Practice",
    weeklyCommitment: "5-6 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Python Fundamentals & Control Flow",
        duration: "Weeks 1-2",
        topics: [
          "Variables, dynamic typing, primitive data types, and operators",
          "Conditional logic (if-elif-else) and match-case structures",
          "Loops: while, for, range, break, continue, and enumerate",
          "Interactive console input, string formatting (f-strings), and clean code style",
        ],
      },
      {
        number: 2,
        title: "Data Structures & Functional Logic",
        duration: "Weeks 3-4",
        topics: [
          "Lists, Tuples, Sets, and Dictionaries: Performance characteristics & methods",
          "List, set, and dictionary comprehensions with filtering",
          "Defining functions, *args, **kwargs, default parameters, and scope rules",
          "Lambda expressions, map, filter, and sorted key functions",
        ],
      },
      {
        number: 3,
        title: "Object-Oriented Programming (OOP) & Modules",
        duration: "Weeks 5-6",
        topics: [
          "Classes, instances, __init__ constructor, instance vs class variables",
          "Inheritance, method overriding, super(), and multiple inheritance",
          "Dunder methods (__str__, __repr__, __len__, __eq__)",
          "Creating modular packages, importing standard libraries, and virtual environments",
        ],
      },
      {
        number: 4,
        title: "File Operations, APIs & Automation Projects",
        duration: "Weeks 7-8",
        topics: [
          "File reading/writing: Text, CSV, JSON, and context managers (with open)",
          "Exception handling: try-except-else-finally and raising custom errors",
          "Consuming REST APIs using the Requests library",
          "Web scraping basics with BeautifulSoup and practical task automation",
        ],
      },
    ],
    learningOutcomes: [
      "Write clean, idiomatic Python 3 code adhering to PEP 8 standards.",
      "Solve algorithmic problems using appropriate collections and time-efficient structures.",
      "Architect modular programs with reusable classes and inheritance.",
      "Automate repetitive daily tasks such as file sorting and web data extraction.",
      "Interact with external web services and parse JSON API payloads.",
    ],
    projects: [
      {
        title: "Automated Desktop File Organizer & Cleaner",
        description:
          "System utility script that monitors directories and categorizes files by extensions with logs.",
        tech: ["Python", "os", "shutil", "datetime"],
      },
      {
        title: "Weather & Flight Price Alert Bot",
        description:
          "CLI application fetching live weather or flight prices via public REST APIs and generating summary reports.",
        tech: ["Python", "Requests", "JSON API"],
      },
      {
        title: "Text-Based Command Line RPG Game",
        description:
          "Interactive game demonstrating OOP principles, inventory management, and game loop state.",
        tech: ["Python OOP", "Custom Classes"],
      },
    ],
    prerequisites: [
      "Zero prior coding knowledge required.",
      "A working computer (Windows, macOS, or Linux) with internet access.",
      "Curiosity and willingness to practice coding exercises weekly.",
    ],
    whoShouldJoin: [
      "Complete beginners taking their very first step into software development.",
      "Non-technical professionals wanting to automate repetitive tasks.",
      "Students preparing for college programming courses or Data/AI tracks.",
    ],
    faqs: [
      {
        q: "Is Python difficult to learn for someone with no coding background?",
        a: "Python is famous for its clean, English-like syntax and is universally recognized as the best first programming language.",
      },
      {
        q: "What code editor will I use?",
        a: "We start with VS Code and Python IDLE, guiding you step-by-step through installation and setup.",
      },
      {
        q: "Can I move to Data Science or Web Development after this?",
        a: "Absolutely! This course provides the exact foundational coding grammar needed for Data Science, ML, or Django/FastAPI tracks.",
      },
    ],
  },

  {
    id: "advanced-excel-and-sql",
    slug: "advanced-excel-and-sql",
    title: "Advanced Excel and SQL",
    shortDescription:
      "The ultimate corporate analyst duo: Complex Excel modeling, Power Query, automated reporting, and relational SQL queries.",
    fullDescription:
      "A pragmatic, high-ROI skill combination demanded across finance, marketing, operations, logistics, and data analytics. Learn spreadsheet mastery, dynamic arrays, nested lookups, Power Query automation, and relational SQL queries on PostgreSQL and MySQL.",
    category: "Data & Business",
    skillLevel: "Beginner to Intermediate",
    duration: "2 months",
    proposedFee: 6999,
    feeDisplay: "₹6,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: false,
    classFormat: "Live Practical Sessions with Real Business Case Studies",
    weeklyCommitment: "5-6 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Advanced Formulas & Dynamic Arrays in Excel",
        duration: "Weeks 1-2",
        topics: [
          "XLOOKUP, FILTER, SORT, UNIQUE, and multi-condition IFS statements",
          "Advanced text & date manipulation: DATEVALUE, TEXTSPLIT, NETWORKDAYS",
          "Cell referencing logic, naming ranges, and conditional formatting rules",
          "Data validation rules, input drop-downs, and spreadsheet audit shortcuts",
        ],
      },
      {
        number: 2,
        title: "Power Query, Pivot Tables & Executive Dashboards",
        duration: "Weeks 3-4",
        topics: [
          "Importing and transforming multi-file folder data using Power Query",
          "Unpivoting columns, data type normalization, and append/merge queries",
          "Multi-table Pivot Tables, Calculated Fields, and timeline slicers",
          "Designing high-impact executive KPI summary dashboards",
        ],
      },
      {
        number: 3,
        title: "Relational Database Foundations & SQL Basics",
        duration: "Weeks 5-6",
        topics: [
          "Database concepts, primary keys, foreign keys, and relational integrity",
          "SELECT, WHERE filtering, operators (IN, BETWEEN, LIKE), and ORDER BY",
          "Data aggregation with COUNT, SUM, AVG, MIN, MAX and GROUP BY / HAVING",
          "Joining tables: INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN",
        ],
      },
      {
        number: 4,
        title: "Advanced SQL Techniques & Excel Integration",
        duration: "Weeks 7-8",
        topics: [
          "Subqueries, correlated subqueries, and Common Table Expressions (CTEs)",
          "Window functions: ROW_NUMBER, RANK, DENSE_RANK, and running totals",
          "Data transformation with CASE WHEN statements and string functions",
          "Connecting Excel directly to live SQL databases for automated report refresh",
        ],
      },
    ],
    learningOutcomes: [
      "Build complex financial and operational spreadsheet models without errors.",
      "Automate manual weekly copy-paste reporting tasks using Excel Power Query.",
      "Query millions of rows from enterprise relational databases with optimized SQL.",
      "Perform cohort retention, customer segmentation, and year-over-year revenue analysis.",
      "Create direct live database connections into Excel for automated dashboard refreshes.",
    ],
    projects: [
      {
        title: "Automated Monthly Sales & Commission Tracker",
        description:
          "Power Query model pulling sales data from multiple regional CSVs, calculating tiered rep payouts.",
        tech: ["MS Excel", "Power Query", "Dynamic Arrays"],
      },
      {
        title: "Retail Superstore Revenue & Profitability Analysis",
        description:
          "SQL analytical study evaluating return rates, regional profit margins, and discount impacts.",
        tech: ["PostgreSQL", "SQL Joins", "Aggregations"],
      },
      {
        title: "Executive SaaS Metric Cockpit (SQL + Excel)",
        description:
          "Live analytical dashboard tracking Monthly Recurring Revenue (MRR), churn, and customer acquisition costs.",
        tech: ["SQL CTEs", "Excel Dashboard", "Data Modeling"],
      },
    ],
    prerequisites: [
      "Basic understanding of opening and editing spreadsheets.",
      "No prior coding or database experience needed.",
      "Computer with Microsoft Excel (2019, 2021, or Microsoft 365) and internet access.",
    ],
    whoShouldJoin: [
      "Business and Operations Analysts who want to eliminate manual spreadsheet drudgery.",
      "Sales, HR, and Marketing professionals handling tabular customer and sales data.",
      "Graduates seeking entry-level corporate analyst and MIS executive positions.",
    ],
    faqs: [
      {
        q: "Which version of Microsoft Excel is recommended?",
        a: "Microsoft 365 or Excel 2019/2021 is recommended to take advantage of modern dynamic array formulas like XLOOKUP and FILTER.",
      },
      {
        q: "Which database will we practice SQL on?",
        a: "We practice on PostgreSQL and MySQL using free desktop tools like pgAdmin and DBeaver.",
      },
      {
        q: "Will this help me get an MIS or Operations Analyst job?",
        a: "Yes! Proficiency in Advanced Excel + SQL is one of the top requirements across junior and mid-level analyst job listings.",
      },
    ],
  },

  {
    id: "advanced-excel",
    slug: "advanced-excel",
    title: "Advanced Excel",
    shortDescription:
      "Master spreadsheet modeling, dynamic array formulas, nested lookups, Power Query automation, and executive dashboards.",
    fullDescription:
      "Designed for professionals and analysts seeking to eliminate manual spreadsheet grunt work. Master modern dynamic array formulas (XLOOKUP, FILTER, UNIQUE), automated data cleaning with Power Query, multidimensional Pivot Tables, and interactive executive reporting dashboards.",
    category: "Data & Business",
    skillLevel: "Beginner to Intermediate",
    duration: "1 month",
    proposedFee: 3999,
    feeDisplay: "₹3,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: false,
    classFormat: "Live Hands-on Classes + Real Business Datasets",
    weeklyCommitment: "4-6 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Modern Dynamic Formulas & Spreadsheet Logic",
        duration: "Weeks 1-2",
        topics: [
          "XLOOKUP, FILTER, SORT, UNIQUE, and multi-condition IFS logic",
          "Advanced text and date manipulation: DATEVALUE, TEXTSPLIT, NETWORKDAYS",
          "Absolute vs relative referencing, dynamic named ranges, and audit shortcuts",
          "Multi-tier conditional formatting and custom data validation drop-downs",
        ],
      },
      {
        number: 2,
        title: "Power Query ETL, Pivot Tables & Executive Dashboards",
        duration: "Weeks 3-4",
        topics: [
          "Automated file imports, appending multiple monthly files, and unpivoting",
          "Cleaning messy text, column splitting, and null value handling in Power Query",
          "Advanced Pivot Tables, calculated items, timelines, and interactive slicers",
          "Designing high-impact C-suite KPI executive dashboards",
        ],
      },
    ],
    learningOutcomes: [
      "Build error-free automated spreadsheet templates for operations and finance.",
      "Eliminate manual weekly copy-paste reporting using Power Query pipelines.",
      "Analyze multi-sheet corporate datasets with dynamic array functions.",
      "Design clean, presentation-ready KPI cockpit dashboards.",
    ],
    projects: [
      {
        title: "Automated Regional Sales Consolidation Pipeline",
        description:
          "Created a zero-touch Power Query workbook combining 12 monthly regional sheets into an executive revenue summary.",
        tech: ["MS Excel", "Power Query", "Data Modeling"],
      },
      {
        title: "Corporate HR & Attrition Analysis Dashboard",
        description:
          "Interactive dashboard analyzing employee retention rates, salary bands, and department tenure.",
        tech: ["Excel Dashboards", "Pivot Tables", "Dynamic Slicers"],
      },
    ],
    prerequisites: [
      "Basic familiarity with opening and navigating spreadsheets.",
      "Computer with Microsoft Excel (2019, 2021, or Microsoft 365).",
    ],
    whoShouldJoin: [
      "Operations, Sales, HR, and Finance professionals handling tabular data.",
      "Students preparing for corporate analyst or MIS executive roles.",
      "Entrepreneurs wanting automated control over operational spreadsheets.",
    ],
    faqs: [
      {
        q: "Do I need coding experience for this course?",
        a: "No! This course focuses purely on Microsoft Excel's native functions, Power Query, and dashboard design principles.",
      },
      {
        q: "Can I upgrade to the SQL or Data Analytics track later?",
        a: "Yes! Advanced Excel provides the perfect foundational footing for our SQL and Data Analytics tracks.",
      },
    ],
  },

  {
    id: "sql",
    slug: "sql",
    title: "SQL for Analytics",
    shortDescription:
      "Master relational database querying, complex JOINs, aggregations, Window Functions, and query optimization.",
    fullDescription:
      "SQL is the essential foundational skill for anyone working with data. Learn relational data architecture, PostgreSQL and MySQL querying, multi-table JOINs, subqueries, CTEs, and advanced analytical Window Functions to query millions of rows with speed.",
    category: "Data & Business",
    skillLevel: "Beginner to Intermediate",
    duration: "1 month",
    proposedFee: 4999,
    feeDisplay: "₹4,999",
    feeNote: "Proposed introductory tuition fee (Flexible installment options available)",
    featured: false,
    classFormat: "Live Hands-on Querying Labs + Production DB Sandboxes",
    weeklyCommitment: "5-6 hours / week",
    nextBatch: "Upcoming Cohort Enrolling",
    modules: [
      {
        number: 1,
        title: "Relational Architecture, Queries & Aggregations",
        duration: "Weeks 1-2",
        topics: [
          "Relational concepts: Primary Keys, Foreign Keys, schemas, and data types",
          "SELECT, WHERE filtering, operators (LIKE, IN, BETWEEN), and ORDER BY",
          "Aggregations: COUNT, SUM, AVG, MIN, MAX with GROUP BY and HAVING filters",
          "String and date transformation functions in PostgreSQL and MySQL",
        ],
      },
      {
        number: 2,
        title: "Complex Joins, Subqueries & Window Functions",
        duration: "Weeks 3-4",
        topics: [
          "Table JOINs: INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins",
          "Subqueries, correlated subqueries, and Common Table Expressions (CTEs)",
          "Analytical Window Functions: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD",
          "Query optimization, execution plan analysis (EXPLAIN), and index design",
        ],
      },
    ],
    learningOutcomes: [
      "Write high-performance SQL queries against enterprise relational databases.",
      "Perform cohort retention, customer churn, and running total calculations with Window Functions.",
      "Clean, filter, and extract insights from millions of transaction records.",
      "Structure multi-step analytical transformations using Common Table Expressions (CTEs).",
    ],
    projects: [
      {
        title: "E-Commerce Customer Lifecycle & Cohort SQL Study",
        description:
          "Wrote complex CTEs and Window Functions on 500,000+ orders to calculate monthly customer retention rates.",
        tech: ["PostgreSQL", "Window Functions", "CTEs"],
      },
      {
        title: "FinTech Transaction Fraud Detection Query Suite",
        description:
          "Developed velocity checks using LAG/LEAD functions to detect abnormal multi-card debit attempts within minutes.",
        tech: ["MySQL", "Subqueries", "Indexing"],
      },
    ],
    prerequisites: [
      "No prior programming or database experience needed.",
      "A laptop or desktop computer with internet access.",
    ],
    whoShouldJoin: [
      "Aspiring Data Analysts, Business Analysts, and Product Managers.",
      "Software engineers looking to sharpen database querying capabilities.",
      "Anyone working with corporate databases who needs to fetch their own reports.",
    ],
    faqs: [
      {
        q: "Which SQL database dialects will we learn?",
        a: "We focus on PostgreSQL and MySQL, the two most popular and widely adopted relational databases in the industry.",
      },
      {
        q: "Is SQL enough to land a data analyst job?",
        a: "SQL is the #1 technical filter in data analyst interviews. Pairing SQL with Excel or Power BI gives you a complete competitive profile.",
      },
    ],
  },
];

export const courseCategories = [
  "All Courses",
  "Data & AI",
  "Software Engineering",
  "Finance & Accounting",
  "Programming",
  "Data & Business",
];

export const skillLevels = [
  "All Levels",
  "Beginner",
  "Beginner to Intermediate",
  "Intermediate",
  "Intermediate to Advanced",
  "Beginner to Advanced",
];

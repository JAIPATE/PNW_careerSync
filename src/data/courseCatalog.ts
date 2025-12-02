
import { PNWCourse } from '../types';

// Helper to map codes to general keywords
const getDepartmentKeywords = (code: string): string[] => {
  const dept = code.split(' ')[0];
  switch (dept) {
    case 'CS': case 'CIS': case 'ITS': return ['Computer Science', 'Programming', 'Technology', 'Software', 'IT'];
    case 'BIA': return ['Business Analytics', 'Data', 'Intelligence'];
    case 'STAT': case 'MA': return ['Math', 'Statistics', 'Quantitative', 'Analysis'];
    case 'ENGL': case 'COM': return ['Communication', 'Writing', 'Public Speaking'];
    case 'MGMT': case 'BUSM': case 'OBHR': case 'ENTR': return ['Business', 'Management', 'Leadership', 'HR'];
    case 'MKG': return ['Marketing', 'Sales', 'Advertising'];
    case 'FIN': return ['Finance', 'Accounting', 'Money'];
    case 'ACC': return ['Accounting', 'Finance', 'Auditing'];
    case 'NUR': return ['Nursing', 'Health', 'Patient Care'];
    case 'ECE': case 'ME': case 'CE': case 'ENGR': return ['Engineering', 'Design', 'Systems'];
    case 'MET': case 'ECET': case 'IET': return ['Engineering Technology', 'Manufacturing', 'Electronics'];
    case 'CGT': return ['Graphics', 'Design', 'UX', 'UI', 'Visualization'];
    default: return [];
  }
};

export const pnwCourseCatalog: PNWCourse[] = [
  // Computer Science & ITS
  {
    code: "CS 12300",
    title: "Programming I: Java",
    description: "Introduction to the fundamental concepts of programming and problem solving using the Java programming language. Topics include variables, expressions, operators, data types, control structures, methods, objects, arrays, classes, simple I/O, testing, and debugging strategies.",
    keywords: ["Java", "Programming", "Object-Oriented"]
  },
  {
    code: "CS 12400",
    title: "Programming II: Object-Oriented Java",
    description: "Focuses on object-oriented programming along with the fundamentals of object-oriented design. Topics include classes, encapsulation, inheritance, polymorphism, abstract classes, interfaces, class hierarchies, generics, streams, exceptions.",
    keywords: ["Java", "OOP", "Programming", "Design Patterns"]
  },
  {
    code: "CS 12600",
    title: "Systems Programming In C",
    description: "Introduction to programming and using a computer system. The programming languages used are C and the command-line shell. Topics include pointers, arrays, memory allocation, and system calls.",
    keywords: ["C", "Systems", "Linux", "Unix", "Shell"]
  },
  {
    code: "CS 27500",
    title: "Data Structures",
    description: "Describes the way that computer programs organize and store information. Topics include linked lists, arrays, stacks, queues, strings, trees, graphs, search trees, heaps, hash tables, and B-trees.",
    keywords: ["Data Structures", "Algorithms", "Computer Science"]
  },
  {
    code: "CS 30200",
    title: "Operating Systems",
    description: "Basic concepts and terminology of operating systems. Topics will include multiprogramming, CPU scheduling, memory management, file systems, concurrent processes, multiprocessors, security, and network operating systems.",
    keywords: ["OS", "Operating Systems", "Concurrency", "Process Management"]
  },
  {
    code: "CS 46200",
    title: "Introduction To Artificial Intelligence",
    description: "Fundamental concepts and techniques of artificial intelligence. Topics include intelligent agents, search algorithms, planning, and supervised/unsupervised machine learning algorithms.",
    keywords: ["AI", "Artificial Intelligence", "Machine Learning", "Search"]
  },
  {
    code: "CS 46900",
    title: "Machine Learning And Data Mining",
    description: "Introduction of data mining and machine learning. Implements multiple algorithms with C5 and Neural Networks in C and Python. Covers decision trees, supervised/unsupervised learning, and Deep Learning.",
    keywords: ["Machine Learning", "Data Mining", "Python", "Neural Networks"]
  },
  {
    code: "CS 52550",
    title: "Introduction To Deep Learning",
    description: "Theoretical and practical insights into deep learning networks. Creating and implementing deep learning models from scratch. Topics include object detection, facial recognition, handwriting analysis, and NLP.",
    keywords: ["Deep Learning", "Neural Networks", "AI", "Computer Vision"]
  },
  {
    code: "ITS 15000",
    title: "Introduction To Cybersecurity",
    description: "Foundational concepts, principles, and tools of cybersecurity. Covers cyber systems, computer networks, cybersecurity principles, ethics, vulnerabilities, threats, data security, and risk management.",
    keywords: ["Cybersecurity", "Security", "Network Security"]
  },
  {
    code: "ITS 24000",
    title: "Programming Fundamentals",
    description: "Fundamental programming techniques using a particular programming language while focusing on problem-solving skills.",
    keywords: ["Programming", "Coding", "Logic"]
  },
  {
    code: "ITS 26000",
    title: "Applied Database Technologies",
    description: "Database query languages, information management concepts, data organization, data modeling, managing the database environment, special-purpose databases.",
    keywords: ["Database", "SQL", "Data Modeling"]
  },
  {
    code: "ITS 36500",
    title: "Machine Learning Foundations",
    description: "Introduction to the machine learning and deep learning pipeline. Machine learning uses, algorithms, data set requirements, data annotation, validation, and representation formats.",
    keywords: ["Machine Learning", "AI", "Data Science"]
  },
  {
    code: "ITS 44000",
    title: "Mobile Application Development",
    description: "Developing mobile applications for multiple platforms. Considerations for smartphones/tablets, application paradigms, sensor-based applications, location-based applications, and network programming.",
    keywords: ["Mobile", "App Development", "iOS", "Android"]
  },

  // Business Information Analytics
  {
    code: "BIA 30800",
    title: "Database Management Analysis And Design",
    description: "Functions and components of database management systems. Relational and object-oriented database techniques. Data modeling tools, entity relationship diagrams, data dictionary, object diagrams, and normalization.",
    keywords: ["Database", "SQL", "Data Modeling", "BIA"]
  },
  {
    code: "BIA 32000",
    title: "Spreadsheet Modeling And Decision Analytics",
    description: "Analyze data and solve business problems using Microsoft Excel. Statistical analysis tools, data visualization, financial analysis, spreadsheet modeling, optimization, and solver model.",
    keywords: ["Excel", "Analytics", "Modeling", "Data"]
  },
  {
    code: "BIA 43000",
    title: "Data Preparation And Visualization",
    description: "Data visualization best practices, live and interactive dashboard development, and data storytelling. Shaping, blending, and joining data sources.",
    keywords: ["Visualization", "Data", "Tableau", "PowerBI"]
  },
  {
    code: "BIA 46600",
    title: "Practical Computing For Data Analytics",
    description: "Introduction to computing tools (e.g. R, Python) and their uses as data analytics tools. Big data processing, manipulation and analytics.",
    keywords: ["R", "Python", "Data Analytics", "Big Data"]
  },
  {
    code: "BIA 48600",
    title: "Project Management",
    description: "Application of knowledge, skills, and techniques to manage projects. Concepts of Project Management Body of Knowledge (PMBOK).",
    keywords: ["Project Management", "PMBOK", "Agile"]
  },

  // Engineering Technology
  {
    code: "ECET 36200",
    title: "Process Control Instrumentation",
    description: "Process control principles and practices. Analog and digital signal conditioning, transducers, electromechanical control devices, and computer-aided tools.",
    keywords: ["Automation", "Control Systems", "Instrumentation"]
  },
  {
    code: "ECET 45500",
    title: "Object Oriented System Design",
    description: "Designing Graphic User Interface (GUI) applications using Object Oriented Programming (OOP) utilizing C++ language constructs.",
    keywords: ["C++", "OOP", "GUI", "Design"]
  },
  {
    code: "MET 34501",
    title: "Computer Numerical Control (CNC) Manufacturing",
    description: "Fundamental concepts in CNC technology. Cutter centerline programming, diameter compensation, coordinate transformation, canned cycles, subprograms, user macros.",
    keywords: ["CNC", "Manufacturing", "Machining"]
  },
  {
    code: "MET 34700",
    title: "Intro To Robotics",
    description: "Robotics systems, programming, and applications in manufacturing.",
    keywords: ["Robotics", "Automation", "Manufacturing"]
  },

  // Business & Management
  {
    code: "BUSM 10100",
    title: "Introduction To Business",
    description: "Internal operations and external environment of contemporary business. Social economic role of business, basic business functions and role of management.",
    keywords: ["Business", "Management"]
  },
  {
    code: "BUSM 33300",
    title: "Total Quality Management",
    description: "Management culture, philosophy, practices, and processes necessary to develop a total quality orientation. Quantitative, behavioral, and strategic concepts for designing dynamic organizations.",
    keywords: ["TQM", "Quality", "Management"]
  },
  {
    code: "BUSM 41100",
    title: "Entrepreneurship And Creative Managerial Thinking",
    description: "Principles of managing the creation and development of new enterprises. Knowledge and techniques for dealing with issues associated with entrepreneurship development.",
    keywords: ["Entrepreneurship", "Startup", "Innovation"]
  },
  {
    code: "MGMT 62000",
    title: "Marketing Management",
    description: "Integrated analysis of major marketing decisions, including product pricing, advertising, distribution, and sales force policies.",
    keywords: ["Marketing", "Management", "Sales"]
  },
  {
    code: "MKG 42000",
    title: "Paid Digital Marketing Strategy",
    description: "Digital marketing campaign for a real-world client. Research, strategic conclusions, digital theme, creative design, media plan, and evaluation. Paid digital placement, Google Analytics.",
    keywords: ["Digital Marketing", "SEO", "Analytics", "Advertising"]
  },
  {
    code: "OBHR 33000",
    title: "Introduction To Organizational Behavior",
    description: "Impact of individuals, groups, and organizational structure on behavior within organizations. Motivation, leadership, group processes, and conflict management.",
    keywords: ["HR", "Organizational Behavior", "Leadership"]
  },

  // Communication & English
  {
    code: "COM 11400",
    title: "Fundamentals Of Speech Communication",
    description: "Communication theories applied to speech; interpersonal communication, small group process, and informative/persuasive speaking.",
    keywords: ["Public Speaking", "Communication", "Presentation"]
  },
  {
    code: "COM 32000",
    title: "Small Group Communication",
    description: "Group thinking and problem-solving methods; participation in and evaluation of committee and informal discussion groups.",
    keywords: ["Teamwork", "Collaboration", "Communication"]
  },
  {
    code: "ENGL 42000",
    title: "Business Writing",
    description: "Workplace writing in networked environments. Project planning, document management, ethics, research, team writing. Memos, reports, letters, e-mail, resumes.",
    keywords: ["Writing", "Business Communication", "Technical Writing"]
  },
  {
    code: "ENGL 22000",
    title: "Technical Report Writing",
    description: "Principles of good writing in industrial reporting. Presenting information graphically as well as in a clear, concise written form.",
    keywords: ["Technical Writing", "Documentation", "Reporting"]
  },

  // Nursing & Health
  {
    code: "NUR 18100",
    title: "Introduction To Professional Nursing",
    description: "Examine nursing within its professional context. Heritage and tradition of professional nursing, scholarly writing and research using APA format.",
    keywords: ["Nursing", "Healthcare"]
  },
  {
    code: "NUR 45100",
    title: "Nursing Informatics",
    description: "Understanding of nursing science, computer science, and information science to effectively use technology to manage health care information.",
    keywords: ["Nursing", "Informatics", "Healthcare IT"]
  },
  {
    code: "NUR 39000",
    title: "Nursing Research",
    description: "Research process and use of research based evidence as a foundation for nursing. Quantitative and qualitative methodologies.",
    keywords: ["Research", "Nursing", "Evidence-Based Practice"]
  },

  // Science & Math
  {
    code: "STAT 30100",
    title: "Elementary Statistical Methods",
    description: "Statistical methods with applications. Data analysis for one and several variables, design of samples and experiments, probability, sampling distributions, correlation and regression.",
    keywords: ["Statistics", "Data Analysis"]
  },
  {
    code: "MA 16300",
    title: "Integrated Calculus Analysis Geometry I",
    description: "Plane analytic geometry. Introduction to differentiation and integration. Applications.",
    keywords: ["Calculus", "Math", "Analysis"]
  },
  {
    code: "MA 26500",
    title: "Linear Algebra",
    description: "Systems of linear equations, matrix algebra, vector spaces, determinants, eigenvalues and eigenvectors, diagonalization of matrices, applications.",
    keywords: ["Linear Algebra", "Math"]
  },
  {
    code: "SCI 10400",
    title: "Introduction To Environmental Biology",
    description: "Survey of human impacts on natural environments. Concepts of ecology, interactions between human and natural environment, pollution, conservation.",
    keywords: ["Environmental Science", "Biology", "Ecology"]
  }
].map(course => ({
  ...course,
  keywords: [...(course.keywords || []), ...getDepartmentKeywords(course.code)]
}));


import { PNWCourse } from '../types';

// Helper to generate keywords based on Department Codes and Course Levels
const getKeywordsForCourse = (code: string, title: string, desc: string): string[] => {
  const dept = code.split(' ')[0];
  const keywords = new Set<string>();
  const lowerTitle = title.toLowerCase();
  const lowerDesc = desc.toLowerCase();

  // 1. Department-based Keywords
  switch (dept) {
    case 'CS': 
    case 'CIS': 
    case 'ITS': 
      keywords.add('Computer Science');
      keywords.add('Programming');
      keywords.add('Software');
      keywords.add('Coding');
      keywords.add('IT');
      keywords.add('Technology');
      keywords.add('Development');
      keywords.add('Engineering');
      break;
    case 'BIA':
    case 'ISM':
      keywords.add('Business Analytics');
      keywords.add('Data');
      keywords.add('Intelligence');
      keywords.add('Information Systems');
      keywords.add('Statistics');
      break;
    case 'ECET':
    case 'MET':
    case 'IET':
    case 'CMET':
    case 'MCET':
      keywords.add('Engineering Technology');
      keywords.add('Manufacturing');
      keywords.add('Hands-on');
      keywords.add('Industrial');
      keywords.add('Robotics');
      keywords.add('Automation');
      break;
    case 'ECE':
    case 'ME':
    case 'CE':
    case 'ENGR':
      keywords.add('Engineering');
      keywords.add('Design');
      keywords.add('Systems');
      keywords.add('Analysis');
      break;
    case 'BUSM':
    case 'MGMT':
    case 'OBHR':
    case 'ENTR':
    case 'GBM':
      keywords.add('Business');
      keywords.add('Management');
      keywords.add('Leadership');
      keywords.add('Strategy');
      keywords.add('Operations');
      break;
    case 'MKG':
      keywords.add('Marketing');
      keywords.add('Sales');
      keywords.add('Advertising');
      keywords.add('Social Media');
      keywords.add('Digital');
      break;
    case 'FIN':
    case 'ACC':
      keywords.add('Finance');
      keywords.add('Accounting');
      keywords.add('Money');
      keywords.add('Budgeting');
      keywords.add('Analysis');
      break;
    case 'COM':
    case 'ENGL':
      keywords.add('Communication');
      keywords.add('Writing');
      keywords.add('Public Speaking');
      keywords.add('Media');
      keywords.add('PR');
      break;
    case 'NUR':
      keywords.add('Nursing');
      keywords.add('Health');
      keywords.add('Patient Care');
      keywords.add('Clinical');
      keywords.add('Medical');
      break;
    case 'STAT':
    case 'MA':
      keywords.add('Statistics');
      keywords.add('Math');
      keywords.add('Analysis');
      keywords.add('Data');
      break;
    case 'CGT':
      keywords.add('Graphics');
      keywords.add('Design');
      keywords.add('UX');
      keywords.add('UI');
      keywords.add('Web');
      keywords.add('Animation');
      break;
  }

  // 2. Content-based Keyword Extraction (Expanded)
  if (lowerTitle.includes('java') || lowerDesc.includes('java')) keywords.add('Java');
  if (lowerTitle.includes('python') || lowerDesc.includes('python')) keywords.add('Python');
  if (lowerTitle.includes('c++') || lowerDesc.includes('c++')) keywords.add('C++');
  if (lowerTitle.includes('c#') || lowerDesc.includes('c#')) keywords.add('C#');
  if (lowerTitle.includes('sql') || lowerDesc.includes('sql') || lowerTitle.includes('database')) keywords.add('SQL').add('Database');
  if (lowerTitle.includes('web') || lowerDesc.includes('html') || lowerDesc.includes('css')) keywords.add('Web Development').add('Frontend');
  if (lowerTitle.includes('project management') || lowerDesc.includes('project management')) keywords.add('Project Management').add('Agile');
  if (lowerTitle.includes('security') || lowerTitle.includes('cyber') || lowerTitle.includes('assurance')) keywords.add('Cybersecurity').add('Security').add('Information Assurance');
  if (lowerTitle.includes('network')) keywords.add('Networking').add('Infrastructure');
  if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence') || lowerTitle.includes('machine learning')) keywords.add('AI').add('Machine Learning').add('Deep Learning');
  if (lowerTitle.includes('analytics') || lowerDesc.includes('analytics')) keywords.add('Analytics').add('Data Science');
  if (lowerTitle.includes('cloud') || lowerDesc.includes('cloud')) keywords.add('Cloud Computing').add('AWS').add('Azure');
  
  return Array.from(keywords);
};

// Raw Data from CSV Import (This is just a sample for structure; in a real app this would be the full JSON)
const rawData = [
  { c: "CS 12300", t: "Programming I: Java", d: "Introduction to the fundamental concepts of programming and problem solving using the Java programming language." },
  { c: "CS 12400", t: "Programming II: Object-Oriented Java", d: "A continuation of CS 12300 which focuses on object-oriented programming along with the fundamentals of object-oriented design." },
  { c: "CS 27500", t: "Data Structures", d: "Data structures describe the way that computer programs organize and store information. Topics include linked lists, arrays, stacks, queues, trees, graphs." },
  { c: "CS 30200", t: "Operating Systems", d: "An operating system manages all of the hardware and software resources of a computer. Topics include multiprogramming, CPU scheduling, memory management." },
  { c: "CS 33200", t: "Algorithms", d: "An algorithm is a procedure for solving a problem in a finite number of steps. Topics include sorting, searching, probabilistic, graph, and geometric algorithms." },
  { c: "CS 33600", t: "Network Programming", d: "Introduction to computer networks and the programming of network applications using the Sockets API." },
  { c: "CS 46200", t: "Introduction To Artificial Intelligence", d: "Fundamental concepts and techniques of AI. Topics include intelligent agents, search algorithms, machine learning." },
  { c: "CS 46900", t: "Machine Learning And Data Mining", d: "Introduction of data mining and machine learning. Neural Networks, decision trees, and Deep Learning applications." },
  { c: "ITS 15000", t: "Introduction To Cybersecurity", d: "Foundational concepts, principles, and tools of cybersecurity. Vulnerabilities, threats, data security, and risk management." },
  { c: "ITS 24000", t: "Programming Fundamentals", d: "Covers fundamental programming techniques focusing on problem-solving skills." },
  { c: "ITS 26000", t: "Applied Database Technologies", d: "Database query languages, information management concepts, data modeling, and SQL." },
  { c: "ITS 34000", t: "Advanced Programming", d: "In-depth discussions of data structures, algorithms, memory management, and concurrent programming." },
  { c: "ITS 36500", t: "Machine Learning Foundations", d: "Introduction to the machine learning and deep learning pipeline and concepts." },
  { c: "ITS 44000", t: "Mobile Application Development", d: "Developing mobile applications for multiple platforms (smartphones and tablets)." },
  { c: "BIA 30800", t: "Database Management Analysis And Design", d: "Functions and components of database management systems. Relational and object oriented database techniques." },
  { c: "BIA 32000", t: "Spreadsheet Modeling And Decision Analytics", d: "Prepare students to analyze data and solve real-life business problems using Microsoft Excel." },
  { c: "BIA 43000", t: "Data Preparation And Visualization", d: "Data visualization best practices, live and interactive dashboard development, and data storytelling." },
  { c: "BIA 46600", t: "Practical Computing For Data Analytics", d: "Introduction to computing tools (e.g. R, Python) and their uses as data analytics tools." },
  { c: "BIA 48600", t: "Project Management", d: "The application of the knowledge, skills, and techniques that project managers use to manage projects." },
  { c: "ECET 36200", t: "Process Control Instrumentation", d: "Reviews process control principles and practices. Analog and digital signal conditioning." },
  { c: "ECET 45500", t: "Object Oriented System Design", d: "Designing Graphic User Interface (GUI) applications using Object Oriented Programming (OOP)." },
  { c: "MET 34501", t: "Computer Numerical Control (CNC) Manufacturing", d: "Study of fundamental concepts in computer numerical control (CNC) technology." },
  { c: "MET 34700", t: "Intro To Robotics", d: "Introduction to industrial robotics, programming, and automation." },
  { c: "BUSM 10100", t: "Introduction To Business", d: "An introduction to the internal operations and external environment of contemporary business." },
  { c: "BUSM 33300", t: "Total Quality Management", d: "Focuses on the management culture, philosophy, practices, and processes necessary to develop a total quality orientation." },
  { c: "BUSM 41100", t: "Entrepreneurship And Creative Managerial Thinking", d: "Provides students with a solid foundation in terms of the vital role played by entrepreneurs." },
  { c: "MGMT 62000", t: "Marketing Management", d: "An integrated analysis of major marketing decisions, including product pricing, advertising, and distribution." },
  { c: "MKG 42000", t: "Paid Digital Marketing Strategy", d: "Provides an opportunity for students to work on a digital marketing campaign for a real-world client." },
  { c: "OBHR 33000", t: "Introduction To Organizational Behavior", d: "Investigates the impact that individuals, groups, and organizational structure have on behavior within organizations." },
  { c: "COM 11400", t: "Fundamentals Of Speech Communication", d: "A study of communication theories as applied to speech; practical communicative experiences." },
  { c: "COM 32000", t: "Small Group Communication", d: "A study of group thinking and problem-solving methods; participation in and evaluation of committee discussion." },
  { c: "ENGL 22000", t: "Technical Report Writing", d: "Application of the principles of good writing in industrial reporting." },
  { c: "ENGL 42000", t: "Business Writing", d: "Workplace writing in networked environments for management contexts." },
  { c: "NUR 18100", t: "Introduction To Professional Nursing", d: "Designed to examine nursing within its professional context." },
  { c: "NUR 45100", t: "Nursing Informatics", d: "Basic understanding of nursing science, computer science, and information science." },
  { c: "STAT 30100", t: "Elementary Statistical Methods", d: "Introduction to statistical methods with applications to diverse fields. Data analysis, sampling, probability." },
  { c: "MA 16300", t: "Integrated Calculus Analysis Geometry I", d: "Topics from plane analytic geometry. Introduction to differentiation and integration." },
  { c: "ACC 20000", t: "Introductory Accounting", d: "Understand what is in financial statements and what the statements say about a business." },
  { c: "ACC 20100", t: "Management Accounting I", d: "Introduction to the system by which accounting data is gathered from economic events." },
  { c: "AD 10500", t: "Design I", d: "Two-dimensional design fundamentals: concepts and processes." },
  { c: "AD 11200", t: "Typography", d: "Students investigate mechanics of type, using both type and letter forms in a variety of design applications." },
  { c: "AD 32102", t: "Web Design", d: "Introduction to the design of web sites in both functionality and visual appeal." },
  { c: "CGT 10100", t: "Introduction to Computer Graphics Technology", d: "Introduces students to the Computer Graphics Technology program and careers." },
  { c: "CGT 11100", t: "Designing For Visualization And Communication", d: "An introductory design course for computer graphics majors." },
  { c: "CGT 11800", t: "Fundamentals Of Imaging Technology", d: "Foundation for the development and use of raster and vector images." },
  { c: "CGT 14100", t: "Internet Foundations Technologies And Development", d: "Explores history, architecture, and development of the World Wide Web. HTML, CSS." },
  { c: "CGT 25600", t: "Principles Of User Experience Design", d: "Introduces students to the process of user-centered design of computer systems humans interact with." },
  { c: "CHM 11500", t: "General Chemistry", d: "Stoichiometry; atomic structure; periodic properties; ionic and covalent bonding." },
  { c: "CIS 24100", t: "Foundations Of Web Design And Development", d: "Introduction to Web design. HTML, CSS, and web programming languages." },
  { c: "CIS 26300", t: "Java Programming", d: "Introduction to the Java programming language, including operators, data types, and syntax." },
  { c: "CIS 34100", t: "Advanced Web Design And Development", d: "Server side web development technologies. PHP and MySQL." },
  { c: "CIS 46300", t: "Introduction To Mobile Programming", d: "Introduction to programming applications for mobile devices. Android app development." },
  { c: "CMET 10300", t: "Introduction To Construction Management", d: "Introduction to the construction management discipline." },
  { c: "COM 25000", t: "Mass Communication And Society", d: "Survey of the print, broadcast, and film media in their relationship and influence on society." },
  { c: "COM 25300", t: "Introduction To Public Relations", d: "Analysis of public relations theories, methods, and practices." },
  { c: "COM 25600", t: "Introduction To Advertising", d: "Analysis of commercial persuasion from colonial times to the era of mass communication." },
  { c: "COM 34800", t: "Social Media And Public Relations", d: "Introduce students to the management of social media for business." },
  { c: "CS 10000", t: "An Introduction To Computer Science", d: "Integrate freshman computer science majors into the department." },
  { c: "CS 12100", t: "Introduction To Python With Applications In AI", d: "Hands-on introduction to Python programming with a focus on AI applications." },
  { c: "CS 46800", t: "Human Robot Interaction", d: "Focuses on the impact of robots in contemporary society and explores complexities of interaction." },
  { c: "ECE 20100", t: "Linear Circuit Analysis I", d: "Volt-ampere characteristics for circuit elements; independent and dependent sources." },
  { c: "ECE 27001", t: "Introduction to Digital System Design", d: "Introduction to the analysis and design of combinational and sequential digital systems." },
  { c: "ECE 36201", t: "Microprocessor System Design And Interfacing", d: "Introduction to basic computer organization, microcontroller instruction sets, and interfacing." },
  { c: "ECON 25100", t: "Microeconomics", d: "Analysis of the forces affecting national income, employment, interest rates, and inflation." },
  { c: "ENGR 15100", t: "Software Tools For Engineers", d: "Introduction to MATLAB and engineering problem solving with MATLAB." },
  { c: "ENTR 31001", t: "Launching A New Venture", d: "For those interested in launching their own business. Tying together entrepreneurship education." },
  { c: "FIN 31000", t: "Financial Management", d: "Management of the financial affairs of the industrial enterprise." },
  { c: "HTM 10000", t: "Introduction To The Hospitality And Tourism Industry", d: "Overview of the supervisory careers, opportunities, and responsibilities in the industry." },
  { c: "IET 35200", t: "Operations Management", d: "Concepts involved in design and organizational management of manufacturing and service systems." },
  { c: "ITS 25000", t: "Fundamentals Of Information Assurance", d: "Cybersecurity principles, cryptography basics, threats, attacks, and vulnerabilities." },
  { c: "ITS 27000", t: "Internetworking Technologies", d: "Requirements, acquisition/sourcing, integration, project management, testing for networks." },
  { c: "ITS 35000", t: "Fundamentals Of Cryptography", d: "Implementation of cryptographic techniques to secure computing systems." },
  { c: "MA 16400", t: "Integrated Calculus Analysis Geometry II", d: "Continuation of MA 16300. Plane analytic geometry and calculus of one variable." },
  { c: "MET 10000", t: "Production Drawing And Computer-Aided Design", d: "Introduction to technical graphics and computer-aided design (Solidworks)." },
  { c: "MKG 22400", t: "Principles Of Marketing", d: "Introduction to the principles and concepts underlying marketing decisions." },
  { c: "OLS 25200", t: "Human Relations In Organizations", d: "Survey of concepts providing a foundation for understanding individual and group behavior." },
  { c: "OLS 38600", t: "Leadership For Organizational Change", d: "Fundamental concepts of leading organizational change." },
  { c: "PSY 12000", t: "Elementary Psychology", d: "Introduction to the fundamental principles of psychology." },
  { c: "STAT 11300", t: "Statistics And Society", d: "Introduction to statistical literacy and the cultivation of critical thinking skills." },
];

export const pnwCourseCatalog: PNWCourse[] = rawData.map(c => ({
  code: c.c,
  title: c.t,
  description: c.d,
  keywords: getKeywordsForCourse(c.c, c.t, c.d)
}));

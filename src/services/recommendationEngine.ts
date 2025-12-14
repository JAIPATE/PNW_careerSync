
import { pnwCourseCatalog } from '../data/courseCatalog';
import { CourseRecommendation, PNWCourse } from '../types';

/**
 * SKILL TAXONOMY (Concept Mapping)
 * This acts as a pre-processing layer to normalize industry slang into 
 * academic concepts before vectorization.
 */
const SKILL_TAXONOMY: Record<string, string[]> = {
  'react': ['web development', 'frontend', 'javascript', 'user interface'],
  'angular': ['web development', 'frontend', 'typescript'],
  'node': ['server side', 'backend', 'web', 'network programming'],
  'aws': ['cloud computing', 'distributed systems', 'infrastructure'],
  'docker': ['cloud', 'virtualization', 'deployment', 'containers'],
  'kubernetes': ['container', 'orchestration', 'cloud', 'distributed systems'],
  'machine learning': ['artificial intelligence', 'data mining', 'neural networks', 'statistics'],
  'python': ['scripting', 'data analysis', 'programming', 'automation'],
  'agile': ['project management', 'software engineering', 'scrum'],
  'sql': ['database', 'information systems', 'query language', 'data management'],
  'security': ['cybersecurity', 'information assurance', 'network security'],
  'ci/cd': ['software engineering', 'devops', 'deployment']
};

/**
 * STOP WORDS
 * Common words to filter out during tokenization to reduce noise in the vector space.
 */
const STOP_WORDS = new Set([
  'and', 'or', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 
  'by', 'intro', 'introduction', 'fundamental', 'basic', 'principles', 'system', 'concepts',
  'application', 'development', 'design', 'analysis' // Added academic filler words
]);

/**
 * CLASS: VectorSpaceModel
 * Implements a TF-IDF (Term Frequency - Inverse Document Frequency) engine
 * to calculate semantic similarity between skills and courses.
 */
class VectorSpaceModel {
  private corpus: Map<string, number>; // Word -> Document Frequency (DF)
  private courseVectors: Map<string, Map<string, number>>; // CourseCode -> Vector
  private totalDocuments: number;

  constructor(courses: PNWCourse[]) {
    this.corpus = new Map();
    this.courseVectors = new Map();
    this.totalDocuments = courses.length;
    this.train(courses);
  }

  /**
   * NLP Preprocessing: Tokenization and N-Gram generation (Bigrams)
   * Captures "machine learning" as a distinct concept from "machine" and "learning".
   */
  private tokenize(text: string): string[] {
    // 1. Clean and split into unigrams
    const unigrams = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 2 && !STOP_WORDS.has(word));

    // 2. Generate Bigrams (N-Grams)
    // This allows the model to understand that "web development" is a specific concept
    // distinct from just "web" or "development".
    const bigrams: string[] = [];
    for (let i = 0; i < unigrams.length - 1; i++) {
      bigrams.push(`${unigrams[i]} ${unigrams[i+1]}`);
    }

    return [...unigrams, ...bigrams];
  }

  /**
   * Training Phase: Builds the vocabulary and calculates Document Frequencies
   */
  private train(courses: PNWCourse[]) {
    // 1. Build Document Frequency (DF) map
    courses.forEach(course => {
      // Feature Engineering: Weight Titles 3x more than descriptions
      const titleText = (course.title + " ").repeat(3); 
      const content = `${titleText} ${course.description} ${course.keywords.join(' ')}`;
      const tokens = new Set(this.tokenize(content)); // Unique tokens per doc
      
      tokens.forEach(token => {
        this.corpus.set(token, (this.corpus.get(token) || 0) + 1);
      });
    });

    // 2. Build Vectors for each course (TF-IDF)
    courses.forEach(course => {
      const titleText = (course.title + " ").repeat(3);
      const content = `${titleText} ${course.description} ${course.keywords.join(' ')}`;
      this.courseVectors.set(course.code, this.vectorize(content));
    });
  }

  /**
   * Vectorization: Converts text into a weighted numerical vector.
   * Formula: TF * IDF
   * TF = (Count of term t in doc) / (Total terms in doc)
   * IDF = log(Total Docs / (1 + Docs containing t)) + 1
   */
  public vectorize(text: string): Map<string, number> {
    const tokens = this.tokenize(text);
    const termCounts = new Map<string, number>();
    const vector = new Map<string, number>();

    // Calculate TF
    tokens.forEach(t => termCounts.set(t, (termCounts.get(t) || 0) + 1));

    termCounts.forEach((count, term) => {
      const tf = count / tokens.length;
      const df = this.corpus.get(term) || 0;
      
      // Inverse Document Frequency with smoothing
      // Rare words (like "Kubernetes") get high scores. Common words (like "software") get low scores.
      const idf = Math.log(1 + (this.totalDocuments / (1 + df)));
      
      vector.set(term, tf * idf);
    });

    return vector;
  }

  /**
   * Cosine Similarity: Calculates the angle between two vectors.
   * Range: 0 (No similarity) to 1 (Identical)
   */
  public cosineSimilarity(vecA: Map<string, number>, vecB: Map<string, number>): number {
    const intersection = new Set([...vecA.keys()].filter(x => vecB.has(x)));
    
    if (intersection.size === 0) return 0;

    let dotProduct = 0;
    let magA = 0;
    let magB = 0;

    // Calculate Dot Product
    intersection.forEach(term => {
      dotProduct += (vecA.get(term) || 0) * (vecB.get(term) || 0);
    });

    // Calculate Magnitudes
    vecA.forEach(val => magA += val * val);
    vecB.forEach(val => magB += val * val);

    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);

    if (magA === 0 || magB === 0) return 0;

    return dotProduct / (magA * magB);
  }

  public getCourseVectors() {
    return this.courseVectors;
  }
}

// Instantiate and "Train" the model on the static catalog immediately
const model = new VectorSpaceModel(pnwCourseCatalog);

/**
 * Public function called by the UI.
 * Orchestrates the prediction using the VSM engine.
 */
export function findCourseRecommendations(missingSkills: string[]): CourseRecommendation[] {
  const recommendations: CourseRecommendation[] = [];
  const processedSkills = new Set<string>();

  missingSkills.forEach(skill => {
    const normalizedSkill = skill.toLowerCase().trim();
    if (processedSkills.has(normalizedSkill)) return;

    // 1. Expand query using Taxonomy (Concept Expansion)
    let expandedQuery = normalizedSkill;
    Object.keys(SKILL_TAXONOMY).forEach(key => {
      if (normalizedSkill.includes(key)) {
        expandedQuery += " " + SKILL_TAXONOMY[key].join(" ");
      }
    });

    // 2. Vectorize the expanded query (Now includes Bigrams!)
    const queryVector = model.vectorize(expandedQuery);

    // 3. Calculate Similarity against all courses
    const scores: { course: PNWCourse; score: number }[] = [];
    
    model.getCourseVectors().forEach((courseVector, courseCode) => {
      const score = model.cosineSimilarity(queryVector, courseVector);
      // Dynamic Threshold: Lowered slightly to account for bigram sparsity
      if (score > 0.03) { 
        const course = pnwCourseCatalog.find(c => c.code === courseCode)!;
        scores.push({ course, score });
      }
    });

    // 4. Sort by Score (High to Low) and take top 2
    scores.sort((a, b) => b.score - a.score);
    const topCourses = scores.slice(0, 2).map(s => s.course);

    if (topCourses.length > 0) {
      recommendations.push({
        skill: skill,
        courses: topCourses
      });
      processedSkills.add(normalizedSkill);
    }
  });

  return recommendations;
}

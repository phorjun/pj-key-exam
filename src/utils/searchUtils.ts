interface Choice {
  value: number;
  label: string;
}

export interface Question {
  id: number;
  question: string;
  choices: Choice[];
  answer: number;
  is_image?: boolean;
  url?: string;
}

export interface SearchResult extends Question {
  similarity: number;
}

// Normalize text by removing special characters, extra spaces, and converting to lowercase
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0E00-\u0E7F\w\s]/g, '') // Keep Thai characters
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate similarity score between search query and question text
function calculateSimilarity(query: string, text: string): number {
  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);
  
  // If query is exactly in the text, high similarity
  if (normalizedText.includes(normalizedQuery)) {
    return 0.9 + (normalizedQuery.length / normalizedText.length) * 0.1;
  }
  
  // Split into words and check for matching words
  const queryWords = normalizedQuery.split(' ').filter(word => word.length > 1);
  const textWords = normalizedText.split(' ');
  
  if (queryWords.length === 0) return 0;
  
  let matchCount = 0;
  for (const queryWord of queryWords) {
    if (textWords.some(word => word.includes(queryWord) || queryWord.includes(word))) {
      matchCount++;
    }
  }
  
  return matchCount / queryWords.length;
}

// Search questions based on query
export function searchQuestions(questions: Question[], query: string): SearchResult[] {
  if (!query) return [];
  
  const searchResults: SearchResult[] = [];
  
  for (const question of questions) {
    // Search in question text
    const questionSimilarity = calculateSimilarity(query, question.question);
    
    // Search in choices
    // let choicesSimilarity = 0;
    // for (const choice of question.choices) {
    //   const similarity = calculateSimilarity(query, choice.label);
    //   choicesSimilarity = Math.max(choicesSimilarity, similarity);
    // }
    
    // // Use the best similarity score
    // const similarity = Math.max(questionSimilarity, choicesSimilarity);
    const similarity = questionSimilarity;
    
    // Include result if it has some relevance
    if (similarity > 0.15) {
      searchResults.push({
        ...question,
        similarity
      });
    }
  }
  
  // Sort by similarity (highest first)
  return searchResults.sort((a, b) => b.similarity - a.similarity);
}
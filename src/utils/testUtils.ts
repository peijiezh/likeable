// Constants for test configuration
export const TEST_CONFIG = {
  MIN_SCORE: 0,
  MAX_SCORE: 4,
  TOTAL_QUESTIONS: 20,
  DIMENSIONS: {
    EMPATHY: 'Empathy',
    AUTHENTICITY: 'Authenticity',
    POSITIVITY: 'Positivity',
    RESPECT: 'Respect',
    SOCIAL_SKILLS: 'Social Skills'
  }
};

// Interface for dimension scores
export interface DimensionScores {
  [key: string]: number[];
}

// Calculate average score for a dimension
export const calculateDimensionAverage = (scores: number[]): number => {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Number((sum / scores.length).toFixed(2));
};

// Calculate overall likeability score
export const calculateOverallScore = (dimensionScores: DimensionScores): number => {
  const dimensionAverages = Object.values(dimensionScores)
    .map(scores => calculateDimensionAverage(scores));
  
  if (dimensionAverages.length === 0) return 0;
  
  const overallSum = dimensionAverages.reduce((acc, score) => acc + score, 0);
  return Number((overallSum / dimensionAverages.length).toFixed(2));
};

// Get feedback based on dimension score
export const getDimensionFeedback = (dimension: string, score: number): string => {
  if (score >= 3.5) {
    return `Your ${dimension.toLowerCase()} score is excellent! You demonstrate strong capabilities in this area.`;
  } else if (score >= 2.5) {
    return `Your ${dimension.toLowerCase()} score is good. There's room for improvement but you're on the right track.`;
  } else {
    return `Your ${dimension.toLowerCase()} score suggests this might be an area for growth and development.`;
  }
};

// Format score for display
export const formatScore = (score: number): string => {
  return score.toFixed(1);
};

// Validate answer value
export const isValidAnswer = (answer: number): boolean => {
  return answer >= TEST_CONFIG.MIN_SCORE && answer <= TEST_CONFIG.MAX_SCORE;
};

// Check if all questions are answered
export const areAllQuestionsAnswered = (answers: number[]): boolean => {
  return answers.length === TEST_CONFIG.TOTAL_QUESTIONS && 
         answers.every(answer => isValidAnswer(answer));
};
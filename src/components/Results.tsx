import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

interface DimensionScore {
  dimension: string;
  score: number;
  interpretation: string;
}

const ResultsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 2rem 0;
  @media (max-width: 768px) {
    height: 300px;
    margin: 1.5rem 0;
  }
`;

const ScoreCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const DimensionTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`;

const ScoreValue = styled.div`
  font-size: 2rem;
  color: #007AFF;
  font-weight: bold;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }
`;

const Interpretation = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const OverallSummary = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SummaryTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
`;

const SummaryText = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.5;
    padding: 0 1rem;
  }
`;

function Results() {
  const location = useLocation();
  const [dimensionScores, setDimensionScores] = useState<DimensionScore[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const answers = location.state?.answers || [];
    const questions = [
      { id: 1, dimension: "Emotional Intelligence", text: "I can easily recognize how others are feeling based on their facial expressions and body language" },
      { id: 2, dimension: "Emotional Intelligence", text: "When someone is upset, I naturally try to understand their perspective before responding" },
      { id: 3, dimension: "Emotional Intelligence", text: "I can effectively manage my emotions even in stressful situations" },
      { id: 4, dimension: "Emotional Intelligence", text: "I'm good at picking up on subtle emotional cues in conversations" },
      { id: 5, dimension: "Communication", text: "I express my thoughts clearly and concisely in conversations" },
      { id: 6, dimension: "Communication", text: "I'm an active listener who gives others my full attention when they speak" },
      { id: 7, dimension: "Communication", text: "I adjust my communication style based on who I'm talking to" },
      { id: 8, dimension: "Communication", text: "I'm comfortable engaging in both casual and serious conversations" },
      { id: 9, dimension: "Authenticity", text: "I stay true to my values even when it's challenging" },
      { id: 10, dimension: "Authenticity", text: "I readily admit my mistakes and learn from them" },
      { id: 11, dimension: "Authenticity", text: "I'm comfortable showing my genuine emotions to others" },
      { id: 12, dimension: "Authenticity", text: "I present myself consistently across different social situations" },
      { id: 13, dimension: "Social Skills", text: "I can easily start and maintain conversations with new people" },
      { id: 14, dimension: "Social Skills", text: "I'm good at making others feel comfortable and included in group settings" },
      { id: 15, dimension: "Social Skills", text: "I handle disagreements or conflicts with grace and respect" },
      { id: 16, dimension: "Social Skills", text: "I naturally build and maintain positive relationships with others" },
      { id: 17, dimension: "Positivity", text: "I tend to find the silver lining in difficult situations" },
      { id: 18, dimension: "Positivity", text: "I bring energy and enthusiasm to my interactions with others" },
      { id: 19, dimension: "Positivity", text: "I regularly express gratitude and appreciation to others" },
      { id: 20, dimension: "Positivity", text: "I maintain an optimistic outlook without dismissing real challenges" }
    ];

    // Calculate scores for each dimension
    const dimensions = ["Emotional Intelligence", "Communication", "Authenticity", "Social Skills", "Positivity"];
    const dimensionScores = dimensions.map(dimension => {
      const dimensionQuestions = questions.filter(q => q.dimension === dimension);
      const dimensionAnswers = dimensionQuestions.map(q => answers[q.id - 1]);
      const score = Math.round(dimensionAnswers.reduce((sum, val) => sum + val, 0) / dimensionQuestions.length * 20);

      return {
        dimension,
        score,
        interpretation: getInterpretation(dimension, score)
      };
    });

    setDimensionScores(dimensionScores);
    setOverallScore(Math.round(dimensionScores.reduce((sum, dim) => sum + dim.score, 0) / dimensions.length));
  }, [location.state]);

  const getInterpretation = (dimension: string, score: number): string => {
    if (score >= 80) {
      switch (dimension) {
        case "Emotional Intelligence":
          return "You excel at understanding and responding to others' emotions. Your high emotional intelligence makes you naturally empathetic and skilled at navigating social situations.";
        case "Communication":
          return "You are an exceptional communicator who can effectively express ideas and actively listen to others. Your communication style is adaptable and engaging.";
        case "Authenticity":
          return "You have a strong sense of self and consistently present your genuine self to others. Your authenticity helps build trust and deep connections.";
        case "Social Skills":
          return "Your outstanding social skills make you a natural at building and maintaining relationships. You navigate social situations with ease and grace.";
        case "Positivity":
          return "Your positive outlook and energy are contagious. You bring light to others' lives while maintaining a balanced and realistic perspective.";
        default:
          return "";
      }
    } else if (score >= 60) {
      switch (dimension) {
        case "Emotional Intelligence":
          return "You show good emotional awareness and can generally understand others' feelings. There's room to develop even deeper emotional connections.";
        case "Communication":
          return "You communicate well in most situations. Focus on fine-tuning your style for different audiences to become even more effective.";
        case "Authenticity":
          return "You generally present yourself authentically. Continue working on maintaining consistency across all situations.";
        case "Social Skills":
          return "You have solid social skills and handle most interactions well. Practice in challenging situations will help you grow further.";
        case "Positivity":
          return "You maintain a generally positive outlook while being realistic. Work on bringing more consistent energy to your interactions.";
        default:
          return "";
      }
    } else {
      switch (dimension) {
        case "Emotional Intelligence":
          return "Consider practicing mindful observation of others' emotional cues and responses. This will help strengthen your emotional intelligence.";
        case "Communication":
          return "Focus on active listening and clear expression of your thoughts. Regular practice will help improve your communication skills.";
        case "Authenticity":
          return "Work on being more comfortable expressing your true self. Start in safe situations and gradually expand your comfort zone.";
        case "Social Skills":
          return "Begin with small steps in social situations. Set goals for initiating conversations and maintaining connections.";
        case "Positivity":
          return "Start small by finding one positive aspect in challenging situations. Gradually build your capacity for positive thinking.";
        default:
          return "";
      }
    }
  };

  const getOverallSummary = (score: number): string => {
    if (score >= 80) {
      return "You have exceptional likeability! Your strong emotional intelligence, communication skills, authenticity, social abilities, and positive outlook make you naturally appealing to others. You create meaningful connections with ease while staying true to yourself.";
    } else if (score >= 60) {
      return "You have good likeability potential! You demonstrate solid interpersonal skills across multiple dimensions. With some focused development in specific areas, you can further enhance your natural appeal to others.";
    } else {
      return "You have opportunities to develop your likeability! Focus on the dimensions where you scored lower and remember that these skills can be improved with practice and mindful effort.";
    }
  };

  return (
    <ResultsContainer>
      <OverallSummary>
        <SummaryTitle>Your Likeability Score: {overallScore}%</SummaryTitle>
        <SummaryText>{getOverallSummary(overallScore)}</SummaryText>
      </OverallSummary>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dimensionScores}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#007AFF"
              fill="#007AFF"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {dimensionScores.map((dim) => (
        <ScoreCard key={dim.dimension}>
          <DimensionTitle>{dim.dimension}</DimensionTitle>
          <ScoreValue>{dim.score}%</ScoreValue>
          <Interpretation>{dim.interpretation}</Interpretation>
        </ScoreCard>
      ))}
    </ResultsContainer>
  );
}

export default Results;
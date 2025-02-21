import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface LocationState {
  dimensionScores: Record<string, number[]>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 2rem;
`;

const ResultCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const Score = styled.div`
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: #2c5282;
  margin-bottom: 2rem;
`;

const Analysis = styled.div`
  margin-bottom: 2rem;
`;

const Category = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h3`
  color: #4a5568;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CategoryScore = styled.span`
  color: #2c5282;
  font-size: 1.1rem;
`;

const CategoryDescription = styled.p`
  color: #718096;
  font-size: 1rem;
  line-height: 1.5;
`;

const RetakeButton = styled.button`
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3182ce;
  }
`;

const PentagonContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto 2rem;
  position: relative;
`;

interface PentagonProps {
  scores: Record<string, number>;
}

const Pentagon: React.FC<PentagonProps> = ({ scores }) => {
  const dimensions = Object.keys(scores);
  const centerX = 200;
  const centerY = 200;
  const radius = 150;

  const getPointCoordinates = (index: number, score: number) => {
    const angle = (2 * Math.PI * index) / 5 - Math.PI / 2;
    const distance = (radius * score) / 100;
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle)
    };
  };

  const points = dimensions.map((_, index) => {
    const score = scores[dimensions[index]];
    return getPointCoordinates(index, score);
  });

  const pathData = points.map((point, index) => 
    index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  const gridLines = Array.from({ length: 5 }, (_, i) => {
    const level = 20 * (i + 1);
    const gridPoints = dimensions.map((_, index) => getPointCoordinates(index, level));
    return gridPoints.map((point, index) => 
      index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    ).join(' ') + ' Z';
  });

  return (
    <svg viewBox="0 0 400 400" style={{ width: '100%', height: 'auto' }}>
      {gridLines.map((path, index) => (
        <path
          key={`grid-${index}`}
          d={path}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}
      
      <path
        d={pathData}
        fill="rgba(66, 153, 225, 0.3)"
        stroke="#4299e1"
        strokeWidth="2"
      />
      
      {dimensions.map((dimension, index) => {
        const labelPoint = getPointCoordinates(index, 120);
        const angle = (360 * index) / 5 - 90;
        return (
          <text
            key={dimension}
            x={labelPoint.x}
            y={labelPoint.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#4a5568"
            fontSize="14"
            transform={`rotate(${angle}, ${labelPoint.x}, ${labelPoint.y})`}
          >
            {dimension}
          </text>
        );
      })}
    </svg>
  );
};

type DimensionAnalyses = {
  'Emotional Intelligence': { high: string; medium: string; low: string };
  'Communication': { high: string; medium: string; low: string };
  'Authenticity': { high: string; medium: string; low: string };
  'Social Skills': { high: string; medium: string; low: string };
  'Positivity': { high: string; medium: string; low: string };
};

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state) {
    navigate('/');
    return null;
  }

  const { dimensionScores } = location.state as LocationState;

  const calculateDimensionScore = (scores: number[]): number => {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return Math.round((total / (scores.length * 4)) * 100);
  };

  const getDimensionAnalysis = (dimension: keyof DimensionAnalyses, score: number): string => {
    const analyses: DimensionAnalyses = {
      'Emotional Intelligence': {
        high: 'You excel at understanding and managing emotions, both your own and others\'.',
        medium: 'You have a good grasp of emotional dynamics but could develop more consistency.',
        low: 'Focus on developing your ability to recognize and respond to emotional cues.'
      },
      'Communication': {
        high: 'Your communication skills are excellent, making you very effective in conversations.',
        medium: 'You communicate well but could enhance your clarity and active listening.',
        low: 'Work on expressing yourself more clearly and listening more actively.'
      },
      'Authenticity': {
        high: 'You present yourself genuinely and consistently across all situations.',
        medium: 'You are generally authentic but might sometimes hold back.',
        low: 'Try to be more consistent in expressing your true self.'
      },
      'Social Skills': {
        high: 'You navigate social situations with ease and make others feel comfortable.',
        medium: 'Your social skills are good but could be more refined in certain situations.',
        low: 'Focus on developing more comfort and confidence in social interactions.'
      },
      'Positivity': {
        high: 'Your positive outlook significantly enhances your likeability.',
        medium: 'You maintain a generally positive attitude but could be more consistent.',
        low: 'Try to cultivate a more optimistic perspective while staying authentic.'
      }
    };

    if (score >= 80) return analyses[dimension].high;
    if (score >= 60) return analyses[dimension].medium;
    return analyses[dimension].low;
  };

  const handleRetake = (): void => {
    navigate('/');
  };

  const dimensionScoresMap = Object.entries(dimensionScores).reduce(
    (acc, [dimension, scores]) => {
      acc[dimension] = calculateDimensionScore(scores);
      return acc;
    },
    {} as Record<string, number>
  );

  const overallScore = Math.round(
    Object.values(dimensionScoresMap).reduce((sum, score) => sum + score, 0) /
    Object.keys(dimensionScoresMap).length
  );

  return (
    <Container>
      <ResultCard>
        <Title>Your Likeability Profile</Title>
        <Score>{overallScore}%</Score>
        <PentagonContainer>
          <Pentagon scores={dimensionScoresMap} />
        </PentagonContainer>
        <Analysis>
          {Object.entries(dimensionScores).map(([dimension, scores]) => {
            const dimensionScore = calculateDimensionScore(scores);
            return (
              <Category key={dimension}>
                <CategoryTitle>
                  {dimension}
                  <CategoryScore>{dimensionScore}%</CategoryScore>
                </CategoryTitle>
                <CategoryDescription>
                  {getDimensionAnalysis(dimension as keyof DimensionAnalyses, dimensionScore)}
                </CategoryDescription>
              </Category>
            );
          })}
        </Analysis>
        <RetakeButton onClick={handleRetake}>Take Test Again</RetakeButton>
      </ResultCard>
    </Container>
  );
};

export default Results;
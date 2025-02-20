import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  dimension: string;
  text: string;
}

const TestContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const QuestionCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const QuestionText = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Option = styled.button<{ selected?: boolean }>`
  background-color: ${props => props.selected ? '#007AFF' : '#f5f5f7'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.selected ? '#0055CC' : '#e5e5e7'};
  }
`;

const Progress = styled.div`
  background-color: #f5f5f7;
  border-radius: 8px;
  height: 8px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ progress: number }>`
  background-color: #007AFF;
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const NavButton = styled.button`
  background-color: #007AFF;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: #0055CC;
  }
`;

function Test() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/questions.csv');
        const csvText = await response.text();
        
        // Skip header row and parse CSV
        const rows = csvText.split('\n').slice(1);
        const parsedQuestions = rows
          .filter(row => row.trim() !== '')
          .map(row => {
            const [id, dimension, text] = row.split(',').map(field => 
              field.replace(/^"(.*)"$/, '$1')
            );
            return {
              id: parseInt(id),
              dimension,
              text
            };
          });

        setQuestions(parsedQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    loadQuestions();
  }, []);

  const getOptionLabel = (value: number): string => {
    switch (value) {
      case 1: return 'Strongly Disagree';
      case 2: return 'Disagree';
      case 3: return 'Neutral';
      case 4: return 'Agree';
      case 5: return 'Strongly Agree';
      default: return '';
    }
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      // Navigate to results when all questions are answered
      navigate('/results', { state: { answers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(curr => curr - 1);
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <TestContainer>
      <Progress>
        <ProgressBar progress={progress} />
      </Progress>

      <QuestionCard>
        <QuestionText>{questions[currentQuestion]?.text}</QuestionText>
        <OptionsContainer>
          {[1, 2, 3, 4, 5].map((value) => (
            <Option
              key={value}
              selected={answers[currentQuestion] === value}
              onClick={() => handleAnswer(value)}
            >
              {getOptionLabel(value)}
            </Option>
          ))}
        </OptionsContainer>

        <NavigationButtons>
          <NavButton
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </NavButton>
          <NavButton
            onClick={handleNext}
            disabled={answers[currentQuestion] === -1}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </NavButton>
        </NavigationButtons>
      </QuestionCard>
    </TestContainer>
  );
}

export default Test;
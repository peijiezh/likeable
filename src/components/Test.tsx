import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  dimension: string;
  question: string;
}

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Question = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled.button<{ selected?: boolean }>`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#3498db' : '#ddd'};
  border-radius: 4px;
  background: ${props => props.selected ? '#ebf5fb' : 'white'};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f7f9fa;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const Progress = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background-color: #3498db;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const Test: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('./questions.csv');
        const csvText = await response.text();
        const lines = csvText.split('\n').slice(1); // Skip header
        const parsedQuestions = lines
          .filter(line => line.trim())
          .map(line => {
            const [id, dimension, question] = line.split(',').map(str => str.replace(/^"(.*)"$/, '$1'));
            return { id: parseInt(id), dimension, question };
          });
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };
    void loadQuestions();
  }, []);

  const options = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  const handleAnswer = (optionIndex: number): void => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = optionIndex;
      return newAnswers;
    });
  };

  const handleNext = (): void => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (questions.length > 0) {
      const dimensionScores = questions.reduce<Record<string, number[]>>((acc, q, index) => {
        const dimension = q.dimension;
        if (!acc[dimension]) acc[dimension] = [];
        if (answers[index] !== undefined && answers[index] !== -1) {
          acc[dimension].push(answers[index]);
        }
        return acc;
      }, {});

      if (Object.keys(dimensionScores).length > 0) {
        navigate('/results', { 
          state: { 
            answers,
            dimensionScores
          }
        });
      } else {
        console.error('No valid dimension scores calculated');
      }
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (questions.length === 0) {
    return <Container>Loading questions...</Container>;
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container>
      <ProgressBar>
        <Progress width={progress} />
      </ProgressBar>
      <QuestionCard>
        <Question>{questions[currentQuestion].question}</Question>
        <OptionsContainer>
          {options.map((option, index) => (
            <Option
              key={index}
              selected={answers[currentQuestion] === index}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Option>
          ))}
        </OptionsContainer>
      </QuestionCard>
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
    </Container>
  );
};

export default Test;
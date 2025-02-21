import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  width: 100%;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 2rem;
  color: #34495e;
  line-height: 1.6;
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/test');
  };

  return (
    <Container>
      <Title>Welcome to the Likeable Person Test</Title>
      <Description>
        Discover your personal likeability score through this comprehensive assessment.
        Answer 20 questions honestly to receive detailed insights about your social
        interactions and personality traits.
      </Description>
      <StartButton onClick={handleStart}>Start Test</StartButton>
    </Container>
  );
};

export default Welcome;
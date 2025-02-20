import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const WelcomeContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }
`;

const StartButton = styled.button`
  background-color: #007AFF;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: #0055CC;
  }
`;

const DimensionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    margin: 1.5rem 0;
    gap: 0.75rem;
  }
`;

const DimensionItem = styled.li`
  background-color: #f5f5f7;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

function Welcome() {
  const navigate = useNavigate();

  return (
    <WelcomeContainer>
      <Description>
        Welcome to the Likeability Test! This assessment will help you understand your
        personal likeability across five key dimensions through a series of 20 questions.
      </Description>
      
      <DimensionList>
        <DimensionItem>Emotional Intelligence</DimensionItem>
        <DimensionItem>Communication</DimensionItem>
        <DimensionItem>Authenticity</DimensionItem>
        <DimensionItem>Social Skills</DimensionItem>
        <DimensionItem>Positivity</DimensionItem>
      </DimensionList>

      <Description>
        The test takes about 5-10 minutes to complete. Answer each question honestly
        for the most accurate results.
      </Description>

      <StartButton onClick={() => navigate('/test')}>
        Start Test
      </StartButton>
    </WelcomeContainer>
  );
}

export default Welcome;
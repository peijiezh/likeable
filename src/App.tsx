import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';
import Welcome from './components/Welcome';
import Test from './components/Test';
import Results from './components/Results';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  return (
    <Router>
      <AppContainer>
        <Header>
          <Title>Likeability Test</Title>
          <Subtitle>
            Discover your personal likeability profile across five key dimensions
          </Subtitle>
        </Header>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App

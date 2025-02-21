import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import Welcome from './components/Welcome';
import Test from './components/Test';
import Results from './components/Results';

const AppContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  min-height: 100vh;  // Added to take full viewport height
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  // Added to center vertically
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    min-height: 100px;
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

const Layout = ({ children }: { children: React.ReactNode }) => (
  <AppContainer>
    <Header>
      <Title>Likeable Person Test</Title>
      <Subtitle>
        Discover your personal likeability profile across five key dimensions
      </Subtitle>
    </Header>
    {children}
  </AppContainer>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Welcome /></Layout>} />
        <Route path="/test" element={<Layout><Test /></Layout>} />
        <Route path="/results" element={<Layout><Results /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { InteractiveFeatures } from './components/InteractiveFeatures';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 60px; // Account for navbar height
`;

function App() {
  return (
    <AppContainer>
      <Navbar />
      <MainContent>
        <InteractiveFeatures />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App; 
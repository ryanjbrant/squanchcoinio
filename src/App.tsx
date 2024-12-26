import React from 'react';
import { InteractiveFeatures } from './components/InteractiveFeatures';
import { Navbar } from './components/Navbar';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #000;
  padding-top: 60px; // Account for navbar height
`;

function App() {
  return (
    <AppContainer>
      <Navbar />
      <InteractiveFeatures />
    </AppContainer>
  );
}

export default App; 
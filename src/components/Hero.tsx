import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  position: relative;
  overflow: hidden;
`;

const HeroText = styled.h1`
  font-family: 'Creepster', cursive;
  font-size: clamp(10rem, 25vw, 30rem);
  text-align: center;
  color: gold;
  margin: 0;
  line-height: 1;
  letter-spacing: 0.02em;
  width: 100%;
`;

const SubText = styled.h2`
  font-family: 'Creepster', cursive;
  font-size: clamp(1.5rem, 4vw, 3rem);
  text-align: center;
  color: #fff;
  margin: 1rem 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

export const Hero: React.FC = () => {
  return (
    <HeroContainer>
      <HeroText>SQUANCH</HeroText>
      <SubText>Quantum Access to an interdimensional realm.</SubText>
    </HeroContainer>
  );
}; 
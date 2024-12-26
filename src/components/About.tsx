import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 4rem 2rem;
`;

const Title = styled.h2`
  font-family: 'Creepster', cursive;
  font-size: clamp(2.5rem, 6vw, 4rem);
  text-align: center;
  color: #fff;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  line-height: 1.6;
`;

export const About: React.FC = () => {
  return (
    <AboutSection>
      <Title>About Squanch Coin</Title>
      <Content>
        <p>The most schwifty cryptocurrency in the multiverse!</p>
        <p>Join us on an interdimensional adventure through decentralized finance.</p>
      </Content>
    </AboutSection>
  );
}; 
import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
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

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  
  a {
    color: #fff;
    text-decoration: none;
    font-size: clamp(1rem, 2vw, 1.4rem);
    transition: color 0.3s ease;
    
    &:hover {
      color: #9d4edd;
    }
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterSection>
      <Title>Join the Community</Title>
      <Content>
        <p>Get schwifty with us on social media!</p>
        <SocialLinks>
          <a href="#twitter">Twitter</a>
          <a href="#telegram">Telegram</a>
          <a href="#discord">Discord</a>
        </SocialLinks>
      </Content>
    </FooterSection>
  );
}; 
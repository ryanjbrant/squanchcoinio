import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
`;

const Logo = styled.div`
  color: #fff;
  font-family: 'Source Code Pro', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  
  span {
    color: #00ff00;
  }
`;

const HudContainer = styled.div`
  margin-left: auto;
  display: flex;
  gap: 20px;
  align-items: center;
  font-family: 'Source Code Pro', monospace;
  color: #00ff00;
  font-size: 0.9rem;
`;

const HudElement = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  &:before {
    content: '[';
    color: #666;
  }

  &:after {
    content: ']';
    color: #666;
  }
`;

const Blinker = styled.span`
  animation: blink 1s step-end infinite;
  
  @keyframes blink {
    50% { opacity: 0; }
  }
`;

export const Navbar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <NavbarContainer>
      <Logo>SQUANCH<span>_</span></Logo>
      <HudContainer>
        <HudElement>v0.1.0-alpha</HudElement>
        <HudElement>sys:online<Blinker>_</Blinker></HudElement>
        <HudElement>{time.toLocaleTimeString()}</HudElement>
      </HudContainer>
    </NavbarContainer>
  );
}; 
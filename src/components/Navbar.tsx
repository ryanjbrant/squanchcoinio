import React from 'react';
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

export const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo>SQUANCH<span>_</span></Logo>
    </NavbarContainer>
  );
}; 
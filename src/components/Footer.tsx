import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const HudFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-family: 'Source Code Pro', monospace;
  color: #00ff00;
  font-size: 0.8rem;
  border-top: 1px solid rgba(255, 215, 0, 0.1);
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
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

const HudGroup = styled.div`
  display: flex;
  gap: 15px;
`;

export const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <HudFooter>
        <HudGroup>
          <HudElement>squanchcoin-client</HudElement>
          <HudElement>status:active</HudElement>
        </HudGroup>
        <HudGroup>
          <HudElement>mem:optimal</HudElement>
          <HudElement>net:connected</HudElement>
          <HudElement>env:production</HudElement>
        </HudGroup>
      </HudFooter>
    </FooterWrapper>
  );
}; 
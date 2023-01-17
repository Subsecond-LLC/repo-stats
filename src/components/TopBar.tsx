import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo300.png';
import { useNavigate } from 'react-router-dom';

const TopBarContainer = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ddd;

  background-color: #fff;
`;

const TopBarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;

  max-width: 1000px;
  margin: 0 auto;
`;

const Left = styled.div`
  margin-left: 32px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 44px;
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-right: 32px;
`;

const Link = styled.a`
  text-decoration: none;

  color: #1368e3;
  margin: 0 8px;
`;

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <TopBarContainer>
      <TopBarContent>
        <Left>
          <Logo onClick={() => navigate('/')} src={logo} />
        </Left>
        <Right>
          <Link
            href="https://github.com/Subsecond-LLC/repo-stats"
            target="_blank"
          >
            Source on Github
          </Link>{' '}
          |
          <Link
            href="https://github.com/Subsecond-LLC/subsecond"
            target="_blank"
          >
            Built with Subsecond
          </Link>
        </Right>
      </TopBarContent>
    </TopBarContainer>
  );
}

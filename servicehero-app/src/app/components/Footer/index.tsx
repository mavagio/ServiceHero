/**
 *
 * Footer
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;

export const Footer = () => {
  return (
    <Wrapper>
      <RouterLink to="/">ServiceHero </RouterLink>
      <Year>© 2021</Year>
    </Wrapper>
  );
};

const Year = styled.span`
  margin-right: 40px;
`;

const RouterLink = styled(Link)`
  display: inline-block;
  margin: 0px 5px;
  color: grey;
`;

const Wrapper = styled(AntFooter)`
  padding: 0px;
  padding-left: 60px;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 40px;
  color: grey;
`;

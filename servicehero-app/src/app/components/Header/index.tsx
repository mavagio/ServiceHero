/**
 *
 * Header
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import { Layout } from 'antd';
import { UserProfile } from './UserProfile/Loadable';
import { Logo } from 'app/components/Logo/Loadable';
import { NavigationMenu } from './NavigationMenu/Loadable';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../containers/Authentication/selectors';

const { Header: AntHeader } = Layout;

export const Header = () => {
  const accessToken = useSelector(selectAccessToken);
  return (
    <>
      <Wrapper>
        <Logo />
        {accessToken ? <NavigationMenu /> : <div />}
        {accessToken ? (
          <UserProfile />
        ) : (
          <LoginLink to={'/login'}>Login</LoginLink>
        )}
      </Wrapper>
    </>
  );
};

const LoginLink = styled(Link)`
  justify-self: right;
`;

const Wrapper = styled(AntHeader)`
  display: grid;
  position: relative;
  z-index: 10;
  grid-template-rows: ${props => props.theme['header-height']};
  height: ${props => props.theme['header-height']};
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background-color: ${props => props.theme['header-footer-color-bg']};
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  padding: 0px 60px;
`;

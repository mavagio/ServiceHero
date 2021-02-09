/**
 *
 * Logo
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';

import { Link as RouterLink } from 'react-router-dom';

export enum LogoType {
  Dark = 'dark',
  Light = 'light',
}

export const Logo = memo(() => {
  return (
    <>
      <Link to="/">
        <LightName>Service</LightName>
        <DarkName>Hero</DarkName>
      </Link>
    </>
  );
});

const LightName = styled.span`
  color: white;
`;

const DarkName = styled.span`
  color: ${props => props.theme['primary-color']};
  font-weight: bold;
`;

const Link = styled(RouterLink)`
  width: 200px;
  font-size: 1.4em;
`;

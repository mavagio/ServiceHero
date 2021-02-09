/**
 *
 * NavigationMenu
 *
 */

import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu as AntMenu } from 'antd';

interface Props {}

export const NavigationMenu = memo((props: Props) => {
  const [selectedPage, setSelectedPage] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location]);

  const handleClick = e => {
    setSelectedPage(e.key);
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      onClick={handleClick}
      selectedKeys={[selectedPage]}
    >
      <Menu.Item key={'/'}>
        <Link to={'/'}>Home</Link>
      </Menu.Item>
      <Menu.Item key={'/profile'}>
        <Link to={'/profile'}>Profile</Link>
      </Menu.Item>
    </Menu>
  );
});

const Menu = styled(AntMenu)`
  background: transparent;
  border-bottom: 0px;
  font-size: 16px;
  display: flex;
  justify-content: center;

  .ant-menu-item-selected a {
    color: #ffffff;
    opacity: 1;
  }
`;

/**
 *
 * UserProfile
 *
 */
import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { authenticationActions } from 'app/containers/Authentication/slice';
import { selectUser } from 'app/containers/Authentication/selectors';
import moment from 'moment';
import { Menu, Dropdown as AntDropDown } from 'antd';
import {
  CaretDownOutlined as AntCaretDownOutlined,
  UserOutlined as AntUserOutlined,
} from '@ant-design/icons';

interface Props {}

export const UserProfile = memo((props: Props) => {
  const [partOfDay, setPartOfDay] = useState('');

  useEffect(() => {
    setPartOfDay(getPartOfDay());
  }, []);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authenticationActions.logout());
  };

  const user = useSelector(selectUser);
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Wrapper>
      <Dropdown overlay={menu} trigger={['click']}>
        <Anchor className="ant-dropdown-link">
          <Name data-hj-suppress>
            Good {partOfDay}, {user?.name}
          </Name>{' '}
          <UserOutlined />
          <CaretDownOutlined />
        </Anchor>
      </Dropdown>
    </Wrapper>
  );
});

const getPartOfDay = () => {
  const currentHour = parseInt(moment().format('H'));
  if (currentHour >= 18) return 'evening';
  if (currentHour >= 12) return 'afternoon';
  return 'morning';
};

const Name = styled.span`
  white-space: nowrap;
`;

const UserOutlined = styled(AntUserOutlined)`
  font-size: 20px;
  margin-left: 8px;
`;

const CaretDownOutlined = styled(AntCaretDownOutlined)`
  color: ${props => props.theme['secondary-color']} !important;
  font-size: 12px;
`;

const Anchor = styled.span`
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  justify-self: right;
`;

const Dropdown = styled(AntDropDown)`
  align-self: center;
  max-width: 250px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;

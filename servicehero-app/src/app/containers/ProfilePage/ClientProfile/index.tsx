/**
 *
 * ClientProfile
 *
 */

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/containers/Authentication/selectors';
import styled from 'styled-components/macro';
import { Typography, Divider } from 'antd';
import { UserProjects } from 'app/containers/UserProjects';
import { UserType } from 'types';

const { Title } = Typography;

interface Props {}

export const ClientProfile = memo((props: Props) => {
  const user = useSelector(selectUser);

  return (
    <Wrapper>
      <Divider>
        <Title level={3}>Your projects</Title>
      </Divider>
      {user && (
        <UserProjects userId={user.sub} userType={UserType[user.type]} />
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div``;

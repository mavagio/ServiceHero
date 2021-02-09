/**
 *
 * SpecialistPage
 *
 */

import * as React from 'react';
import styled from 'styled-components/macro';

import { SpecialistServices } from 'app/containers/SpecialistServices';
import { UserProjects } from 'app/containers/UserProjects';
import { Typography, Divider } from 'antd';
import { UserType } from 'types';
import { useParams } from 'react-router-dom';
import { UserInfo } from 'app/containers/UserInfo';

const { Title } = Typography;

interface Props {}

export function SpecialistPage(props: Props) {
  let { id } = useParams<any>();
  return (
    <Wrapper>
      <UserInfo userId={id} />
      <Divider>
        <Title level={3}>Specialists services</Title>
      </Divider>
      <SpecialistServices specialistId={id} />
      <Divider>
        <Title level={3}>Specialists projects</Title>
      </Divider>
      <UserProjects userId={id} userType={UserType.Specialist} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

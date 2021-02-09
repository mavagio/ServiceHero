/**
 *
 * SpecialistProfile
 *
 */

import * as React from 'react';
import styled from 'styled-components/macro';
import { SpecialistServices } from 'app/containers/SpecialistServices';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/containers/Authentication/selectors';
import { Typography, Divider, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { listingEditorModalActions } from 'app/containers/ListingEditorModal/slice';
import { useDispatch } from 'react-redux';
import { UserProjects } from 'app/containers/UserProjects';
import { UserType } from 'types';

const { Title } = Typography;

interface Props {}

export function SpecialistProfile(props: Props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const openServiceEditorModal = () => {
    dispatch(listingEditorModalActions.openModal(null));
  };
  return (
    <Wrapper>
      <Divider>
        <Title level={3}>
          My services{' '}
          <Button
            icon={<PlusCircleOutlined />}
            type="primary"
            shape="circle"
            onClick={openServiceEditorModal}
          ></Button>
        </Title>
      </Divider>
      <SpecialistServices specialistId={user?.sub} />
      <Divider>
        <Title level={3}>Your projects</Title>
      </Divider>
      {user && (
        <UserProjects userId={user.sub} userType={UserType[user.type]} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

/**
 *
 * UserInfo
 *
 */

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, userInfoActions } from './slice';
import { selectUser } from './selectors';
import { userInfoSaga } from './saga';
import { Avatar as AntAvatar, Typography, Rate, Tag as AntTag } from 'antd';
import { useEffect } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { UserType } from 'types';
import { formatRating } from 'utils';

const { Title: AntTitle } = Typography;

interface Props {
  userId: string;
}

export function UserInfo({ userId }: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userInfoSaga });

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userInfoActions.loadUser(userId));
  }, [dispatch, userId]);

  return (
    <Wrapper>
      <Avatar size={{ xs: 32, sm: 64, md: 64, lg: 80, xl: 100, xxl: 120 }}>
        {user?.name.substring(0, 1) || 'User'}
      </Avatar>
      <Title level={5}>{user?.name}</Title>
      <Title level={5}>
        <MailOutlined /> {user?.email}
      </Title>
      <Tag color="geekblue">{UserType.Specialist}</Tag>
      <Rate
        disabled={true}
        allowHalf={true}
        value={user?.rating || 0}
        count={5}
      />
      <Rating>{formatRating(user?.rating)}</Rating>
    </Wrapper>
  );
}

const Rating = styled.span`
  font-size: 1.2em;
  color: ${props => props.theme['secondary-color']};
  font-weight: bold;
`;

const Tag = styled(AntTag)`
  border-radius: 4px;
  margin: 8px;
`;

const Title = styled(AntTitle)`
  margin: 0px !important;
  margin-top: 8px !important;
`;

const Avatar = styled(AntAvatar)`
  background: #f56a00;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

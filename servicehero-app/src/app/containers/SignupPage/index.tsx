/**
 *
 * SignupPage
 *
 */

import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, signupPageActions } from './slice';
import { selectError, selectLoading, selectIsSuccess } from './selectors';
import { signupPageSaga } from './saga';

import { Form, Input, Button, Typography, Select, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { UserDto } from './types';

const { Title } = Typography;
const { Option } = Select;

interface Props {}

export const SignupPage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: signupPageSaga });

  const dispatch = useDispatch();

  const signUpError = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    if (isSuccess) {
      message.success('Signup is successful!');
      dispatch(signupPageActions.reset());
    }
  }, [isSuccess, dispatch]);

  const onFinish = (values: UserDto) => {
    dispatch(signupPageActions.signUp(values));
  };

  if (isSuccess) return <Redirect to="login" />;
  return (
    <Wrapper>
      <Container>
        <Title level={4}>Signup</Title>
        {signUpError && <Error>Incorrect field, please try again</Error>}
        <Form
          name="signupForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="type"
            hasFeedback
            rules={[{ required: true, message: 'Please select your country!' }]}
          >
            <Select placeholder="Please select account type">
              <Option value="Client">Client</Option>
              <Option value="Specialist">Specialist</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Signup
            </Button>
          </Form.Item>
        </Form>
        or<Link to={'/login'}> Login</Link>
      </Container>
    </Wrapper>
  );
});

const Error = styled.div`
  color: ${props => props.theme['error-color']};
  padding: 20px 0px;
`;

const Container = styled.div`
  padding: 30px;
  width: 400px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

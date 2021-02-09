/**
 *
 * LoginPage
 *
 */

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import React, { memo, useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { authenticationActions } from 'app/containers/Authentication/slice';
import { LoginPayload } from '../Authentication/types';
import { Redirect } from 'react-router-dom';
import { AuthService } from 'app/services/AuthService';
import { selectAccessToken, selectError } from '../Authentication/selectors';

const { Title } = Typography;

interface Props {
  redirectUrl?: string;
}

export const LoginPage = memo(({ redirectUrl = '/' }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();

  const accessToken = useSelector(selectAccessToken);
  const loginError = useSelector(selectError);

  const onFinish = (values: LoginPayload) => {
    dispatch(authenticationActions.login(values));
  };

  useEffect(() => {
    if (AuthService.isTokenValid()) {
      setIsAuth(true);
    }
  }, [accessToken, redirectUrl]);

  if (isAuth) return <Redirect to={redirectUrl} />;
  return (
    <Wrapper>
      <Container>
        <Title level={4}>Login</Title>
        {loginError && <Error>Password or email incorrect</Error>}
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email.' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password.' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
        or<Link to={'/signup'}> Signup</Link>
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

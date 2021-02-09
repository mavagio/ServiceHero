/**
 *
 * AnautherisedPage
 *
 */
import React, { memo } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

interface Props {}

export const UnauthorizedPage = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link to="/login">
          <Button> Login </Button>
        </Link>
      }
    />
  );
});

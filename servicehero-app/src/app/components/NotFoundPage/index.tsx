import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

interface Props {
  title?: string;
  subTitle?: string;
}
export function NotFoundPage({
  title = '404',
  subTitle = 'Sorry, the page you visited does not exist.',
}: Props) {
  return (
    <>
      <Result
        status="404"
        title={title}
        subTitle={subTitle}
        extra={
          <Link to="/">
            <Button> Back to Home </Button>
          </Link>
        }
      />
    </>
  );
}

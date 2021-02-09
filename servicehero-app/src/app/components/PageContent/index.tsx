/**
 *
 * PageContent
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Layout } from 'antd';

const { Content } = Layout;
interface Props {
  children: any;
}

export function PageContent({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled(Content)`
  min-height: calc(100vh - 104px);
  padding: 30px 60px;
  position: relative;
`;

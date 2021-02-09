import React from 'react';
import { render } from '@testing-library/react';
import { Logo } from '..';
import { BrowserRouter } from 'react-router-dom';

describe('<Logo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import { UnauthorizedPage } from '..';
import { BrowserRouter } from 'react-router-dom';

describe('<UnauthorizedPage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <BrowserRouter>
        <UnauthorizedPage />
      </BrowserRouter>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

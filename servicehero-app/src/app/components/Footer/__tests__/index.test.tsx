import React from 'react';
import { render } from '@testing-library/react';

import { Footer } from '..';
import { BrowserRouter } from 'react-router-dom';

describe('<Footer  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

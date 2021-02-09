import * as React from 'react';
import { render } from '@testing-library/react';
import { PrivateRoute } from '..';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

describe('<PrivateRoute  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <BrowserRouter>
        <Provider store={configureAppStore()}>
          <PrivateRoute path="/profile" />
        </Provider>
      </BrowserRouter>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

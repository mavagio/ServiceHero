import React from 'react';
import { render } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { Header } from '..';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = (store: Store) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>,
  );

describe('<Header  />', () => {
  let store: ReturnType<typeof configureAppStore>;

  beforeEach(() => {
    store = configureAppStore();
  });
  it('should match snapshot', () => {
    const loadingIndicator = renderComponent(store);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

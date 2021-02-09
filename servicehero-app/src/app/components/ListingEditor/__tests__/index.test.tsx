import * as React from 'react';
import { render } from '@testing-library/react';
import { ListingEditor } from '..';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

describe('<ListingEditor  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <Provider store={configureAppStore()}>
        <ListingEditor />
      </Provider>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

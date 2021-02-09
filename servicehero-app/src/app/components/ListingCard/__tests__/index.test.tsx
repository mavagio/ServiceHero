import React from 'react';
import { render } from '@testing-library/react';
import { ListingCard } from '../index';
import { Listing, ListingType, UserType } from 'types';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as H from 'history';

import 'utils/mock/matchMedia';
import { configureAppStore } from 'store/configureStore';

const listing: Listing = {
  availability: ['18:00', '19:00'],
  _id: '600de6f7b8639085d641428d',
  type: ListingType.Cleaning,
  description: 'I am really good mover and do it cheaply',
  hourlyRate: 20,
  specialist: {
    _id: '600c7e3efd9e52514647b420',
    name: 'Martin',
    email: 'martin@email.com',
    type: UserType.Specialist,
  },
};

describe('<ListingCard  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <Provider store={configureAppStore()}>
        <Router history={H.createBrowserHistory()}>
          <ListingCard loading={false} listing={listing} />
        </Router>
      </Provider>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

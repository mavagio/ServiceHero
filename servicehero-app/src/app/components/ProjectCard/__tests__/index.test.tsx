import * as React from 'react';
import { render } from '@testing-library/react';
import { ListingType, Project, ProjectStatus, UserType } from 'types';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ProjectCard } from '..';
import { configureAppStore } from 'store/configureStore';
import * as H from 'history';

const project: Project = {
  _id: '601072b923bf2675e25ae32b',
  client: {
    _id: '60103a3ca862fc4fe182c17e',
    name: 'Sar',
    email: 'sar@email.com',
    type: UserType.Client,
  },
  specialist: {
    _id: '60103a48a862fc4fe182c17f',
    name: 'Martin',
    email: 'mar@email.com',
    type: UserType.Specialist,
    rating: 3.75,
  },
  listing: {
    availability: ['06:00', '07:00'],
    _id: '60103b84a862fc4fe182c184',
    type: ListingType.CarRepair,
    description: 'I am very good cleaner',
    hourlyRate: 44,
    specialist: {
      _id: '60103a48a862fc4fe182c17f',
      name: 'Martin',
      email: 'mar@email.com',
      type: UserType.Specialist,
      rating: 3.75,
    },
  },
  status: ProjectStatus.CompletePending,
  review: {
    comment: 'Very good service',
    rating: 2.5,
  },
};

describe('<ProjectCard  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(
      <Provider store={configureAppStore()}>
        <Router history={H.createBrowserHistory()}>
          <ProjectCard loading={false} project={project} />
        </Router>
      </Provider>,
    );
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

import * as React from 'react';
import { render } from '@testing-library/react';

import { PageContent } from '..';

describe('<PageContent  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<PageContent children={() => <></>} />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});

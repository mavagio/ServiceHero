/**
 *
 * Asynchronously loads the component for UserProfile
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserProfile = lazyLoad(
  () => import('./index'),
  module => module.UserProfile,
);

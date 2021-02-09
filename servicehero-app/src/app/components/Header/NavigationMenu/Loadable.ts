/**
 *
 * Asynchronously loads the component for NavigationMenu
 *
 */

import { lazyLoad } from 'utils/loadable';

export const NavigationMenu = lazyLoad(
  () => import('./index'),
  module => module.NavigationMenu,
);

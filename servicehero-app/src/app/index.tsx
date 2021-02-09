/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import { HomePage } from './containers/HomePage';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoginPage } from './containers/LoginPage';
import { SignupPage } from './containers/SignupPage';
import { PageContent } from './components/PageContent';
import { Authentication } from './containers/Authentication';
import { ProfilePage } from './containers/ProfilePage';
import { PrivateRoute } from './components/PrivateRoute';
import { ListingManager } from './containers/ListingManager';
import { ListingEditorModal } from './containers/ListingEditorModal';
import { ProjectManager } from './containers/ProjectManager';
import { SpecialistPage } from './containers/SpecialistPage';

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - ServiceHero" defaultTitle="ServiceHero">
        <meta
          name="description"
          content="Connecting service providers with clients"
        />
      </Helmet>
      <Authentication />
      <ListingManager />
      <ProjectManager />
      <ListingEditorModal />
      <Header />
      <PageContent>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/specialist/:id" component={SpecialistPage} />
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <Route exact path="/404" children={NotFoundPage} />
          <Redirect path="*" to={'/404'} />
        </Switch>
      </PageContent>

      <Footer />
      <GlobalStyle />
    </BrowserRouter>
  );
}

import React, { memo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthService } from 'app/services/AuthService';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../containers/Authentication/selectors';
interface Props {
  children?: any;
  path: string;
}

export const PrivateRoute = memo(({ children, ...rest }: Props) => {
  const accessToken = useSelector(selectAccessToken);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken || AuthService.isTokenValid() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
});

/**
 *
 * Authentication
 *
 */

import * as React from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, authenticationActions } from './slice';
import { authenticationSaga } from './saga';
import { useEffect } from 'react';
import { AuthService } from 'app/services/AuthService';
import { useDispatch } from 'react-redux';

interface Props {}

export function Authentication(props: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (AuthService.isTokenValid()) {
      dispatch(authenticationActions.loginSuccess(AuthService.getJwtToken()));
      dispatch(authenticationActions.setUser(AuthService.getPayload()));
    }
  }, [dispatch]);

  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authenticationSaga });
  return <></>;
}

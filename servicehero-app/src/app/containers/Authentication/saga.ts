import { call, put, takeLatest } from 'redux-saga/effects';
import { authenticationActions } from './slice';

import { apiRequests } from 'app/services/ApiRequestService';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginPayload } from './types';
import { AuthService } from 'app/services/AuthService';

export function* login(action: PayloadAction<LoginPayload>) {
  try {
    const { access_token } = yield call(apiRequests, 'auth/login', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    });
    AuthService.saveJwtToken(access_token);
    yield put(authenticationActions.loginSuccess(access_token));
    yield put(authenticationActions.setUser(AuthService.getPayload()));
  } catch (err) {
    yield put(
      authenticationActions.loginError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* authenticationSaga() {
  yield takeLatest(authenticationActions.login.type, login);
}

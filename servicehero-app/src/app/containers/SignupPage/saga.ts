import { PayloadAction } from '@reduxjs/toolkit';
import { apiRequests } from 'app/services/ApiRequestService';
import { call, put, takeLatest } from 'redux-saga/effects';
import { signupPageActions } from './slice';
import { UserDto } from './types';

export function* signUp(action: PayloadAction<UserDto>) {
  try {
    yield call(apiRequests, 'user', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    });
    yield put(signupPageActions.singUpSuccess());
  } catch (err) {
    yield put(
      signupPageActions.signUpError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* signupPageSaga() {
  yield takeLatest(signupPageActions.signUp.type, signUp);
}

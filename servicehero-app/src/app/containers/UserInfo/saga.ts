import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { apiRequests } from 'app/services/ApiRequestService';

import { userInfoActions } from './slice';
import { User } from 'types';

export function* getUser(action: PayloadAction<string>) {
  try {
    const payload: User = yield call(apiRequests, `user/${action.payload}`);
    yield put(userInfoActions.userLoaded(payload));
  } catch (err) {
    yield put(
      userInfoActions.userError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* userInfoSaga() {
  yield takeLatest(userInfoActions.loadUser.type, getUser);
}

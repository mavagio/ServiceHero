import { call, put, takeLatest } from 'redux-saga/effects';
import { homePageActions } from './slice';
import { apiRequests } from 'app/services/ApiRequestService';
import { Listing } from 'types';
import { PayloadAction } from '@reduxjs/toolkit';

export function* getListings(action: PayloadAction<string>) {
  const queryParams = action.payload;
  try {
    const payload: Listing[] = yield call(
      apiRequests,
      `listing/?${queryParams}`,
    );
    yield put(homePageActions.listingsLoaded(payload));
  } catch (err) {
    yield put(
      homePageActions.listingsError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* homePageSaga() {
  yield takeLatest(homePageActions.loadListings.type, getListings);
}

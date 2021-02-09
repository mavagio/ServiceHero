import { call, put, takeLatest } from 'redux-saga/effects';
import { specialistServicesActions } from './slice';

import { apiRequests } from 'app/services/ApiRequestService';
import { Listing } from 'types';
import { PayloadAction } from '@reduxjs/toolkit';

export function* loadListingsForSpecialist(action: PayloadAction<string>) {
  try {
    const payload: Listing[] = yield call(
      apiRequests,
      `listing/specialist/${action.payload}`,
    );
    yield put(specialistServicesActions.listingsLoaded(payload));
  } catch (err) {
    yield put(
      specialistServicesActions.listingsError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* specialistServicesSaga() {
  yield takeLatest(
    specialistServicesActions.loadListings.type,
    loadListingsForSpecialist,
  );
}

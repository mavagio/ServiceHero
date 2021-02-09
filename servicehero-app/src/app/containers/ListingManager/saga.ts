import { call, put, takeLatest } from 'redux-saga/effects';
import { listingManagerActions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListingDto } from 'types';
import { apiRequests } from 'app/services/ApiRequestService';
import { EditListingPayload } from './types';

export function* addListing(action: PayloadAction<ListingDto>) {
  try {
    yield call(apiRequests, 'listing', {
      method: 'POST',
      body: JSON.stringify(action.payload),
    });
    yield put(listingManagerActions.listingActionSuccess());
  } catch (err) {
    yield put(
      listingManagerActions.setError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* editListing(action: PayloadAction<EditListingPayload>) {
  const { id, listingDto } = action.payload;
  try {
    yield call(apiRequests, `listing/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(listingDto),
    });
    yield put(listingManagerActions.listingActionSuccess());
  } catch (err) {
    yield put(
      listingManagerActions.setError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* deleteListing(action: PayloadAction<string>) {
  try {
    yield call(apiRequests, `listing/${action.payload}`, {
      method: 'DELETE',
    });
    yield put(listingManagerActions.listingActionSuccess());
  } catch (err) {
    yield put(
      listingManagerActions.setError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* listingManagerSaga() {
  yield takeLatest(listingManagerActions.addListing.type, addListing);
  yield takeLatest(listingManagerActions.editListing.type, editListing);
  yield takeLatest(listingManagerActions.deleteListing.type, deleteListing);
}

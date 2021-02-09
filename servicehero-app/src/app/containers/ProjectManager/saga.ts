import { call, put, takeLatest } from 'redux-saga/effects';
import { projectManagerActions } from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { UpdateReviewPayload, UpdateStatusPayload } from './types';
import { apiRequests } from 'app/services/ApiRequestService';

export function* createProject(action: PayloadAction<string>) {
  try {
    yield call(apiRequests, `project`, {
      method: 'POST',
      body: JSON.stringify({ listingId: action.payload }),
    });
    yield put(projectManagerActions.projectActionSuccess());
  } catch (err) {
    yield put(
      projectManagerActions.setError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* updateStatus(action: PayloadAction<UpdateStatusPayload>) {
  const { projectId, newStatus } = action.payload;
  try {
    yield call(apiRequests, `project/status/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });
    yield put(projectManagerActions.projectActionSuccess());
  } catch (err) {
    yield put(
      projectManagerActions.setError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* updateReview(action: PayloadAction<UpdateReviewPayload>) {
  const { projectId, review } = action.payload;
  try {
    yield call(apiRequests, `project/review/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify(review),
    });
    yield put(projectManagerActions.projectActionSuccess());
  } catch (err) {
    yield put(
      projectManagerActions.setError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* projectManagerSaga() {
  yield takeLatest(projectManagerActions.updateStatus.type, updateStatus);
  yield takeLatest(projectManagerActions.updateReview.type, updateReview);
  yield takeLatest(projectManagerActions.createProject.type, createProject);
}

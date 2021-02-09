import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userProjectsActions } from './slice';
import { FetchProjectPayload } from './types';
import { apiRequests } from 'app/services/ApiRequestService';
import { Project, UserType } from 'types';

export function* loadProjectsForUser(
  action: PayloadAction<FetchProjectPayload>,
) {
  const { userId, userType } = action.payload;
  const endpoint = userType === UserType.Specialist ? 'specialist' : 'client';
  try {
    const payload: Project[] = yield call(
      apiRequests,
      `project/${endpoint}/${userId}`,
    );
    yield put(userProjectsActions.projectsLoaded(payload));
  } catch (err) {
    yield put(
      userProjectsActions.projectsError(
        `${err.response?.status}: ${err.response?.statusText}`,
      ),
    );
  }
}

export function* userProjectsSaga() {
  yield takeLatest(userProjectsActions.loadProjects.type, loadProjectsForUser);
}

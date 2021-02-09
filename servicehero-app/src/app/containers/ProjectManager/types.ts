import { ProjectStatus, Review } from 'types';

/* --- STATE --- */
export interface ProjectManagerState {
  isSuccess: boolean;
  loading: boolean;
  error?: null | string;
}

export interface UpdateStatusPayload {
  projectId: string;
  newStatus: ProjectStatus;
}

export interface UpdateReviewPayload {
  projectId: string;
  review: Review;
}

export type ContainerState = ProjectManagerState;

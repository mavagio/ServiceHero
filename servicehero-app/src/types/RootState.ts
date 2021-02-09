import { HomePageState } from 'app/containers/HomePage/types';
import { SignupPageState } from 'app/containers/SignupPage/types';
import { AuthenticationState } from 'app/containers/Authentication/types';
import { SpecialistServicesState } from 'app/containers/SpecialistServices/types';
import { ListingManagerState } from 'app/containers/ListingManager/types';
import { ListingEditorModalState } from 'app/containers/ListingEditorModal/types';
import { FilterPanelState } from 'app/containers/FilterPanel/types';
import { UserProjectsState } from 'app/containers/UserProjects/types';
import { ProjectManagerState } from 'app/containers/ProjectManager/types';
import { UserInfoState } from 'app/containers/UserInfo/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  homePage?: HomePageState;
  signupPage?: SignupPageState;
  authentication?: AuthenticationState;
  specialistServices?: SpecialistServicesState;
  listingManager?: ListingManagerState;
  listingEditorModal?: ListingEditorModalState;
  filterPanel?: FilterPanelState;
  userProjects?: UserProjectsState;
  projectManager?: ProjectManagerState;
  userInfo?: UserInfoState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

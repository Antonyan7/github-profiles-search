import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/src/redux/store';

const selector = (state: RootState) => state.githubSearch;

export const selectGitHubUsers = createSelector(
  [selector],
  (state) => state?.users
);
export const selectGitHubLoading = createSelector(
  [selector],
  (state) => state?.loading
);
export const selectGitHubError = createSelector(
  [selector],
  (state) => state?.error
);

export const user = createSelector([selector], (state) => state?.user);

export const repos = createSelector([selector], (state) => state?.repos);

export const currentPage = createSelector(
  [selector],
  (state) => state?.currentPage
);
export const totalCount = createSelector(
  [selector],
  (state) => state?.totalCount
);

export const isDarkMode = createSelector(
  [selector],
  (state) => state?.isDarkMode
);

export default {
  selectGitHubError,
  selectGitHubLoading,
  selectGitHubUsers,
  repos,
  currentPage,
  totalCount,
  user,
  isDarkMode,
};

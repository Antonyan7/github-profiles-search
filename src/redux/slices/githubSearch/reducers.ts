import { SliceCaseReducers } from '@reduxjs/toolkit/src/createSlice';
import { IAction } from '@/src/redux/store';
import { GitHubRepo, GitHubSearchState, GitHubUser } from './initialState';

const createReducer = <T extends SliceCaseReducers<GitHubSearchState>>(
  reducer: T
) => ({ ...reducer });

const reducers = createReducer({
  setUsers(state: GitHubSearchState, action: IAction<GitHubUser[]>) {
    state.users = action.payload;
  },
  setLoading(state: GitHubSearchState, action: IAction<boolean>) {
    state.loading = action.payload;
  },
  setError(state: GitHubSearchState, action: IAction<string>) {
    state.error = action.payload;
  },
  setRepos(state, action: IAction<GitHubRepo[]>) {
    state.repos = action.payload;
  },
  setUser(state, action: IAction<GitHubUser | null>) {
    state.user = action.payload;
  },
  setReposLoading(state, action: IAction<boolean>) {
    state.reposLoading = action.payload;
  },
  setReposError(state, action: IAction<string>) {
    state.reposError = action.payload;
  },
  setTotalCount(state, action: IAction<number>) {
    state.totalCount = action.payload;
  },
  setCurrentPage(state, action: IAction<number>) {
    state.currentPage = action.payload;
  },
  setIsDarkMode(state, action: IAction<boolean>) {
    state.isDarkMode = action.payload;
  },
});

export default reducers;

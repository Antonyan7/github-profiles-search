import { AppDispatch } from '@/src/redux/store';
import slice from '@/src/redux/slices/githubSearch/slice';
import { githubManager } from '@/src/api';

const {
  setUsers,
  setReposLoading,
  setReposError,
  setRepos,
  setLoading,
  setUser,
  setCurrentPage,
  setError,
  setTotalCount,
} = slice.actions;

const fetchUsers =
  (query: string, page = 1) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(''));
      dispatch(setCurrentPage(page));
      if (query) {
        const res = await githubManager.searchUsers(query, page);
        dispatch(setUsers(res.data.items || []));
        dispatch(setTotalCount(res.data.total_count || 0));
      } else {
        dispatch(setUsers([]));
        dispatch(setTotalCount(0));
      }
    } catch (error) {
      dispatch(setError('Failed to fetch users.'));
      dispatch(setUsers([]));
    } finally {
      dispatch(setLoading(false));
    }
  };

const fetchUserRepos =
  (username: string, limit = 6) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setReposLoading(true));
      dispatch(setReposError(''));

      const res = await githubManager.getUserRepos(username, limit);
      const repos = res.data;

      dispatch(setRepos(repos));
    } catch (error) {
      dispatch(setReposError('Failed to fetch repositories.'));
      dispatch(setRepos([]));
    } finally {
      dispatch(setReposLoading(false));
    }
  };

const getUser = (username: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(''));

  try {
    const res = await githubManager.getUser(username);
    dispatch(setUser(res.data));
  } catch (error) {
    dispatch(setError('Failed to load user.'));
    dispatch(setUser(null));
  } finally {
    dispatch(setLoading(false));
  }
};

export default { fetchUsers, fetchUserRepos, getUser };

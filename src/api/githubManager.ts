import { AxiosInstance } from 'axios';

export const generateGitHubManager = (instance: AxiosInstance) => ({
  getUser(username: string) {
    return instance.get(`/users/${username}`);
  },
  getUserRepos(username: string, limit = 6) {
    return instance.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: limit,
      },
    });
  },
  searchUsers(query: string, page = 1, perPage = 12) {
    return instance.get('/search/users', {
      params: { q: query, page, per_page: perPage },
    });
  },
});

import { ThemeMode } from '@/src/enums';

export interface GitHubUser {
  login: string;
  avatar_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  updated_at: string;
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  company: string;
  location: string;
  blog: string;
  created_at: string;
  bio: string;
  followers: string;
  following: string;
  public_repos: string;
}

export interface GitHubSearchState {
  users: GitHubUser[];
  loading: boolean;
  error: string;
  repos: GitHubRepo[];
  reposLoading: boolean;
  user: GitHubUser | null;
  reposError: string;
  totalCount: number;
  currentPage: number;
  isDarkMode: boolean;
}

export const getInitialState = (): GitHubSearchState => ({
  users: [],
  user: null,
  loading: false,
  error: '',
  repos: [],
  reposLoading: false,
  reposError: '',
  totalCount: 0,
  currentPage: 1,
  isDarkMode:
    typeof window !== 'undefined' &&
    localStorage.getItem('dark-mode') === ThemeMode.DARK,
});

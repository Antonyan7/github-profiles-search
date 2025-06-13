'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '@/src/redux/hooks';
import {
  githubSearchMiddleware,
  githubSearchSelector,
} from '@/src/redux/slices/githubSearch';
import PaginationControls from '@/src/components/shared/PaginationControls';
import { Input } from '@/src/components/ui/Input';
import Loader from '@/src/components/Icons/Loader';
import GitHubUserList from '@/src/components/user/GithubUserList';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const totalCount = useSelector(githubSearchSelector.totalCount);
  const currentPage = useSelector(githubSearchSelector.currentPage);
  const users = useSelector(githubSearchSelector.selectGitHubUsers);
  const loading = useSelector(githubSearchSelector.selectGitHubLoading);
  const error = useSelector(githubSearchSelector.selectGitHubError);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(githubSearchMiddleware.fetchUsers(query.trim()));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <main className="min-h-screen p-6 bg-white text-gray-900 dark:bg-black dark:text-white transition-colors">
      <div className="flex flex-col items-center">
        <div className="max-w-xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">
            GitHub Profile Viewer
          </h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GitHub username"
            className="w-full p-3 mb-4 border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        {loading && (
          <div className="text-gray-500 dark:text-gray-400 mt-4">
            <Loader />
          </div>
        )}
        {users?.length ? (
          <GitHubUserList users={users} />
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            There is no data
          </p>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {totalCount ? (
        <PaginationControls
          currentPage={currentPage}
          totalCount={totalCount}
          onPageChange={(page) =>
            dispatch(githubSearchMiddleware.fetchUsers(query, page))
          }
        />
      ) : null}
    </main>
  );
}

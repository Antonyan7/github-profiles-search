'use client';
import { useEffect, useState } from 'react';
import { dispatch } from '@/src/redux/hooks';
import { useSelector } from 'react-redux';
import {
  githubSearchMiddleware,
  githubSearchSelector,
} from '@/src/redux/slices/githubSearch';
import PaginationControls from '@/src/components/PaginationControls/PaginationControls';
import { Input } from '@/src/components/ui/input';
import Loader from '@/src/components/Icons/Loader';
import GitHubUserList from '@/src/components/GithubUserList/GithubUserList';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const isDark = useSelector(githubSearchSelector.isDarkMode);

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
    <main className="text-gray-900 min-h-screen dark:text-white p-6">
      <div className="flex flex-col items-center">
        <div className="max-w-xl w-full">
          <h1
            className={cn(
              `text-3xl font-bold mb-6 text-center`,
              isDark ? 'text-white' : 'text-black'
            )}
          >
            GitHub Profile Viewer
          </h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search GitHub username"
            className={cn(
              `w-full border border-gray-400 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500`,
              isDark
                ? 'placeholder:text-gray'
                : 'text-black placeholder:text-black'
            )}
          />
        </div>

        {loading && (
          <div className="text-gray-500 mt-4">
            <Loader />
          </div>
        )}
        {users?.length ? (
          <GitHubUserList users={users} />
        ) : (
          <p className="text-gray-500 mt-4">There is no data</p>
        )}
        {error ? <p className="text-red-500 mt-4">{error}</p> : null}
      </div>
      {users?.length ? (
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

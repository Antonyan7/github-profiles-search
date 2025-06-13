'use client';

import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  githubSearchMiddleware,
  githubSearchSelector,
} from '@/src/redux/slices/githubSearch';
import { dispatch } from '@/src/redux/hooks';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const user = useSelector(githubSearchSelector.user);
  const repos = useSelector(githubSearchSelector.repos);

  useEffect(() => {
    if (username) {
      dispatch(githubSearchMiddleware.getUser(username));
      dispatch(githubSearchMiddleware.fetchUserRepos(username));
    }
  }, [username]);

  if (!user)
    return (
      <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
        User not found.
      </div>
    );

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white p-6 transition-colors">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors">
        <div className="flex items-center gap-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">@{user.login}</p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{user.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm mt-3 text-gray-500 dark:text-gray-400">
              {user.company && <span>🏢 {user.company}</span>}
              {user.location && <span>📍 {user.location}</span>}
              {user?.blog && (
                <a
                  href={
                    user?.blog.startsWith('http')
                      ? user.blog
                      : `https://${user?.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600 dark:text-blue-400"
                >
                  🔗 {user?.blog.replace(/^https?:\/\//, '')}
                </a>
              )}
              <span>
                📅 Joined {dayjs(user?.created_at).format('MMMM D, YYYY')}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900 transition-colors">
            <p className="text-xl font-bold text-blue-600 dark:text-blue-300">
              {user?.followers.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Followers
            </p>
          </div>
          <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900 transition-colors">
            <p className="text-xl font-bold text-green-600 dark:text-green-300">
              {user?.following}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Following
            </p>
          </div>
          <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900 transition-colors">
            <p className="text-xl font-bold text-purple-600 dark:text-purple-300">
              {user?.public_repos}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Public Repos
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 max-w-3xl mx-auto">
        <h1 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">
          Few Popular Repositories
        </h1>

        <div className="space-y-4">
          {repos?.map((repo) => (
            <div
              key={repo.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition-colors"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                {repo.name}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {repo.description || 'No description'}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-3">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    {repo.language}
                  </span>
                )}
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                <span>
                  📅 Updated {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

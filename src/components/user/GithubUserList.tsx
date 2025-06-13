import { useRouter } from 'next/navigation';

interface Props {
  users: { login: string; avatar_url: string }[];
}

export default function GitHubUserList({ users }: Props) {
  const router = useRouter();

  return (
    <div className="md:grid flex flex-col grid-cols-12 gap-4 w-full mt-6">
      {users.map((user) => (
        <div
          key={user.login}
          onClick={() => router.push(`/profile/${user.login}`)}
          className="flex items-center col-span-4 gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-12 h-12 rounded-full"
          />
          <span className="font-medium">{user.login}</span>
        </div>
      ))}
    </div>
  );
}

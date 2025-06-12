import { generateGitHubManager } from './githubManager';
import { githubApi } from '@/src/api/axios';

export const githubManager = generateGitHubManager(githubApi);

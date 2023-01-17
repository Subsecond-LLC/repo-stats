const GITHUB_CLIENT_ID = '726814fd13cb9d417f4b';

export default function getOauthURL(repo: string) {
  return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo&type=user_agent&redirect_uri=https://stats.subsecond.app/${repo}`;
}

export const GITHUB_API_ROOT = 'https://api.github.com';

export default async function fetchGithubAPI<T>(
  endpoint: string,
  options?: {
    method?: string;
    body?: Object;
  }
): Promise<T> {
  const { method, body } = options ?? {};

  const bearerToken = localStorage.getItem('bearerToken');
  const githubName = localStorage.getItem('githubName');

  const response = await fetch(
    `${GITHUB_API_ROOT}${endpoint.replace(/\{username\}/g, githubName ?? '')}`,
    {
      method: method ?? 'GET',
      body: body == null ? undefined : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(bearerToken != null && {
          Authorization: `Bearer ${bearerToken}`,
        }),
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

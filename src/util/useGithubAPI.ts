import { useState, useEffect } from 'react';

export const GITHUB_API_ROOT = 'https://api.github.com';

export default function useGithubAPI<T>(
  endpoint: string,
  options?: {
    method?: string;
    body?: Object;
    skip?: boolean;
  }
): [null | T, { loading: boolean; error: null | Error }] {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const [result, setResult] = useState<null | any>(null);

  const { method, body, skip } = options ?? {};

  const bearerToken = localStorage.getItem('bearerToken');
  const githubName = localStorage.getItem('githubName');

  useEffect(() => {
    (async () => {
      if (skip) return;

      setLoading(true);
      const response = await fetch(
        `${GITHUB_API_ROOT}${endpoint.replace(
          /\{username\}/g,
          githubName ?? ''
        )}`,
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
      setLoading(false);
      if (!response.ok) {
        console.log(response.statusText);
        setError(new Error(response.statusText));
        return;
      }

      setResult(await response.json());
    })();
  }, [endpoint, skip]);

  return [result, { loading, error }];
}

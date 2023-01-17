import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function useQueryParams<
  T extends { [k: string]: string | undefined }
>(): T {
  const { search } = useLocation();

  // slight type coercing here to trust T
  return useMemo(
    () => Object.fromEntries(new URLSearchParams(search).entries()),
    [search]
  ) as T;
}

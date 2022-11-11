import React from "react";
import { FIREBASE_HEADERS } from "../constants/Firebase";

export const useFetchPost = (url: string): CustomFetchPostOutput<any> => {
  const loadComponent = React.useRef<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error>();
  const [data, setData] = React.useState<any>();

  const call = React.useMemo(() => {
    return async (body?: string) => {
      return new Promise((resolve, reject) => {
        setLoading(() => true);
        fetch(url, {
          method: "POST",
          headers: FIREBASE_HEADERS,
          body,
        })
          .then((response) => {
            response.json().then((res) => {
              setLoading(() => false);
              setData(() => res);
              resolve(res);
            });
          })
          .catch((err) => {
            setLoading(() => false);
            setError(() => err);
            reject(err);
          });
      });
    };
  }, []);

  React.useEffect(() => {
    loadComponent.current = true;
    return () => {
      loadComponent.current = false;
    };
  }, []);

  return [
    call,
    {
      error,
      data,
      loading,
    },
  ];
};

export type CustomFetchPostCall = (body?: string) => void;
export type CustomFetchPostRequest<T> = {
  error: Error | undefined;
  data: T;
  loading: boolean;
};
export type CustomFetchPostOutput<T> = [
  CustomFetchPostCall,
  CustomFetchPostRequest<T>
];

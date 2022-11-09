import React from "react";
import {
  ApolloCache,
  ApolloError,
  ApolloQueryResult,
  DefaultContext,
  DocumentNode,
  ErrorPolicy,
  FetchPolicy,
  FetchResult,
  MutationOptions,
  Observable,
  Observer,
  OperationVariables,
  QueryOptions,
  SubscriptionOptions,
  TypedDocumentNode,
} from "@apollo/client";
import { GraphQLErrorExtensions } from "graphql";
import { CustomApolloContext } from "./provider";
import {
  MutationBaseOptions,
  MutationFetchPolicy,
} from "@apollo/client/core/watchQueryOptions";

export const useCustomQuery = (config: IRequest): CustomQueryOutput<any> => {
  const loadComponent = React.useRef<boolean>(false);
  const { client } = React.useContext(CustomApolloContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ApolloServiceError>();
  const [data, setData] = React.useState<any>();

  const clientQuery = React.useMemo(() => {
    return client.query;
  }, [client.query]);

  const call = React.useCallback(
    (options?: CustomQueryOptions) => {
      const handleError = (err: ApolloServiceError) => {
        if (loadComponent.current) {
          setError(() => parseError(err));
          setLoading(() => false);
        }
      };

      setLoading(() => true);
      clientQuery({
        ...{
          fetchPolicy: "no-cache",
          ...options,
        },
        query: config.gql,
      })
        .then((res: any) => {
          resultQuery(res.data[config.name])
            .then((data: any) => {
              if (loadComponent.current) {
                setData(() => data);
                setLoading(() => false);
              }
            })
            .catch(handleError);
        })
        .catch(handleError);
    },
    [clientQuery, config]
  );

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
      clientQuery,
    },
  ];
};

export const useCustomQueryPagination = (
  config: IRequest
): CustomQueryPaginationOutput<any[]> => {
  const [get, request] = useCustomQuery(config);
  const [history, setHistory] = React.useState<any[][]>([]);
  const [allData, setAllData] = React.useState<any[]>([]);

  const data = React.useMemo(() => {
    return history.length ? history[history.length - 1] : [];
  }, [history]);

  const reset = React.useMemo(() => {
    return () => {
      setHistory(() => []);
      setAllData(() => []);
    };
  }, []);

  React.useEffect(() => {
    if (request.data.length) {
      setHistory((v) => [...v, request.data]);
      setAllData((v) => [...v, ...request.data]);
    }
  }, [request.data]);

  return [
    get,
    {
      ...request,
      data,
      allData,
      history,
      reset,
    },
  ];
};

export const useCustomMutation = (
  config: IRequest
): CustomMutationOutput<any> => {
  const loadComponent = React.useRef<boolean>(false);
  const { client } = React.useContext(CustomApolloContext);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<ApolloServiceError>();
  const [data, setData] = React.useState<any>();

  const clientMutate = React.useMemo(() => {
    return client.mutate;
  }, [client.mutate]);

  const call = React.useCallback(
    (options?: CustomMutationOptions) => {
      const handleError = (err: ApolloServiceError) => {
        if (loadComponent.current) {
          setError(() => parseError(err));
          setLoading(() => false);
        }
      };

      setLoading(() => true);
      clientMutate({
        ...{
          fetchPolicy: "no-cache",
          ...options,
        },
        mutation: config.gql,
      })
        .then((res: any) => {
          resultQuery(res.data[config.name])
            .then((data: any) => {
              if (loadComponent.current) {
                setData(() => data);
                setLoading(() => false);
              }
            })
            .catch(handleError);
        })
        .catch(handleError);
    },
    [clientMutate, config]
  );

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
      clientMutate,
    },
  ];
};

export const useCustomSubscription = (
  config: IRequest
): CustomSubscriptionOutput => {
  const loadComponent = React.useRef<boolean>(false);
  const { client } = React.useContext(CustomApolloContext);
  const [error, setError] = React.useState<ApolloServiceError>();
  const subscription = React.useRef<{
    unsubscribe: () => any;
    closed: boolean;
  }>({
    unsubscribe: () => {},
    closed: false,
  });

  const clientSubscribe = React.useMemo(() => {
    return client.subscribe;
  }, [client.subscribe]);

  const call = React.useCallback(
    (options: CustomSubscriptionOptions) => {
      const handleError = (err: any | Error) => {
        if (options.error && loadComponent.current) {
          options.error(err);
          setError(() => err);
        }
        subscription.current.unsubscribe();
      };

      const handleNext = (result: any) => {
        if (
          result?.data &&
          result?.data[config.name] &&
          options.next &&
          loadComponent.current
        ) {
          options.next(result?.data[config.name]);
        } else {
          handleError(
            new Error(
              `Ocurrió un error al recibir los datos de la subscripción ${config.name}`
            )
          );
        }
      };

      subscription.current = clientSubscribe({
        ...{
          fetchPolicy: "no-cache",
          ...options,
        },
        query: config.gql,
      }).subscribe({
        ...options,
        next: handleNext,
        error: handleError,
      });
    },
    [clientSubscribe, config]
  );

  React.useEffect(() => {
    loadComponent.current = true;
    return () => {
      loadComponent.current = false;
      subscription.current.unsubscribe();
    };
  }, []);

  return [
    call,
    {
      subscription,
      clientSubscribe,
      error,
    },
  ];
};

export interface CustomQueryOptions<
  TVariables = OperationVariables,
  TData = any
> {
  query?: DocumentNode | TypedDocumentNode<TData, TVariables>;
  variables?: TVariables;
  errorPolicy?: ErrorPolicy;
  context?: any;
  fetchPolicy?: FetchPolicy;
  pollInterval?: number;
  notifyOnNetworkStatusChange?: boolean;
  returnPartialData?: boolean;
  partialRefetch?: boolean;
  canonizeResults?: boolean;
}
export type CustomQueryCall = (options?: CustomQueryOptions) => void;
export type CustomQueryRequest<T> = {
  error: ApolloServiceError | undefined;
  data: T;
  loading: boolean;
  clientQuery: <T = any, TVariables = OperationVariables>(
    options: QueryOptions<TVariables, T>
  ) => Promise<ApolloQueryResult<T>>;
};
export type CustomQueryOutput<T> = [CustomQueryCall, CustomQueryRequest<T>];

export type CustomQueryPaginationRequest<T> = CustomQueryRequest<T> & {
  allData: T[];
  history: T[][];
  reset: () => void;
};
export type CustomQueryPaginationOutput<T> = [
  CustomQueryCall,
  CustomQueryPaginationRequest<T>
];

export interface CustomMutationOptions<
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
> extends MutationBaseOptions<TData, TVariables, TContext, TCache> {
  mutation?: DocumentNode | TypedDocumentNode<TData, TVariables>;
  fetchPolicy?: MutationFetchPolicy;
  keepRootFields?: boolean;
}
export type CustomMutationCall = (options?: CustomMutationOptions) => void;
export type CustomMutationRequest<T> = {
  error: ApolloServiceError | undefined;
  data: T;
  loading: boolean;
  clientMutate<
    TData = any,
    TVariables = OperationVariables,
    TContext = DefaultContext
  >(
    options: MutationOptions<TData, TVariables, TContext>
  ): Promise<FetchResult<TData>>;
};
export type CustomMutationOutput<T> = [
  CustomMutationCall,
  CustomMutationRequest<T>
];

export interface CustomSubscriptionOptions<
  TVariables = OperationVariables,
  TData = any
> extends Observer<any> {
  query?: DocumentNode | TypedDocumentNode<TData, TVariables>;
  variables?: TVariables;
  fetchPolicy?: FetchPolicy;
  errorPolicy?: ErrorPolicy;
  context?: DefaultContext;
}
export type CustomSubscriptionCall = (
  options: CustomSubscriptionOptions
) => void;
export type CustomSubscriptionRequest = {
  subscription: React.MutableRefObject<{
    unsubscribe: () => any;
    closed: boolean;
  }>;
  error: ApolloServiceError | undefined;
  clientSubscribe<T = any, TVariables = OperationVariables>(
    options: SubscriptionOptions<TVariables, T>
  ): Observable<FetchResult<T>>;
};
export type CustomSubscriptionOutput = [
  CustomSubscriptionCall,
  CustomSubscriptionRequest
];

export interface IRequestError {
  status: boolean;
  error_code: string;
  message: string;
}

export interface IRequest {
  name: string;
  gql: DocumentNode;
}

export type ApolloServiceError = ApolloError & GraphQLErrorExtensions & Error;

const parseError = (err: ApolloServiceError) => {
  const extensions = err.graphQLErrors.length
    ? err.graphQLErrors[0]?.extensions
    : undefined;
  return { ...err, ...extensions };
};

const resultQuery = async (
  data: any,
  unions?: boolean
): Promise<any | any[]> => {
  return new Promise((resolve, reject) => {
    const result = async (
      responseQuery: any,
      success: Function,
      error: Function
    ) => {
      try {
        const response: any | any[] = responseQuery;

        if (Array.isArray(response) && !response.length) {
          success(response);
        } else if (!response) {
          success(response);
        } else {
          if (unions) {
            const typename: any =
              Array.isArray(response) && response.length
                ? response[0]?.__typename
                : response?.__typename;
            if (!typename) {
              error({
                status: false,
                error_code: null,
                message: 'Error: data incorrecta pasado a "resultQuery".',
              });
            } else if (typename && typename === "ResultError") {
              if (Array.isArray(response) && response.length) {
                error({
                  status: response[0].status,
                  error_code: response[0].error_code,
                  message: response[0].message,
                });
              } else {
                error({
                  status: response.status,
                  error_code: response.error_code,
                  message: response.message,
                });
              }
            } else {
              success(response);
            }
          } else {
            success(response);
          }
        }
      } catch (err: any) {
        error({
          status: false,
          error_code: null,
          message: err.message,
        });
      }
    };
    result(
      data,
      (success: any) => {
        return resolve(success);
      },
      (err: IRequestError) => {
        return reject(err);
      }
    );
  });
};

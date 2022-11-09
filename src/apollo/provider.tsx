import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import ApolloLinkTimeout from "apollo-link-timeout";

const timeoutLink = new ApolloLinkTimeout(300000);

const context: {
  client: ApolloClient<NormalizedCacheObject>;
} = {
  client: null as any,
};

export const CustomApolloContext = React.createContext(context);

export interface CustomApolloProviderProps {
  children?: any;
  uri: string;
  wssUri?: string;
  token?: string;
}

export const CustomApolloProvider: React.FC<CustomApolloProviderProps> = (
  props
) => {
  const { uri, wssUri, token } = props;

  const authLink = React.useMemo(() => {
    return setContext((_, { headers }) => {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
  }, [token]);

  const timeoutHttpLink = React.useMemo(
    () =>
      timeoutLink.concat(
        createUploadLink({
          uri,
        })
      ),
    [uri]
  );

  /**
   * 
   *  const wsLink = new WebSocketLink(
        new SubscriptionClient(backendWSUrl, {
          reconnect: true,
          minTimeout: 1000,
          timeout: 300000,
          connectionParams: {
            Authorization: `Bearer ${token || null}`,
          },
        }),
      );
   */
  const wsLink = React.useMemo(
    () =>
      wssUri
        ? new WebSocketLink({
            uri: wssUri,
            options: {
              reconnect: true,
              connectionParams: {
                Authorization: token ? `Bearer ${token}` : "",
              },
            },
          })
        : undefined,
    [wssUri, token]
  );

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = React.useMemo(
    () =>
      wsLink
        ? split(
            ({ query }) => {
              const definition = getMainDefinition(query);
              return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
              );
            },
            wsLink,
            timeoutHttpLink
          )
        : timeoutHttpLink,
    [timeoutHttpLink, wsLink]
  );

  const client = React.useMemo(
    () =>
      new ApolloClient({
        link: authLink.concat(splitLink),
        cache: new InMemoryCache(),
      }),
    [authLink, splitLink]
  );

  return (
    <CustomApolloContext.Provider value={{ client }}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </CustomApolloContext.Provider>
  );
};

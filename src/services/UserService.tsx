import React from "react";
import { Mutation, Query } from "../apollo/GraphQL";
import {
  CustomMutationOutput,
  CustomQueryOutput,
  useCustomMutation,
  useCustomQuery,
} from "../apollo/hooks";
import {
  FIREBASE_URL_API_LOGIN,
  FIREBASE_URL_API_SIGNUP,
} from "../constants/Firebase";
import { IUser } from "../store/UserStore";
import { CustomFetchPostOutput, useFetchPost } from "./CustomFetch";

export const useLoginFirebaseUserService = (): CustomFetchPostOutput<IUser> => {
  const [login, request] = useFetchPost(FIREBASE_URL_API_LOGIN);
  return [login, request];
};

export const useSignupFirebaseUserService = (): CustomFetchPostOutput<any> => {
  const [signup, request] = useFetchPost(FIREBASE_URL_API_SIGNUP);
  return [signup, request];
};

export const useLoginUserService = (): CustomMutationOutput<any> => {
  const [login, request] = useCustomMutation(Mutation.login);

  const data: any = React.useMemo(() => {
    try {
      return Array.isArray(request.data?.login)
        ? request.data.login
        : undefined;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [request.data]);

  return [
    login,
    {
      ...request,
      data,
    },
  ];
};

export const useCurrentUserService = (): CustomQueryOutput<any> => {
  const [currentUser, request] = useCustomQuery(Query.currentUser);

  const data: any = React.useMemo(() => {
    try {
      return Array.isArray(request.data?.currentUser)
        ? request.data.currentUser
        : undefined;
    } catch (err) {
      console.error(err);
      return [];
    }
  }, [request.data]);

  return [
    currentUser,
    {
      ...request,
      data,
    },
  ];
};

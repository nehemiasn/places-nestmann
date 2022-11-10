import React from "react";
import { Mutation, Query } from "../apollo/GraphQL";
import {
  CustomMutationOutput,
  CustomQueryOutput,
  useCustomMutation,
  useCustomQuery,
} from "../apollo/hooks";
import { Ipayload, IUser } from "../store/User";

export const useSignupUserService = (): CustomMutationOutput<Ipayload> => {
  const [signup, request] = useCustomMutation(Mutation.signup);
  return [signup, request];
};

export const useLoginUserService = (): CustomMutationOutput<Ipayload> => {
  const [login, request] = useCustomMutation(Mutation.login);
  return [login, request];
};

export const useCurrentUserService = (): CustomQueryOutput<IUser> => {
  const [currentUser, request] = useCustomQuery(Query.currentUser);
  return [currentUser, request];
};

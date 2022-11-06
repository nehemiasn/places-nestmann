import React from "react";
import {
  FIREBASE_URL_API_LOGIN,
  FIREBASE_URL_API_SIGNUP,
} from "../constants/Firebase";
import { IUser } from "../store/UserStore";
import { CustomFetchPostOutput, useFetchPost } from "./CustomFetch";

export const useLoginService = (): CustomFetchPostOutput<IUser> => {
  const [login, request] = useFetchPost(FIREBASE_URL_API_LOGIN);
  return [login, request];
};

export const useSignupService = (): CustomFetchPostOutput<any> => {
  const [signup, request] = useFetchPost(FIREBASE_URL_API_SIGNUP);
  return [signup, request];
};

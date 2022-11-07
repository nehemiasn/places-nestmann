import {
  FIREBASE_HEADERS,
  FIREBASE_URL_API_LOGIN,
  FIREBASE_URL_API_SIGNUP,
} from "../../constants/Firebase";
import { authTypes } from "../types/auth.types";

const { SIGNUP, LOGIN } = authTypes;

export const signup = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(FIREBASE_URL_API_SIGNUP, {
        method: "POST",
        headers: FIREBASE_HEADERS,
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const result = await response.json();

      dispatch({
        type: SIGNUP,
        payload: result,
      });
    } catch (err) {
      // log
      console.error(err);
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(FIREBASE_URL_API_LOGIN, {
        method: "POST",
        headers: FIREBASE_HEADERS,
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      const result = await response.json();

      dispatch({
        type: LOGIN,
        payload: result,
      });
    } catch (err) {
      // log
      console.error(err);
    }
  };
};

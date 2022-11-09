import {
  LOGIN,
  SIGNUP,
  LOGIN_FACEBOOK,
  LOGIN_GOOGLE,
  SIGNUP_FACEBOOK,
  SIGNUP_GOOGLE,
  DELETE_FACEBOOK,
  DELETE_GOOGLE,
  UPDATE_ONE_USER,
  ASSOCIATE_GOOGLE_ACCOUNT,
  ASSOCIATE_FACEBOOK_ACCOUNT,
  SEND_EMAIL_VERIFICATION_CODE,
  VERIFY_EMAIL_CODE,
  RESET_PASSWORD,
  LOGOUT,
  DELETE_PICTURE_URL,
  DELETE_PHONE,
  DELETE_EMAIL,
  REFRESH_TOKEN,
  VERIFY_PHONE_CODE,
  SEND_PHONE_VERIFICATION_CODE,
} from "./UserMutation";
import { CREATE_ONE_PLACE } from "./PlaceMutation";
export const Mutation = {
  login: { name: "login", gql: LOGIN },
  signup: { name: "signup", gql: SIGNUP },
  loginGoogle: { name: "loginGoogle", gql: LOGIN_GOOGLE },
  loginFacebook: { name: "loginFacebook", gql: LOGIN_FACEBOOK },
  signupGoogle: { name: "signupGoogle", gql: SIGNUP_GOOGLE },
  signupFacebook: { name: "signupFacebook", gql: SIGNUP_FACEBOOK },
  deleteGoogle: { name: "deleteGoogle", gql: DELETE_GOOGLE },
  deleteFacebook: { name: "deleteFacebook", gql: DELETE_FACEBOOK },
  updateOneUser: { name: "updateOneUser", gql: UPDATE_ONE_USER },
  associateGoogleAccount: {
    name: "associateGoogleAccount",
    gql: ASSOCIATE_GOOGLE_ACCOUNT,
  },
  associateFacebookAccount: {
    name: "associateFacebookAccount",
    gql: ASSOCIATE_FACEBOOK_ACCOUNT,
  },
  sendEmailVerificationCode: {
    name: "sendEmailVerificationCode",
    gql: SEND_EMAIL_VERIFICATION_CODE,
  },
  verifyEmailCode: {
    name: "verifyEmailCode",
    gql: VERIFY_EMAIL_CODE,
  },
  sendPhoneVerificationCode: {
    name: "sendPhoneVerificationCode",
    gql: SEND_PHONE_VERIFICATION_CODE,
  },
  verifyPhoneCode: {
    name: "verifyPhoneCode",
    gql: VERIFY_PHONE_CODE,
  },
  resetPassword: {
    name: "resetPassword",
    gql: RESET_PASSWORD,
  },
  logout: {
    name: "logout",
    gql: LOGOUT,
  },
  deletePictureUrl: {
    name: "deletePictureUrl",
    gql: DELETE_PICTURE_URL,
  },
  deletePhone: {
    name: "deletePhone",
    gql: DELETE_PHONE,
  },
  deleteEmail: {
    name: "deleteEmail",
    gql: DELETE_EMAIL,
  },
  refreshToken: {
    name: "refreshToken",
    gql: REFRESH_TOKEN,
  },
  createOnePlace: {
    name: "createOnePlace",
    gql: CREATE_ONE_PLACE,
  },
};

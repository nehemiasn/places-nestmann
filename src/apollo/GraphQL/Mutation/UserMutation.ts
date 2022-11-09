import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const SIGNUP = gql`
  mutation signup($data: SignupInput!) {
    signup(data: $data) {
      ...FAuthPayload
    }
  }
  ${FragmentService.AuthPayload}
`;

export const LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      ...FAuthPayload
    }
  }
  ${FragmentService.AuthPayload}
`;

export const LOGIN_GOOGLE = gql`
  mutation loginGoogle($data: LoginGoogleInput!) {
    loginGoogle(data: $data) {
      ...FAuthPayload
    }
  }
  ${FragmentService.AuthPayload}
`;

export const LOGIN_FACEBOOK = gql`
  mutation loginFacebook($data: LoginFacebookInput!) {
    loginFacebook(data: $data) {
      ...FAuthPayload
    }
  }
  ${FragmentService.AuthPayload}
`;

export const SIGNUP_GOOGLE = gql`
  mutation signupGoogle($data: SignupGoogleInput!) {
    signupGoogle(data: $data) {
      email
      firstName
      lastName
      googleId
      facebookId
    }
  }
`;

export const SIGNUP_FACEBOOK = gql`
  mutation signupFacebook($data: SignupFacebookInput!) {
    signupFacebook(data: $data) {
      email
      firstName
      lastName
      googleId
      facebookId
    }
  }
`;

export const ASSOCIATE_GOOGLE_ACCOUNT = gql`
  mutation associateGoogleAccount($data: SignupGoogleInput!) {
    associateGoogleAccount(data: $data) {
      ...FAuthPayload
    }
  }
  ${FragmentService.AuthPayload}
`;

export const ASSOCIATE_FACEBOOK_ACCOUNT = gql`
  mutation associateFacebookAccount($data: SignupFacebookInput!) {
    associateFacebookAccount(data: $data) {
      ...FAuthPayload
    }
  }
  ${FragmentService.AuthPayload}
`;

export const DELETE_GOOGLE = gql`
  mutation deleteGoogle {
    deleteGoogle
  }
`;

export const DELETE_FACEBOOK = gql`
  mutation deleteFacebook {
    deleteFacebook
  }
`;

export const UPDATE_ONE_USER = gql`
  mutation updateOneUser($data: UserUpdateInput!) {
    updateOneUser(data: $data) {
      ...FUser
    }
  }
  ${FragmentService.User}
`;

export const SEND_EMAIL_VERIFICATION_CODE = gql`
  mutation sendEmailVerificationCode($data: sendEmailVerificationCodeInput!) {
    sendEmailVerificationCode(data: $data)
  }
`;

export const VERIFY_EMAIL_CODE = gql`
  mutation verifyEmailCode($data: verifyEmailCodeInput!) {
    verifyEmailCode(data: $data)
  }
`;

export const SEND_PHONE_VERIFICATION_CODE = gql`
  mutation sendPhoneVerificationCode($data: sendPhoneVerificationCodeInput!) {
    sendPhoneVerificationCode(data: $data)
  }
`;

export const VERIFY_PHONE_CODE = gql`
  mutation verifyPhoneCode($data: verifyPhoneCodeInput!) {
    verifyPhoneCode(data: $data)
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($data: resetPasswordInput!) {
    resetPassword(data: $data)
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const DELETE_PICTURE_URL = gql`
  mutation deletePictureUrl {
    deletePictureUrl
  }
`;

export const DELETE_PHONE = gql`
  mutation deletePhone {
    deletePhone
  }
`;

export const DELETE_EMAIL = gql`
  mutation deleteEmail {
    deleteEmail
  }
`;

export const REFRESH_TOKEN = gql`
  mutation refreshToken($data: LoginRefreshTokenInput!) {
    refreshToken(data: $data) {
      ...FAuthPayload
    }
  }
  ${FragmentService.AuthPayload}
`;

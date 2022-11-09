import { gql } from "@apollo/client";

export const FragmentService = () => {};

FragmentService.User = gql`
  fragment FUser on User {
    id
    firstName
    lastName
    email
  }
`;

FragmentService.AuthPayload = gql`
  fragment FAuthPayload on AuthPayload {
    userId
    accessToken
    refreshToken
    expiration
  }
`;

FragmentService.PlaceType = gql`
  fragment FPlaceType on PlaceType {
    id
    name
  }
`;

FragmentService.PlaceState = gql`
  fragment FPlaceState on PlaceState {
    id
    name
  }
`;

FragmentService.PlaceFile = gql`
  fragment FPlaceFile on PlaceFile {
    id
    fileName
  }
`;

FragmentService.Place = gql`
  fragment FPlace on Place {
    id
    requestType {
      ...FPlaceType
    }
    requestFile {
      ...FPlaceFile
    }
  }
  ${FragmentService.PlaceType}
  ${FragmentService.PlaceFile}
`;

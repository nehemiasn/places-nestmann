import { gql } from "@apollo/client";

export const FragmentService = () => {};

FragmentService.User = gql`
  fragment FUser on User {
    id
    firstName
    lastName
    email
    imageUrl
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
    description
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
    placeType {
      ...FPlaceType
    }
    placeFile {
      ...FPlaceFile
    }
  }
  ${FragmentService.PlaceType}
  ${FragmentService.PlaceFile}
`;

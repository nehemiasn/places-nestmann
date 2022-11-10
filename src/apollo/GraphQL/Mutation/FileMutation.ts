import { gql } from "@apollo/client";

export const GET_ONE_FILE = gql`
  mutation getOneFile($data: ImportDataFileInput!) {
    getOneFile(data: $data)
  }
`;

export const UPLOAD_ONE_PLACE_FILE = gql`
  mutation uploadOnePlaceFile($data: PlaceFileUploadInput!) {
    uploadOnePlaceFile(data: $data) {
      id
    }
  }
`;

export const DELETE_ONE_PLACE_FILE = gql`
  mutation deleteOnePlaceFile($data: PlaceFileWhereUniqueInput!) {
    deleteOnePlaceFile(data: $data) {
      id
    }
  }
`;

export const UPLOAD_FILE_USER = gql`
  mutation uploadFileUser($data: UploadFileUserInput!) {
    uploadFileUser(data: $data)
  }
`;

import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const PLACE_FILE = gql`
  query placeFile($where: PlaceFileWhereUniqueInput!) {
    placeFile(where: $where) {
      ...FPlaceFile
    }
  }
  ${FragmentService.PlaceFile}
`;

export const PLACE_FILES = gql`
  query placeFiles(
    $where: PlaceFileWhereInput
    $orderBy: [PlaceFileOrderByWithRelationInput]
    $cursor: PlaceFileWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [PlaceFileScalarFieldEnum]
  ) {
    placeFiles(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...FPlaceFile
    }
  }
  ${FragmentService.PlaceFile}
`;

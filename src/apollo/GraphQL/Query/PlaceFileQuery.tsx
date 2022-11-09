import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const PLACE_FILE = gql`
  query requestFile($where: PlaceFileWhereUniqueInput!) {
    requestFile(where: $where) {
      ...FPlaceFile
    }
  }
  ${FragmentService.PlaceFile}
`;

export const PLACE_FILES = gql`
  query requestFiles(
    $where: PlaceFileWhereInput
    $orderBy: [PlaceFileOrderByWithRelationInput]
    $cursor: PlaceFileWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [PlaceFileScalarFieldEnum]
  ) {
    requestFiles(
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

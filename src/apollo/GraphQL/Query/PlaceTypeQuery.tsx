import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const PLACE_TYPE = gql`
  query requestType($where: PlaceTypeWhereUniqueInput!) {
    requestType(where: $where) {
      ...FPlaceType
    }
  }
  ${FragmentService.PlaceType}
`;

export const PLACE_TYPES = gql`
  query requestTypes(
    $where: PlaceTypeWhereInput
    $orderBy: [PlaceTypeOrderByWithRelationInput]
    $cursor: PlaceTypeWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [PlaceTypeScalarFieldEnum]
  ) {
    requestTypes(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...FPlaceType
    }
  }
  ${FragmentService.PlaceType}
`;

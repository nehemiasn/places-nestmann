import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const PLACE_TYPE = gql`
  query placeType($where: PlaceTypeWhereUniqueInput!) {
    placeType(where: $where) {
      ...FPlaceType
    }
  }
  ${FragmentService.PlaceType}
`;

export const PLACE_TYPES = gql`
  query placeTypes(
    $where: PlaceTypeWhereInput
    $orderBy: [PlaceTypeOrderByWithRelationInput]
    $cursor: PlaceTypeWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [PlaceTypeScalarFieldEnum]
  ) {
    placeTypes(
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

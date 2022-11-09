import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const PLACE_STATE = gql`
  query requestState($where: PlaceStateWhereUniqueInput!) {
    requestState(where: $where) {
      ...FPlaceState
    }
  }
  ${FragmentService.PlaceState}
`;

export const PLACE_STATES = gql`
  query requestStates(
    $where: PlaceStateWhereInput
    $orderBy: [PlaceStateOrderByWithRelationInput]
    $cursor: PlaceStateWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [PlaceStateScalarFieldEnum]
  ) {
    requestStates(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...FPlaceState
    }
  }
  ${FragmentService.PlaceState}
`;

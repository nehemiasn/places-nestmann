import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const PLACE = gql`
  query request($where: PlaceWhereUniqueInput!) {
    request(where: $where) {
      ...FPlace
    }
  }
  ${FragmentService.Place}
`;

export const PLACES = gql`
  query requests(
    $where: PlaceWhereInput
    $orderBy: [PlaceOrderByWithRelationInput]
    $cursor: PlaceWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [PlaceScalarFieldEnum]
  ) {
    requests(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...FPlace
    }
  }
  ${FragmentService.Place}
`;

import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const PLACE = gql`
  query place($where: PlaceWhereUniqueInput!) {
    place(where: $where) {
      ...FPlace
    }
  }
  ${FragmentService.Place}
`;

export const PLACES = gql`
  query places(
    $where: PlaceWhereInput
    $orderBy: [PlaceOrderByWithRelationInput]
    $cursor: PlaceWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [PlaceScalarFieldEnum]
  ) {
    places(
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

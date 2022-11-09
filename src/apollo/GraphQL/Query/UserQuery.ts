import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      ...FUser
    }
  }
  ${FragmentService.User}
`;

export const USER = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      ...FUser
    }
  }
  ${FragmentService.User}
`;

export const USER_EXIST = gql`
  query userExists($where: UserExistsInput!) {
    userExists(where: $where) {
      id
      email
      cellPhone
    }
  }
`;

export const USERS = gql`
  query users(
    $where: UserWhereInput
    $orderBy: [UserOrderByWithRelationInput]
    $cursor: UserWhereUniqueInput
    $take: Int
    $skip: Int
    $distinct: [UserScalarFieldEnum]
  ) {
    users(
      where: $where
      orderBy: $orderBy
      cursor: $cursor
      take: $take
      skip: $skip
      distinct: $distinct
    ) {
      ...FUser
    }
  }
  ${FragmentService.User}
`;

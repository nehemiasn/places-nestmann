import { gql } from "@apollo/client";
import { FragmentService } from "../FragmentService";

export const CREATE_ONE_PLACE = gql`
  mutation createOnePlace($data: PlaceCreateOneInput!) {
    createOnePlace(data: $data) {
      ...FPlace
    }
  }
  ${FragmentService.Place}
`;

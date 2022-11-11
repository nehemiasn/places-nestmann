import { CURRENT_USER, USER, USERS, USER_EXIST } from "./UserQuery";
import { PLACE_TYPE, PLACE_TYPES } from "./PlaceTypeQuery";
import { PLACE, PLACES } from "./PlaceQuery";
import { PLACE_FILE, PLACE_FILES } from "./PlaceFileQuery";

export const Query = {
  currentUser: { name: "currentUser", gql: CURRENT_USER },
  user: {
    name: "user",
    gql: USER,
  },
  users: {
    name: "users",
    gql: USERS,
  },
  userExists: {
    name: "userExists",
    gql: USER_EXIST,
  },
  requestType: { name: "requestType", gql: PLACE_TYPE },
  requestTypes: { name: "requestTypes", gql: PLACE_TYPES },
  requestFile: { name: "requestFile", gql: PLACE_FILE },
  requestFiles: { name: "requestFiles", gql: PLACE_FILES },
  request: { name: "request", gql: PLACE },
  requests: { name: "requests", gql: PLACES },
};

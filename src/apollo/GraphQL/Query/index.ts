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
  placeType: { name: "placeType", gql: PLACE_TYPE },
  placeTypes: { name: "placeTypes", gql: PLACE_TYPES },
  placeFile: { name: "placeFile", gql: PLACE_FILE },
  placeFiles: { name: "placeFiles", gql: PLACE_FILES },
  place: { name: "place", gql: PLACE },
  places: { name: "places", gql: PLACES },
};

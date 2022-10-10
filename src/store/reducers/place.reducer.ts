import { PlacesData } from "../../services/PlaceService";
import { placeTypes } from "../types/place.types";

const { SELECTED_PLACE, FILTERED_PLACES } = placeTypes;

const initialState = {
  places: PlacesData,
  filteredPlaces: [],
  selected: {},
};

const PlaceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECTED_PLACE:
      const place = state.filteredPlaces.find(
        (place: any) => place.id === action.placeId
      );
      return {
        ...state,
        selected: place || {},
      };
    case FILTERED_PLACES:
      return {
        ...state,
        filteredPlaces:
          PlacesData.find((place) => place.categoryId === action.categoryId)
            ?.places || [],
      };
    default:
      return state;
  }
};

export default PlaceReducer;

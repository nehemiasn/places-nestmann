import { PlacesData } from "../../services/PlaceService";
import { placeTypes } from "../types/place.types";

const { SELECTED_PLACE, ADD_FAVORITE, REMOVE_FAVORITE, GET_FAVORITES } =
  placeTypes;

const initialState = {
  data: PlacesData,
  selected: {} as any,
};

const PlaceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECTED_PLACE:
      const place: any = state.data.find((p: any) => p.id === action.placeId);
      return {
        ...state,
        selected: place || {},
      };
    case ADD_FAVORITE:
      return {
        ...state,
        selected:
          state.selected && state.selected.id === action.placeId
            ? { ...state.selected, isFavorite: true }
            : state.selected,
        data: [
          ...state.data.map((item: any) => {
            if (item.id === action.placeId) {
              item.isFavorite = true;
            }
            return item;
          }),
        ],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        selected:
          state.selected && state.selected.id === action.placeId
            ? { ...state.selected, isFavorite: false }
            : state.selected,
        data: [
          ...state.data.map((item: any) => {
            if (item.id === action.placeId) {
              item.isFavorite = false;
            }
            return item;
          }),
        ],
      };
    case GET_FAVORITES:
      if (Array.isArray(action.payload) && action.payload.length) {
        return {
          ...state,
          data: [
            ...state.data.map((item) => ({
              ...item,
              isFavorite: !!action.payload.find((el: any) => el.id === item.id),
            })),
          ],
        };
      }
      return state;
    default:
      return state;
  }
};

export default PlaceReducer;

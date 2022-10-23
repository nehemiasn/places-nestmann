import { placeTypes } from "../types/place.types";

const {
  SELECTED_PLACE,
  FILTERED_PLACES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ALL_FAVORITES,
  COUNT_FAVORITE,
} = placeTypes;

export const selectedPlace = (id: number) => ({
  type: SELECTED_PLACE,
  placeId: id,
});

export const addFavorite = (id: number) => ({
  type: ADD_FAVORITE,
  placeId: id,
});

export const removeFavorite = (id: number) => ({
  type: REMOVE_FAVORITE,
  placeId: id,
});

export const allFavorites = () => ({
  type: ALL_FAVORITES,
});

export const totalFavorites = () => ({
  type: COUNT_FAVORITE,
});

import { placeTypes } from "../types/place.types";

const { SELECTED_PLACE, FILTERED_PLACES } = placeTypes;

export const selectedPlace = (id: number) => ({
  type: SELECTED_PLACE,
  placeId: id,
});

export const filteredPlaces = (id: number) => ({
  type: FILTERED_PLACES,
  categoryId: id,
});

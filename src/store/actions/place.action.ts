import { FIREBASE_URL_API, FIREBASE_HEADERS } from "../../constants/Firebase";
import { placeTypes } from "../types/place.types";

const {
  SELECTED_PLACE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  ALL_FAVORITES,
  COUNT_FAVORITE,
  GET_FAVORITES,
} = placeTypes;

export const selectedPlace = (id: number) => ({
  type: SELECTED_PLACE,
  placeId: id,
});

export const addFavorite = (place: any) => {
  return async (dispatch: any, getState: any) => {
    try {
      const state = getState();
      fetch(`${FIREBASE_URL_API}/favoritos.json`, {
        method: "POST",
        headers: FIREBASE_HEADERS,
        body: JSON.stringify({
          payload: [
            ...state.places.data.filter((item: any) => !!item.isFavorite),
            place,
          ],
        }),
      });
      dispatch({
        type: ADD_FAVORITE,
        placeId: place.id,
      });
    } catch (err) {
      // log
      console.error(err);
    }
  };
};

export const removeFavorite = (place: any) => {
  return async (dispatch: any) => {
    try {
      fetch(`${FIREBASE_URL_API}/favoritos/${place.firebaseId}.json`, {
        method: "DELETE",
        headers: FIREBASE_HEADERS,
      });
      dispatch({
        type: REMOVE_FAVORITE,
        placeId: place.id,
      });
    } catch (err) {
      // log
      console.error(err);
    }
  };
};

export const removeAllFavorites = () => {
  return async (dispatch: any) => {
    try {
      fetch(`${FIREBASE_URL_API}/favoritos.json`, {
        method: "DELETE",
        headers: FIREBASE_HEADERS,
      });
      dispatch();
    } catch (err) {
      // log
      console.error(err);
    }
  };
};

export const allFavorites = () => ({
  type: ALL_FAVORITES,
});

export const totalFavorites = () => ({
  type: COUNT_FAVORITE,
});

export const getFavorites = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${FIREBASE_URL_API}/favoritos.json`, {
        method: "GET",
        headers: FIREBASE_HEADERS,
      });
      const result = await response.json();
      const list = Object.keys(result || []).map((key) => ({
        ...result[key],
        id: key,
      }));
      const favorites = list.length
        ? list[list.length - 1].payload.map((el: any, index: any) => ({
            ...el,
            firebaseId: index,
          }))
        : [];
      dispatch({
        type: GET_FAVORITES,
        payload: favorites,
      });
    } catch (err) {
      // log
      console.error(err);
    }
  };
};

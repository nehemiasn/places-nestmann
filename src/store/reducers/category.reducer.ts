import { CategoryOfPlacesData } from "../../services/PlaceService";
import { categoryTypes } from "../types/category.types";

const { SELECT_CATEGORY } = categoryTypes;

const initialState = {
  categories: CategoryOfPlacesData,
  selected: null,
};

const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      const category = state.categories.find(
        (cat) => cat.id === action.categoryId
      );
      return {
        ...state,
        selected: category,
      };
    default:
      return state;
  }
};

export default categoryReducer;

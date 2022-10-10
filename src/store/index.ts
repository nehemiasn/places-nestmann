import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CategoryReducer from "./reducers/category.reducer";
import PlaceReducer from "./reducers/place.reducer";

const rootReducer = combineReducers({
  category: CategoryReducer,
  places: PlaceReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));

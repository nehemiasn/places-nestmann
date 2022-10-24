import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth.reducer";
import CategoryReducer from "./reducers/category.reducer";
import PlaceReducer from "./reducers/place.reducer";

const rootReducer = combineReducers({
  category: CategoryReducer,
  places: PlaceReducer,
  auth: authReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));

import { authTypes } from "../types/auth.types";

const { SIGNUP, LOGIN } = authTypes;

const initialState = {
  sesion: undefined,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SIGNUP:
      console.log(action.payload);
      return {
        ...state,
        sesion: action.payload,
      };
    case LOGIN:
      console.log(action.payload);
      return {
        ...state,
        sesion: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

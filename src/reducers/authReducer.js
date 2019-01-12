import { SIGN_IN, SIGN_OUT, SAVE_EMAIL } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  userEmail: null
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SAVE_EMAIL:
      return { ...state, userEmail: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, userEmail: null };
    default:
      return state;
  }
};
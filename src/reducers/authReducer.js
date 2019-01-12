import { SIGN_IN, SIGN_OUT, SAVE_NAME, SAVE_SCHOOL } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  userName: null,
  userSchool: null
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SAVE_NAME:
      return { ...state, userName: action.payload };
    case SAVE_SCHOOL:
      return { ...state, userSchool: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, userName: null, userSchool: null };
    default:
      return state;
  }
};
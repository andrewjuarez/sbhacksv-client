import { SIGN_IN, SIGN_OUT, SAVE_EMAIL } from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
}

export const saveEmail = userEmail => {
  return {
    type: SAVE_EMAIL,
    payload: userEmail
  }
}

export const signOut = () => {
  // you can have action creators that send no payload.
  return {
    type: SIGN_OUT
  }
}
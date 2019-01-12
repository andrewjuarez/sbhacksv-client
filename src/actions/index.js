import axios from "axios";
import { SIGN_IN, SIGN_OUT, SAVE_NAME, SAVE_SCHOOL, FETCH_EVENTS } from "./types";

const server = axios.create({
  baseURL: "http://localhost:3090"
});

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
}

export const saveName = userName => {
  return {
    type: SAVE_NAME,
    payload: userName
  }
}

export const saveSchool = userSchool => {
  return {
    type: SAVE_SCHOOL,
    payload: userSchool
  }
}

export const signOut = () => {
  // you can have action creators that send no payload.
  return {
    type: SIGN_OUT
  }
}

export const makeEvent = (formValues, callback) => async (dispatch, getState) => {
  try {
    await server.post("/event", {
       ...formValues, userId: getState().auth.userId, school: getState().auth.userSchool
      } 
    );

    if (callback) callback();
  } catch (e) {
    console.log(e);

    if (callback) callback();
  }
}

export const fetchEvents = () =>  async (dispatch, getState) => {
  try {
    const response = await server.post("/events", { school: getState().auth.userSchool || "uci" });
    // console.log(getState().auth);
    // console.log(response);
    dispatch({ type: FETCH_EVENTS, payload: response.data });
    // todo: reducer for events

  } catch (e) {
    console.log(e);
  }
}
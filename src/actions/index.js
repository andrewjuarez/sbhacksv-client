import server from "../api/server";
import { SIGN_IN, SIGN_OUT, SAVE_NAME, SAVE_SCHOOL, FETCH_EVENTS } from "./types";

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

export const makeEvent = (formValues, callback, callbackError) => async (dispatch, getState) => {
  try {
    await server.post("/event", {
       ...formValues, 
       userId: getState().auth.userId, 
       userName: getState().auth.userName, 
       school: getState().auth.userSchool
      } 
    );

    if (callback) callback();
  } catch (e) {
    console.log(e);

    const payload = e.response ? e.response.data.error : null;

    if (callbackError) callbackError(payload || "Server error");
  }
}

export const fetchEvents = (category="all", callback=null) =>  async (dispatch, getState) => {
  try {
    const response = await server.post("/events", { school: getState().auth.userSchool || "", category });
    // console.log(getState().auth);
    // console.log(response);
    dispatch({ type: FETCH_EVENTS, payload: response.data });
    if (callback) callback();

  } catch (e) {
    console.log(e);
  }
}
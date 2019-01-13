import server from "./server";

export const sendReminder = async (formValues, callback) => {
  try {
    await server.post("/sms", formValues);

    if (callback) callback();
  } catch (e) {
    console.log(e);
  }
}
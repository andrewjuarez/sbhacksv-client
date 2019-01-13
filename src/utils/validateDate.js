export const validateDate = (start_date, end_date) => {
  let start = new Date(start_date);
  let end = new Date(end_date);
  let diff = end-start;
  return (diff >= 1800000 && diff <= 604800000);
}

export const validateStartDate = (eventdatestart) => {
  let current_time = new Date();
  let start = new Date(eventdatestart); 
  return current_time < start;
}
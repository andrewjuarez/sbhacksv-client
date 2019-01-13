export default (start_date, end_date) => {
  let start = new Date(start_date);
  let end = new Date(end_date);
  let diff = end-start;

  return (diff >= 88200000 && diff <= 604800000);
}
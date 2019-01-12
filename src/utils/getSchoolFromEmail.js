export default (email) => {
  let substr_start = email.indexOf("@")+1;
  let substr_end = email.indexOf("edu") - 1;
  return email.substring(substr_start,substr_end);
}
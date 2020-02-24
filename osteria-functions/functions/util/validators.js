const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateSignUpData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be Empty";
  else if (!isEmail(data.email)) errors.email = "Not a valid Email";

  if (isEmpty(data.name)) errors.name = "Must not be Empty";

  if (isEmpty(data.password)) errors.password = "Must not be Empty";

  if (isEmpty(data.confirmPassword))
    errors.confirmPassword = "Must not be Empty";

  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords don't match";

  return {
    errors,
    valid: Object.keys(errors).length == 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be Empty";
  else if (!isEmail(data.email)) errors.email = "Not a valid Email";

  if (isEmpty(data.password)) errors.password = "Must not be Empty";

  return {
    errors,
    valid: Object.keys(errors).length == 0 ? true : false
  };
};

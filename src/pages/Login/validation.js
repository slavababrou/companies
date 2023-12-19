export const validateLogin = (login) => {
  return login.length >= 3 && login.length <= 20;
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateEmail = (email) => {
  return email.includes("@") && email.includes(".");
};

export const isValidFormData = (login, email, password) => {
  return (
    validateLogin(login) && validateEmail(email) && validatePassword(password)
  );
};

class AuthError {
  static authInvalidError = () => ({
    msg: "username or password not valid",
  });
}

export default AuthError;

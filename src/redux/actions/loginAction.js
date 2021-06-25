export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const LoginAction = (user) => ({
  type: LOGIN,
  payload: user,
});

export const LogoutAction = () => ({
  type: LOGOUT,
  payload: {},
});

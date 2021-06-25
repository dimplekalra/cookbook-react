import * as loginAction from "../actions/loginAction";
import { LoginUser, SignOut } from "../../utility/generalMethods";
import * as apiActions from "../actions/apiAction";

const initialState = {
  email: "",
  password: "",
  token: "",
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  let newState = { ...state };
  switch (type) {
    case loginAction.LOGIN: {
      return {
        ...payload,
      };
    }
    case loginAction.LOGOUT: {
      return {
        ...initialState,
      };
    }

    default:
      return newState;
  }
};

export const loginUser = (data) => {
  return async (dispatch) => {
    await dispatch(apiActions.fetchRequest());
    return LoginUser(data)
      .then((res) => {
        const cred = res.data;
        dispatch(apiActions.fetchSuccess(cred));
        dispatch(loginAction.LoginAction(cred));

        return res;
      })
      .catch((error) => {
        dispatch(apiActions.fetchError(error.message));
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await dispatch(apiActions.fetchRequest());
    return SignOut()
      .then(() => {
        dispatch(apiActions.fetchSuccess({}));
        dispatch(loginAction.LogoutAction());
      })
      .catch((error) => {
        dispatch(apiActions.fetchError(error.message));
      });
  };
};

export default loginReducer;

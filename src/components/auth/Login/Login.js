import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IsLoggedIn } from "../../../utility/generalMethods";
import { connect } from "react-redux";
import {
  loginSchema,
  validateInputs,
  validateSchema,
} from "../../../utility/validation";
import { loginUser } from "../../../redux/reducers/LoginReducer";
import "./Style.scss";

let initialValues = {
  email: "",
  password: "",
};

const Login = (props) => {
  const [state, setState] = useState({ ...initialValues });
  const history = useHistory();

  const [errors, setError] = useState({
    email: "",
    password: "",
    other: "",
    isError: false,
  });

  const [status, setStatus] = useState({
    InProgress: false,
    Failed: false,
    Message: "",
  });

  useEffect(() => {
    if (IsLoggedIn()) {
      history.push("/recipes");
    }
  }, [history]);

  const showError = (_fieldName) => {
    let error = errors[_fieldName];

    return error ? (
      <div className="error-block">{error || "Field Is Required"}</div>
    ) : null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = { ...state };

    const errorObj = await validateSchema(loginSchema, data);

    if (errorObj.isError) {
      console.log("error", errorObj.errorMessage);
      return;
    }

    loginUser(data);
  };

  const loginUser = async (data) => {
    try {
      setStatus({
        ...status,
        InProgress: true,
      });

      let Login = await props.LoginUser(data);

      if (Login.data != null) {
        setStatus({
          ...status,
          InProgress: false,
        });

        history.push("/recipes");
      } else {
        setStatus({
          ...status,
          Failed: true,
          Message: Login.message,
          InProgress: false,
        });
      }
    } catch (error) {
      setStatus({
        ...status,
        Failed: true,
        Message: error.message,
        InProgress: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleBlur = async (e) => {
    e.preventDefault();
    const { errors } = state;
    const { name, value } = e.target;

    const errorObj = await validateInputs(name, value, errors);

    const { isError, errorMessage } = errorObj;

    if (isError) {
      setError({
        ...errors,
        isError: true,
        [name]: errorMessage,
      });
    } else {
      setError({
        ...errors,
        isError: false,
        [name]: "",
      });
    }
  };

  return (
    <div className="login-container">
      <img
        src="../../images/login_banner.jpg"
        className="login-banner-img"
        alt="login"
      />
      <div className="login">
        <h3 className="text-center">
          Welcome to <span>Dephion CookBook</span>
        </h3>
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                className="form-control"
                required={true}
                onBlur={handleBlur}
                disabled={status.InProgress}
              />
              {showError("email")}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                className="form-control"
                required={true}
                onBlur={handleBlur}
                disabled={status.InProgress}
              />
              {showError("password")}
            </div>
            <div className="form-group text-center">
              <button
                className="button login-button"
                type="submit"
                disabled={errors.isError}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  LoginUser: (data) => {
    return dispatch(loginUser(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

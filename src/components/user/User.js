import React, { useState, useEffect } from "react";
import "./Style.scss";
import { signOut } from "../../redux/reducers/LoginReducer";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getCred } from "../../utility/generalMethods";
const User = (props) => {
  let { history } = useHistory();

  history = history ? history : props.history;

  const GoBack = () => {
    history.goBack();
  };

  const [user, setuser] = useState({
    email: "",
    token: "",
    password: "",
  });

  useEffect(() => {
    const cred = getCred();

    if (cred && cred.email) {
      setuser(cred);
    } else {
      history.push("/auth/login");
    }
  }, []);

  const handleSignout = async (e) => {
    await props.signOut();

    history.push("/auth/login");
  };

  return (
    <React.Fragment>
      <header className="header">
        <div className="back-button">
          <span onClick={(e) => GoBack()}>
            <img src="../../images/back.png" />
          </span>
        </div>
        <h3>Profile Details</h3>
      </header>
      <div className="single-recipe profile-sec">
        {user && user.email ? (
          <div className="profileContainer">
            <div className="imgWrapper ">
              <img src="../../images/profile.png" />
            </div>
            <div className="profileContent">
              <h3>Account Details</h3>
              <p>Email Id: {user.email}</p>
            </div>
            <div className="profileSignOut">
              <button
                onClick={handleSignout}
                className="button signout-button "
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <p>Please Login To Continue</p>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

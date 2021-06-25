import React, { useState, useEffect } from "react";
import "./Style.scss";
import { signOut } from "../../redux/reducers/LoginReducer";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getCred } from "../../utility/generalMethods";
const User = (props) => {
  const { history } = useHistory();
  const GoBack = () => {
    window.history.back();
  };
  const [user, setuser] = useState({
    email: "",
    token: "",
    password: "",
  });
  useEffect(() => {
    const cred = getCred();
    setuser(cred);
  }, []);

  const handleSignout = (e) => {
    props.signOut();
    history.push("/auth/login");
  };

  return (
    <div className="root">
      <header className="header">
        <div className="back-button">
          <span onClick={(e) => GoBack()}>
            <img src="../../images/back.png" />
          </span>
        </div>
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
              <button onClick={handleSignout} className="signoutButton submit-button">
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <p>Please Login To Continue</p>
        )}
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
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

import React, { useEffect } from "react";

import Content from "../Content/Content";
import Footer from "../Footer/Footer";

import { IsLoggedIn } from "../../../utility/generalMethods";
import { useHistory } from "react-router-dom";
const Layout = (props) => {
  const history = useHistory();

  useEffect(() => {
    if (!IsLoggedIn()) {
      history.push("/auth/login");
    }
  }, []);

  return (
    <React.Fragment>
      <Content />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;

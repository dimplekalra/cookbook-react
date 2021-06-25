import React from "react";
import { Link } from "react-router-dom";
import "./Style.scss";

const Footer = () => {
  return (
    <footer className="navbar">
      <ul>
        <li>
          <Link to="/recipes">
            <i className="fa fa-home" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link to="/recipes/favourites">
            <i className="fa fa-heart" aria-hidden="true"></i>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="fa fa-user" aria-hidden="true"></i>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

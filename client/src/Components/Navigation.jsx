import React from "react";

import { Link } from "react-router-dom";
import classess from "./Nav.css";

// simple navigation
const navBar = () => (
  <div className={classess.Nav}>
    <Link to={"/"} tag="a">
      Search tweets
    </Link>
  </div>
);

export default navBar;

import React from "react";

import classess from "./Intro.css";

const intro = props => (
  <div className={classess.image}>
    <div className={classess.text}>
      <h1>Search for the latest tweets</h1>
      <h3>View tweeter statistics and sentimental analysis</h3>
    </div>
  </div>
);

export default intro;

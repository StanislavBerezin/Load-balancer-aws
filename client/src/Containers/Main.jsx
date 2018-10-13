import React, { Component } from "react";
import classess from "./Main.css";
import Intro from "../Components/Layout/Intro";
import axios from "../Axios";
import Aux from "../Aux/Aux";
import { ClipLoader } from "react-spinners";

import { socketConnect } from "socket.io-react";
import io from "socket.io-client";

class Main extends Component {
  state = {
    searchedTweets: [],
    search: "",
    loading: false,
    error: false
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleStaticSearch = event => {
    event.preventDefault();
    console.log("static");

    axios
      .get("/streamTweets", { search: "Trump" })
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  handleLiveSearch = event => {
    event.preventDefault();

    console.log("live");
  };

  render() {
    return (
      <div>
        {/* intro screen */}
        <Intro />
        <div className={classess.Main}>
          <h1>View statistics</h1>
          <div className={classess.Bar}>
            {/* managing the form on submission */}
            <form onSubmit={this.handleLiveSearch} className={classess.form}>
              <label>
                <input type="search" name="name" onChange={this.handleChange} />
              </label>
              <div className={classess.searchButtons}>
                <input type="submit" name="live" value="Live stream" />
                <input
                  type="submit"
                  onClick={this.handleStaticSearch}
                  name="static"
                  value="View posts"
                />
              </div>
            </form>
          </div>

          <div className="sweet-loading">
            {/* loading circle */}
            <ClipLoader
              className={classess.Fix}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

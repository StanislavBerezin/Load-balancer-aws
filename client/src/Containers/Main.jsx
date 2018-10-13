import React, { Component } from "react";
import classess from "./Main.css";
import Intro from "../Components/Layout/Intro";
import axios from "../Axios";
import Aux from "../Aux/Aux";
import { ClipLoader } from "react-spinners";
import socketIOClient from "socket.io-client";
import { socketConnect } from "socket.io-react";
import io from "socket.io-client";

class Main extends Component {
  state = {
    searchedTweets: [],
    items: [],
    search: "Trump",
    loading: false,
    searchTerm: "JavaScript",
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

  handleStop(event) {
    event.preventDefault();
    console.log("shoud stop");
    axios.post("/stop");
  }

  handleSpecific() {}

  handleLiveSearch = event => {
    event.preventDefault();
    console.log("live");
    let search = this.state.search;
    axios.post("/specificSearch", { search });
    const socket = socketIOClient("http://localhost:8080");
    socket.on("connect", () => {
      console.log("Socket Connected");
      socket.on("tweets", data => {
        console.info(data);
        let newList = [data].concat(this.state.items.slice(0, 15));
        this.setState({ items: newList });
      });
    });

    socket.on("disconnect", () => {
      socket.off("tweets");
      socket.removeAllListeners("tweets");
      console.log("Socket Disconnected");
    });
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
                <input
                  type="submit"
                  onClick={this.handleStop}
                  name="static"
                  value="Stop"
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

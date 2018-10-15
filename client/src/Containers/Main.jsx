import React, { Component } from "react";
import classess from "./Main.css";
import Intro from "../Components/Layout/Intro";
import axios from "../Axios";
import Aux from "../Aux/Aux";
import { ClipLoader } from "react-spinners";
import socketIOClient from "socket.io-client";

import PieChart from "react-minimal-pie-chart";

class Main extends Component {
  state = {
    search: "",
    title: "",
    loading: false,
    error: false,
    positive: 10,
    negative: 10,
    negativePie: 10,
    positivePie: 10,
    sum: 0,
    negPercent: 50,
    posPercent: 50,
    negWords: [],
    posWords: []
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
  getSum(total, num) {
    return total + num;
  }

  handleStop = event => {
    event.preventDefault();
    console.log("shoud stop");

    axios.post("/stop");
  };

  handleSpecific() {}

  handleLiveSearch = event => {
    event.preventDefault();
    console.log("live");
    let search = this.state.search;
    this.setState({
      title: this.state.search,
      negativePie: 10,
      positivePie: 10,
      positive: 10,
      negative: 10,
      negPercent: 50,
      posPercent: 50,
      negWords: [],
      posWords: []
    });
    // http://localhost:8080
    axios.post("/specificSearch", { search });
    const socket = socketIOClient("http://localhost:3050/api");
    try {
      socket.on("connect", () => {
        console.log("Socket Connected");
        socket.on("tweets", data => {
          let sum = this.state.positivePie + this.state.negativePie;
          this.setState({ sum: sum });
          if (data.score > 0) {
            let positiveNum = [data.score].concat(this.state.positive);
            let positiveWords = [data.positiveWords].concat(
              this.state.posWords
            );
            let percent = (this.state.positivePie * 100) / this.state.sum;
            this.setState({
              positive: positiveNum,
              posPercent: percent,
              posWords: positiveWords
            });
            this.setState({
              positivePie: this.state.positive.reduce(this.getSum)
            });
            console.log(this.state.positivePie);
          } else {
            let negativeNum = [data.score].concat(this.state.negative);
            let negativeWords = [data.negativeWords].concat(
              this.state.negWords
            );
            let percent = (this.state.negativePie * 100) / this.state.sum;
            this.setState({
              negative: negativeNum,
              negPercent: percent,
              negWords: negativeWords
            });
            this.setState({
              negativePie: Math.abs(this.state.negative.reduce(this.getSum))
            });
          }
        });
      });

      socket.on("disconnect", () => {
        socket.off("tweets");
        socket.removeAllListeners("tweets");
        console.log("Socket Disconnected");
      });

      socket.on("error", function(err) {
        console.log("Socket.IO Error");
        console.log(err); // this is changed from your code in last comment
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let posWords = null;
    posWords = this.state.posWords.map(e => {
      return <li>{e}</li>;
    });
    let negWords = null;
    negWords = this.state.negWords.map(e => {
      return <li>{e}</li>;
    });

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

          <h1>Statistics for {this.state.title}</h1>
          <p>
            Positive {this.state.posPercent.toString().substr(0, 4)} %{" "}
            <span className={classess.pos}> __</span>
          </p>
          <p>
            Negative {this.state.negPercent.toString().substr(0, 4)} %{" "}
            <span className={classess.neg}> __</span>
          </p>

          <div className={classess.statistics}>
            <div>
              <PieChart
                className={classess.chart}
                data={[
                  {
                    title: "Test",
                    value: this.state.positivePie,
                    color: "#E38627"
                  },
                  {
                    title: "Two",
                    value: this.state.negativePie,
                    color: "#C13C37"
                  }
                ]}
              />
            </div>

            <div className={classess.goodWords}>
              <h4>Positive words</h4>
              <ul>{posWords}</ul>
            </div>
            <div className={classess.badWords}>
              <h4>Negative words</h4>
              <ul>{negWords}</ul>
            </div>
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

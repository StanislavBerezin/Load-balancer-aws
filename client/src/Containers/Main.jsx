import React, { Component } from "react";
import classess from "./Main.css";
import Intro from "../Components/Layout/Intro";
import axios from "../Axios/Axios";
import stream from "../Axios/Stream";
import PieChart from "react-minimal-pie-chart";
import { ClipLoader } from "react-spinners";
import socketIOClient from "socket.io-client";
import Auxx from "../Auxx/Auxx";
import { css } from "react-emotion";
const override = css`
  margin: 30px;
`;

class Main extends Component {
  state = {
    search: "",
    title: "",
    loading: false,
    error: true,
    positive: 10,
    negative: 10,
    negativePie: 10,
    positivePie: 10,
    sum: 0,
    negPercent: 50,
    posPercent: 50,
    negWords: [],
    posWords: [],
    errMes: "",
    saved: ""
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleStop = event => {
    event.preventDefault();
    console.log("Stopping stream");
    if (this.state.search === "") {
      this.setState({ errMes: "Nothing to stop" });
    } else {
      this.setState({ errMes: "", loading: false });

      stream.post("/stopStream");
    }
  };

  startStream = event => {
    event.preventDefault();
    let search = this.state.search;
    this.setDefault();

    if (this.state.search === "") {
      this.setState({ errMes: "Enter details to start stream" });
    } else {
      this.setState({ errMes: "", loading: true, error: true, saved: false });

      // const socket = socketIOClient({ path: "/socket.io" });
      // stream.post("/initialiseStream", { search });

      const socket = socketIOClient("http://localhost:8888");
      stream.post("/initialiseStream", { search });

      let negative = [];
      let positive = [];
      try {
        socket.on("connect", () => {
          console.log("Socket Connected");
          socket.on("tweets", data => {
            this.mapThrough(data.negWords, negative);
            this.mapThrough(data.posWords, positive);
            positive = [...new Set(positive)];
            negative = [...new Set(negative)];
            if (this.state.error === false) {
              this.setState({
                negWords: negative,
                posWords: positive,
                positivePie: data.positivePie,
                negativePie: data.negativePie,
                posPercent: data.posPercent,
                negPercent: data.negPercent
              });
            } else {
              this.setState({
                error: false,
                loading: false,
                negWords: negative,
                posWords: positive,
                positivePie: data.positivePie,
                negativePie: data.negativePie,
                posPercent: data.posPercent,
                negPercent: data.negPercent
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
        this.setState({ errMes: "Something went wrong" });
        console.log("Oops with stream...");
      }

      // const socket = socketIOClient({ path: "/socket.io" });
    }
  };
  getSum(total, num) {
    return total + num;
  }
  mapThrough = (input, where) => {
    input.forEach(firsLayerEach => {
      firsLayerEach.forEach(each => {
        where.push(each);
      });
    });
  };
  setDefault = () => {
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
  };
  saveResults = event => {
    event.preventDefault();
    try {
      if (this.state.search === "") {
        this.setState({ errMes: "Start the search first" });
      } else {
        this.setState({
          errMes: "",
          error: true,
          loading: true,
          saved: false
        });
        axios
          .post("/saveDB", {
            title: this.state.title,
            negPercent: this.state.negPercent,
            posPercent: this.state.posPercent,
            negWords: this.state.negWords,
            posWords: this.state.posWords,
            positivePie: this.state.positivePie,
            negativePie: this.state.negativePie
          })
          .then(() => {
            this.setState({ saved: true, loading: false });
          });
      }
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
        errMes: "Something happened bad happened"
      });
    }
  };
  vaib = event => {
    event.preventDefault();
    try {
      this.setState({
        errMes: "Server starts overloading with fibonacci...",
        loading: true
      });
      axios
        .post("/fib")
        .then(data => {})
        .then(() => {
          this.setState({
            errMes: "Overload completed please start again",
            loading: false
          });
        });
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
        errMes: "Something happened bad happened"
      });
      console.log("Oops with dangerous load");
    }
  };
  flick = event => {
    event.preventDefault();
    try {
      let search = this.state.search;
      if (this.state.search === "") {
        this.setState({
          errMes: "Enter the details to begin the search"
        });
      } else {
        this.setState({
          errMes: "Flickr starts overloading the server",
          loading: true,
          error: true,
          saved: false
        });
        // for (let i = 0; i < 3; i++) {
        axios
          .post("/flick", { search })
          .then(response => {
            console.log(response);
          })
          .then(() => {
            this.setState({
              errMes: "Flickr loader finished, start again",
              error: true,
              loading: false
            });
          });
        // }
      }
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
        errMes: "Something happened bad happened"
      });
      console.log("Oops with flickr");
    }
  };

  handleStaticSearch = event => {
    event.preventDefault();
    this.setDefault();
    try {
      let search = this.state.search;
      let negative = [];
      let positive = [];
      if (this.state.search === "") {
        this.setState({ errMes: "Enter the details to begin the search" });
      } else {
        this.setState({ errMes: "", loading: true, error: true, saved: false });
        for (let i = 0; i < 3; i++) {
          axios
            .post("/specificSearch", { search })
            .then(response => {
              this.mapThrough(response.data.negWords, negative);
              this.mapThrough(response.data.posWords, positive);
              positive = [...new Set(positive)];
              negative = [...new Set(negative)];
              this.setState({
                negWords: negative,
                posWords: positive,
                positivePie: response.data.positivePie,
                negativePie: response.data.negativePie,
                posPercent: response.data.posPercent,
                negPercent: response.data.negPercent
              });
            })
            .then(() => {
              this.setState({ error: false, loading: false });
            });
        }
      }
    } catch (e) {
      this.setState({
        error: true,
        loading: false,
        errMes: "Something happened bad happened"
      });
      console.log("Oops with static search...");
    }
  };

  render() {
    let posWords = null;
    posWords = this.state.posWords.map((e, index) => {
      return <li key={index}>{e}</li>;
    });
    let negWords = null;
    negWords = this.state.negWords.map((e, index) => {
      return <li key={index}>{e}</li>;
    });
    let save = null;
    if (this.state.saved) {
      save = (
        <Auxx>
          <h1>Has been saved</h1>
        </Auxx>
      );
    }
    let main = null;

    if (!this.state.error) {
      main = (
        <Auxx>
          <h1>Statistics for #{this.state.title}</h1>
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
                    color: "#C06C84"
                  },
                  {
                    title: "Two",
                    value: this.state.negativePie,
                    color: "#6C5B7B"
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
        </Auxx>
      );
    }

    return (
      <div>
        {/* intro screen */}
        <Intro />
        <div className={classess.Main}>
          <h1>View statistics</h1>
          <div className={classess.Bar}>
            {/* managing the form on submission */}
            <form onSubmit={this.handleStaticSearch} className={classess.form}>
              <label>
                <input type="search" name="name" onChange={this.handleChange} />
              </label>
              <div className={classess.searchButtons}>
                <input type="submit" name="live" value="Static search" />
                <input
                  type="submit"
                  onClick={this.startStream}
                  name="static"
                  value="Stream search"
                />
                <input
                  type="submit"
                  onClick={this.handleStop}
                  name="static"
                  value="Stop stream"
                />
                <input
                  type="submit"
                  className={classess.Save}
                  onClick={this.saveResults}
                  name="static"
                  value="Save results"
                />
                <input
                  type="submit"
                  className={classess.Save}
                  onClick={this.flick}
                  name="static"
                  value="Flickr load"
                />
                <input
                  type="submit"
                  className={classess.Ex}
                  onClick={this.vaib}
                  name="static"
                  value="Dangerous load"
                />
              </div>
            </form>
          </div>
          <h1>{this.state.errMes}</h1>
          <div className="sweet-loading">
            {/* loading circle */}
            <ClipLoader
              className={override}
              sizeUnit={"px"}
              size={150}
              color={"#6C5B7B"}
              loading={this.state.loading}
            />
          </div>
          {main}
          {save}
        </div>
      </div>
    );
  }
}

export default Main;

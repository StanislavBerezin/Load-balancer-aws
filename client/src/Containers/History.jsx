import React, { Component } from "react";
import classess from "./History.css";
import axios from "../Axios/Axios";
import PieChart from "react-minimal-pie-chart";

class Main extends Component {
  state = {
    title: ["Trump", "China"],
    negPercent: 50,
    posPercent: 50,
    negWords: ["ss", "s"],
    posWords: ["ss", "s"],
    negativePie: 10,
    positivePie: 10
  };

  componentDidMount() {
    axios.post("/viewDB").then(response => {
      response.data.forEach(e => {
        this.setState({
          title: e.title,
          posWords: e.posWords,
          negWords: e.negWords,
          posPercent: e.posPercent,
          negPercent: e.negPercent,
          negativePie: e.negativePie,
          positivePie: e.positivePie
        });
      });
    });
  }

  render() {
    let posWords = null;
    posWords = this.state.posWords.map((e, index) => {
      return <li key={index}>{e}</li>;
    });
    let negWords = null;
    negWords = this.state.negWords.map((e, index) => {
      return <li key={index}>{e}</li>;
    });

    return (
      <div className={classess.all}>
        <div className={classess.item}>
          <div className={classess.center}>
            <h1>Last search was for #{this.state.title}</h1>
            <p>
              Positive {this.state.posPercent.toString().substr(0, 4)} %{" "}
              <span className={classess.pos}> __</span>
            </p>
            <p>
              Negative {this.state.negPercent.toString().substr(0, 4)} %{" "}
              <span className={classess.neg}> __</span>
            </p>
          </div>
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

          <div className={classess.goodWords}>
            <h4>Positive words</h4>
            <ul>{posWords}</ul>
          </div>
          <div className={classess.badWords}>
            <h4>Negative words</h4>
            <ul>{negWords}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

import React, { Component } from "react";
import classess from "./History.css";
import axios from "../Axios/Axios";
import PieChart from "react-minimal-pie-chart";
import Auxx from "../Auxx/Auxx";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";
const override = css`
  margin: 30px;
`;
class Main extends Component {
  state = {
    all: [],
    loading: true
  };
  loadData() {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .post("/viewDB")
          .then(response => {
            this.setState({ all: response.data });
          })
          .then(() => {
            this.setState({ loading: false });
          });
        resolve("resolved");
      }, 3000);
    });

    return promise;
  }

  componentDidMount() {
    try {
      this.setState({ loading: true });
      this.loadData().then(() => {
        this.setState({ loading: false });
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let test = null;
    test = this.state.all.map((e, index) => {
      let negWordsLoop;
      let posWordsLoop;
      negWordsLoop = e.negWords.map((each, index) => {
        return <li key={index}>{each}</li>;
      });
      posWordsLoop = e.posWords.map((each, index) => {
        return <li key={index}>{each}</li>;
      });

      return (
        <Auxx key={index}>
          <div key={index} className={classess.item}>
            <div className={classess.center}>
              <h1 key={e.title}>Last search was for #{e.title}</h1>
              <p>
                Positive {e.posPercent.toString().substr(0, 4)} %{" "}
                <span className={classess.pos}> __</span>
              </p>
              <p key={e.negPercent}>
                Negative {e.negPercent.toString().substr(0, 4)} %{" "}
                <span className={classess.neg}> __</span>
              </p>
            </div>
            <PieChart
              key={index}
              className={classess.chart}
              data={[
                { title: "Test", value: e.positivePie, color: "#C06C84" },
                { title: "Two", value: e.negativePie, color: "#6C5B7B" }
              ]}
            />

            <div className={classess.goodWords}>
              <h4>Positive words</h4>
              <ul>{posWordsLoop}</ul>
            </div>
            <div className={classess.badWords}>
              <h4>Negative words</h4>
              <ul>{negWordsLoop}</ul>
            </div>
          </div>
        </Auxx>
      );
    });
    return (
      <div className={classess.all}>
        <div className={classess.loader}>
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
        </div>

        {test}
      </div>
    );
  }
}

export default Main;

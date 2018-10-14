import React, { Component } from "react";
import classess from "./Main.css";
import Intro from "../Components/Layout/Intro";
import axios from "../Axios";
import Aux from "../Aux/Aux";
import { ClipLoader } from "react-spinners";
import socketIOClient from "socket.io-client";

import { PieChart, Pie, Sector, Cell } from "recharts";

class Main extends Component {
  state = {
    searchedTweets: [],
    items: ["s", "aa"],
    search: "Trump",
    loading: false,
    error: false,
    goodBad: [{ good: "good", value: 100 }, { bad: "bad", value: 50 }]
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

  handleStop = event => {
    event.preventDefault();
    console.log("shoud stop");
    axios.post("/stop");
    console.log(this.state.items);
  };

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
        let newList = [data].concat(this.state.goodBad[0].value);
        this.setState({ goodBad: newList });
      });
    });

    socket.on("disconnect", () => {
      socket.off("tweets");
      socket.removeAllListeners("tweets");
      console.log("Socket Disconnected");
    });
  };

  render() {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${index > 0 ? "negative" : "positive"}`}
        </text>
      );
    };

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

          <PieChart width={1000} height={1000} onMouseEnter={this.onPieEnter}>
            <Pie
              dataKey={this.state.goodBad[0].value}
              data={this.state.goodBad}
              cx={300}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
            >
              {this.state.goodBad.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>

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

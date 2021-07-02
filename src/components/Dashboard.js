import React, { Component } from "react";
import PieChart from "./Chart";

export class Dashboard extends Component {

  state = {
    data: "",
  };

  render() {
    return (
      <div>
        {" "}
        <PieChart></PieChart>
      </div>
    );
  }
}

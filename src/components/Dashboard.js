import React, { Component } from "react";
import PieChart from "./Chart";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS home: ", props);
  }

  state = {
    data: "",
  };

  render() {
    console.log(this.props.token);
    return (
      <div>
        {" "}
        <PieChart></PieChart>
      </div>
    );
  }
}

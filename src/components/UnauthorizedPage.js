import React, { Component } from "react";
export default class UnauthorizedPage extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS home: ", props);
  }

  state = {
    data: "",
  };

  render() {
    console.log(this.props.token);
    // console.log("register");
    return <h2> Unaothorized </h2>;
  }
}

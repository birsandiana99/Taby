import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import Login from "./Login";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
export default class HomePage extends Component {
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
        {
          
          (localStorage.getItem("user_type") === 'therapist') ?
          (
          <div className="home-page-container">
            <h1>Welcome to TABY</h1>
            <div>TABY wishes to provide therapists all around the world an easy and
               simple tool for sharing with their patients. While they are offered 
               a chance to chat with our specialist, feel free to check out your
               <a href='/therapist'> patient list</a>.


              </div>
          </div>
          )

          :(
            <div className="home-page-container">
          <h1>Welcome to TABY</h1>
        <div>
        TABY is offering support for therapy all around the world, in a simple and accessible web application.
        We wish to support you to a journey of becoming the best version of yourself and overcoming your fears.
        Chat with TABY <a href='/chat'>here</a> or view your dashboard page <a href='/dash'>here</a>
        </div>
        </div>
        
        )}




        </div>
    );
  }
}

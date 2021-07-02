import React, { Component } from "react";
import DashPage from "./PieChart";
import DonutChart from "./DonutChart";
import Doughnut from "react-chartjs-2";
import {Bar, Pie} from "react-chartjs-2";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import $ from "jquery";
import 'react-tabs/style/react-tabs.css';

export default class OverviewChart extends Component {

  state = {
    therapist: 0,
    user_id: this.props.user_id,
    data: {}
  };
  async componentDidMount() {
   
    const user_id = this.props.user_id;
      $.get("http://localhost:8000/api/therapist?user_id=" + user_id)
      .then((res) => {
        this.setState({ therapist: res["id"] });
      })
      .catch((err) => {
        console.log(err);
      });

      const urlMessagesForUser =
      "http://127.0.0.1:8000/api/messages?user_id=" + user_id;
    const responseMessagesForUser = await fetch(urlMessagesForUser);
    const dataMessagesForUser = await responseMessagesForUser.json();
    let msg_list = [];
    for (const val of dataMessagesForUser) {
      // dataMessages = [...dataMessages, val["message"]]
      msg_list = [...msg_list, val["message"]];
    }


      let messages = [];
      let tags = [];
      let tagsDict = {};
      for (const value of msg_list) {
        const urlTagsForUser = "http://127.0.0.1:8000/api/tag?msg=" + value;
        const responseTagsForUser = await fetch(urlTagsForUser);
        const dataTagForUser = await responseTagsForUser.json();
        if (dataTagForUser != "" && dataTagForUser != "greeting") {
          if (tagsDict[dataTagForUser]) {
            tagsDict[dataTagForUser] = tagsDict[dataTagForUser] + 1;
          } else {
            tagsDict[dataTagForUser] = 1;
          }
          tags = [...tags, dataTagForUser];
        }
        messages = [...messages, value];
      }
      let labels = Object.keys(tagsDict);
      
      const datax = {
        labels: labels.slice(0, 5),
        datasets: [
          {
            label: "Feelings intensity overview",
            data: Object.values(tagsDict).slice(0, 5),
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
        options: {
        legend: {
          labels: {
            fontColor: 'f00'
          },
        }}
      };
       
      const options = {
        legend: {
          fontColor: "white",
       },
      };
      if (
        labels.length === 0 
      ) {
        this.setState({
          hasData: false,
          loading: false,
        });
      } else {
        this.setState({
          data: datax,
          loading: false,
          hasData: true,
          options: options
        });
      }
  }
  render() {
    return (
        <div >
        <div className="chartContainer" style={{width:"350px", height:"auto", marginRight:"25px"}} >
            <DashPage title="All time emotions polariy" user_id={this.props.user_id}/>
            </div>
        
        <div className="chartContainer" style={{width:"350px", height:"auto", marginRight:"25px"}}>
            <DonutChart user_id={this.props.user_id} title="All time emotions polariy"/>
        </div>
        <div className="chartContainer" style={{width:"500px", height:"auto", marginRight:"25px"}}>
            {/* <Bar data={this.state.data} /> */}
            <Bar data={this.state.data}/>
        </div>
        </div>

    );
  }
}

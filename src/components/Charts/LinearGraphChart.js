import { TodayTwoTone } from "@material-ui/icons";
import React, { Component } from "react";
import { Bar, Pie, PolarArea, Radar } from "react-chartjs-2";

export default class LinearGraphChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hasData: false,
    };
  }

  async componentDidMount() {
    const user_id = this.props.user_id;
    const urlMessagesForUser =
      "http://127.0.0.1:8000/api/messages?user_id=" + user_id;
    const responseMessagesForUser = await fetch(urlMessagesForUser);
    const dataMessagesForUser = await responseMessagesForUser.json();
    const recentMessages = [];
    let msg_list = [];
    let all_dates = [];
    for (const val of dataMessagesForUser) {
      const today = new Date();
      const msg_date = new Date(val["msg_date"]);
      if (msg_date != null) {
        if (!all_dates.includes(msg_date.getDate())) {
          recentMessages[msg_date.getDate()] = [val["message"]];
          all_dates = [...all_dates, msg_date.getDate()];
        } else {
          recentMessages[msg_date.getDate()] = [
            ...recentMessages[msg_date.getDate()],
            val["message"],
          ];
        }
      }
      if (
        today.getFullYear() === msg_date.getFullYear() &&
        today.getMonth() === msg_date.getMonth() &&
        today.getDate() === msg_date.getDate()
      ) {
        msg_list = [...msg_list, val["message"]];
      }
    }


    let messages = [];
    let tags = [];
    let tagsDict = {};
    for (const value of msg_list) {
      const urlTagsForUser = "http://127.0.0.1:8000/api/tag?msg=" + value;
      const responseTagsForUser = await fetch(urlTagsForUser);
      const dataTagForUser = await responseTagsForUser.json();
      if (dataTagForUser !== "" && dataTagForUser !== "greeting") {
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
          label: "Feelings intensity for today",
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
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.loading && this.state.hasData ? (
          <div>loading...</div>
        ) : (
                 <div className="chartContainer" style={{width:"500px", height:"auto"}} >
                <Bar data={this.state.data} /> </div>
            )} 
      </div>
    );
  }
}

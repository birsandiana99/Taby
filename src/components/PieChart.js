import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

export default class DashPage extends Component {
  state = {
    loading: true,
    dataMessagesForUser: null,
    dataCounterForMessages: null,
  };

  async componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    const urlMessagesForUser =
      "http://127.0.0.1:8000/api/messages?user_id=" + user_id;
    const responseMessagesForUser = await fetch(urlMessagesForUser);
    const dataMessagesForUser = await responseMessagesForUser.json();
    let dataMessages = [];
    for (const val of dataMessagesForUser) {
      // dataMessages = [...dataMessages, val["message"]]
      dataMessages = dataMessages + " " + val["message"];
    }

    const urlCounterForMessages =
      "http://127.0.0.1:8000/api/counter?obj=" + dataMessages;
    const responseCounterForMessages = await fetch(urlCounterForMessages);
    const dataCounterForMessages = await responseCounterForMessages.json();
    console.log(dataCounterForMessages);

    let labels = Object.keys(dataCounterForMessages);
    console.log(labels);

    let datax = {
      labels: labels.slice(0, 5),
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(dataCounterForMessages).slice(0, 5),
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
    console.log(dataMessages);
    console.log(dataCounterForMessages);

    const urlPolarity =
      "http://127.0.0.1:8000/api/polarity?obj=" + dataMessages;
    const responsePolarity = await fetch(urlPolarity);
    const dataPolarity = await responsePolarity.json();
    console.log("POLARITY:::: ", dataPolarity);

    this.setState({
      dataMessagesForUser: dataMessages,
      dataCounterForMessages: dataCounterForMessages,
      data: datax,
      loading: false,
    });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <Pie
              width={300}
              height={300}
              data={this.state.data}
              options={{ maintainAspectRatio: false }}
            ></Pie>
          </div>
        )}
      </div>
    );
  }
}

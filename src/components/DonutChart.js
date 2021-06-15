import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

export default class DonutChart extends Component {
  state = {
    loading: true,
    person: null,
    dataMessagesForUser: null,
    dataPolarity: null,
  };

  async componentDidMount() {
    const user_id = this.props.user_id;
    const urlMessagesForUser =
      "http://127.0.0.1:8000/api/messages?user_id=" + user_id;
    const responseMessagesForUser = await fetch(urlMessagesForUser);
    const dataMessagesForUser = await responseMessagesForUser.json();
    let dataMessages = [];
    for (const val of dataMessagesForUser) {
      dataMessages = dataMessages + " " + val["message"];
    }

    const urlPolarity =
      "http://127.0.0.1:8000/api/polarity?obj=" + dataMessages;
    const responsePolarity = await fetch(urlPolarity);
    const dataPolarity = await responsePolarity.json();

    // console.log("POLARITY:::: ", dataPolarity);
    let compound = dataPolarity["compound"];
    delete dataPolarity["compound"];
    let labels = Object.keys(dataPolarity);
    console.log("POLARITY compound:::: ", compound);

    let datax = {
      labels: labels,
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(dataPolarity),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    this.setState({
      dataMessagesForUser: dataMessages,
      dataPolarity: dataPolarity,
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
            <Doughnut
             style={{width:"250px", height:"auto"}}
              data={this.state.data}
              options={ {
                plugins: {
                  title: {
                    display: true,
                    text: this.props.title, 
                    font: {
                      weight: "10px"
                    }
                }
                }
            }}
            ></Doughnut>
          </div>
        )}
      </div>
    );
  }
}

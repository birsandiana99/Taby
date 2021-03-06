import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
let messageData;
const getDataFromAPI = () => {
  const user_id = localStorage.getItem("user_id");
  const url = "http://127.0.0.1:8000/api/messages?user_id=" + user_id;

  return (
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((respData) => {
        let finalResp = [];
        for (const val of respData) {
          finalResp = finalResp + " " + val["message"];
        }
        messageData = finalResp;

        return finalResp;
      })
      .catch((error) => console.error(error))
  );
};
let finalData;
let mycounts;
const getCountersFromApi = () => {
  let mydata = getDataFromAPI();
  mydata.then((mydata) => {
    return fetch("http://127.0.0.1:8000/api/counter?obj=" + mydata, {
      method: "GET",
      // headers: {'Content-Type': 'application/json'}
    })
      .then((data) => data.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error(error));
  });
};
const datax = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#8a3ffc",
        "#08bdba",
        "#4589ff",
        "#ff7eb6",
        "#d4bbff"
      ],
      borderColor: [
        "#7c38e2",
        "#07aaa7",
        "#3e7be5",
        "#e571a3",
        "#bea8e5",
      ],
      borderWidth: 1,
    },
  ],
};
export default class DashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages_from_API: "",
      counters: {},
      data: "",
    };
  }


  render() {
    let mydata = getDataFromAPI();
    mydata.then((data) => console.log(data));

    return localStorage.token ? (
      <div>
        <h2>HELLO</h2> <Pie data={datax}></Pie>
      </div>
    ) : (
      <div></div>
    );
  }
}

import React, { Component } from "react";
import DashPage from "./PieChart";
import DonutChart from "./DonutChart";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProgressBar from "./ProgressBar";
import $ from "jquery";
export default class ClientPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      therapist: 0,
      user_id: localStorage.user_id,
    };
  }
  async componentDidMount() {
    console.log("SDFFFFFFFFFFFFFFFFFFFFFF", this.state.user_id);
    $.get("http://localhost:8000/api/therapist?user_id=" + this.state.user_id)
      .then((res) => {
        this.setState({ therapist: res["id"] });
      })
      .catch((err) => {
        console.log(err);
      });

    const user_id = localStorage.getItem("user_id");
    const messages = localStorage.getItem("user_messages");
  }
  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            <Tab>Today</Tab>
            <Tab>Overview</Tab>
          </TabList>

          <TabPanel>
            <div>
              <ProgressBar />
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ display: "flex" }}>
              <DashPage />
              <DonutChart />
            </div>
            <p style={{ fontSize: "20px" }}>
              {" "}
              If you are feeling distresed and/or in danger, or just need to,
              feel free to chat with your therapist
              <a href={`/chats/${this.state.therapist}`}> here... </a>
            </p>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

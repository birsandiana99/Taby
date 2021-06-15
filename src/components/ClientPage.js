import React, { Component } from "react";
import DashPage from "./PieChart";
import DonutChart from "./DonutChart";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProgressBar from "./ProgressBar";
import $ from "jquery";
import 'react-tabs/style/react-tabs.css';
import DashboardWithProps from "./DashboardWithProps";
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
        <Tabs style={{marginTop: "-44px"}}>
          <TabList>
            <Tab>Recent</Tab>
            <Tab>Overview</Tab>
          </TabList>

          <TabPanel>
            <div>
              <DashboardWithProps user_id={localStorage.getItem("user_id")}/>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
          <div style={{width:"800px", display:"flex", textAlign:"center", width:"100%"}}>
                <div id="myChart"/>
                 <div className="chartContainer" style={{width:"500px", height:"auto"}} >
                <DashPage/>
                </div>
                <div className="chartContainer" style={{width:"300px", height:"auto"}}>
                <DonutChart />
                </div>
                
              </div>
              
            </div>
            <p style={{ fontSize: "20px", marginTop:"100px" }}>
              {" "}
              If you are feeling distresed and/or in danger, or just need to,
              feel free to chat with your therapist
              <a href={`/chats/${this.state.therapist}`} style={{color:"#F7904E"}}> here... </a>
            </p>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

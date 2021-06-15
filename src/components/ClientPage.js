import React, { Component } from "react";
import DashPage from "./PieChart";
import DonutChart from "./DonutChart";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProgressBar from "./ProgressBar";
import $ from "jquery";
import 'react-tabs/style/react-tabs.css';
import DashboardWithProps from "./DashboardWithProps";
import OverviewChart from "./OverviewChart";

export default class ClientPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      therapist: 0,
      user_id: localStorage.getItem("patient_id")
  };
}

  async componentDidMount() {
      const {match: {params}} = this.props;
      let id = params.user_id;
      console.log("ID ", id);
      if(this.props.user_id){
        this.setState({user_id : this.props.user_id});
       }
       else{
        this.setState({user_id: params.user_id});
     }
       console.log("------------",this.state.user_id);

      //  $.get("http://localhost:8000/api/therapist?user_id=" + this.state.user_id)
      //  .then((res) => {
      //    this.setState({ therapist: res["id"] });
      //  })
      //  .catch((err) => {
      //    console.log(err);
      //  });
      //  console.log("THERAPIST",this.state.therapist);
       
  }
  render() {
    return (
      <div>
        <Tabs style={{marginTop: "-60px"}}>
          <TabList>
            <Tab>Recent</Tab>
            <Tab>Overview</Tab>
          </TabList>

          <TabPanel>
            <div>
              <DashboardWithProps user_id={this.state.user_id}/>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
          <div style={{display:"flex", textAlign:"center", width:"100%"}}>
                {/* <div id="myChart"/>
                 <div className="chartContainer" style={{width:"200px", height:"auto"}} >
                <DashPage/>
                </div>
                <div className="chartContainer" style={{width:"300px", height:"auto"}}>
                <DonutChart title="All time emotions polariy"/>
                </div> */}
                <OverviewChart user_id={this.state.user_id}/>
              </div>
              
            </div>
            
              {localStorage.getItem("user_type")==='client' ?
              <div>
                <p style={{ fontSize: "20px", marginTop:"100px" }}>
              {" "}
              If you are feeling distresed and/or in danger, or just need to,
              feel free to chat with your therapist
                  <a href={`/chats`} style={{color:"#F7904E"}}> here... </a>
                  </p>
                  </div>
                  : <div/>
                  
              }
              
            
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

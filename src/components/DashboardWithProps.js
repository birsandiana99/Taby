import { TodayTwoTone } from "@material-ui/icons";
import React, { Component } from "react";
import Chart from "chartjs";
import { Bar, Pie, PolarArea, Radar } from "react-chartjs-2";
import { defaults } from 'react-chartjs-2';
import DonutChart from './DonutChart';
defaults.color='white';
export default class DashboardWithProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hasData: false,
      user_id: this.props.user_id
    };
  }

  async componentDidMount() {
   
    let user_id;
    if(this.props.user_id){
     user_id = this.props.user_id;
    }
    else{
         user_id=this.props.match.params.user_id;
    }
    const urlMessagesForUser =
      "http://127.0.0.1:8000/api/messages?user_id=" + user_id;
    const responseMessagesForUser = await fetch(urlMessagesForUser);
    const dataMessagesForUser = await responseMessagesForUser.json();
    const recentMessages = [];
    let msg_list = [];
    let all_dates = [];
    console.log("dataMessagesForUser",dataMessagesForUser);
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
    console.log("AIIICI:::::",all_dates);
    const today = new Date();
    let rec_mes = [];
    for (const some_date of all_dates.slice(1)) {
        if(recentMessages[some_date]){
            rec_mes = [...rec_mes, recentMessages[some_date]];
        }
    }
    console.log("RECMES", rec_mes);
    let messages_1 = rec_mes[0];
    let messages_2 = rec_mes[1];
    if(messages_1){
    let tags_1 = [];
    let tagsDict_1 = {};
    for (const value of messages_1) {
      const urlTagsForUser = "http://127.0.0.1:8000/api/tag?msg=" + value;
      const responseTagsForUser = await fetch(urlTagsForUser);
      const dataTagForUser = await responseTagsForUser.json();
      if (dataTagForUser !== "" && dataTagForUser !== "greeting") {
        if (tagsDict_1[dataTagForUser]) {
          tagsDict_1[dataTagForUser] = tagsDict_1[dataTagForUser] + 1;
        } else {
          tagsDict_1[dataTagForUser] = 1;
        }
        tags_1 = [...tags_1, dataTagForUser];
      }
    }

    let labels_1 = Object.keys(tagsDict_1);
    const datax_1 = {
      labels: labels_1.slice(0, 5),
      datasets: [
        {
          label:
            "Feelings intensity for " +
            all_dates[1]+
            "." +
            (today.getMonth() + 1),
          data: Object.values(tagsDict_1).slice(0, 5),
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
          color:"white",
          borderWidth: 1,
        },
      ],
    };

    

    if(labels_1.length>0){
      this.setState({ data_1: datax_1});
        }
    
    }


    if(messages_2){
    let tags_2 = [];
    let tagsDict_2 = {};
    for (const value of messages_2) {
      const urlTagsForUser = "http://127.0.0.1:8000/api/tag?msg=" + value;
      const responseTagsForUser = await fetch(urlTagsForUser);
      const dataTagForUser = await responseTagsForUser.json();
      if (dataTagForUser != "" && dataTagForUser != "greeting") {
        if (tagsDict_2[dataTagForUser]) {
          tagsDict_2[dataTagForUser] = tagsDict_2[dataTagForUser] + 1;
        } else {
          tagsDict_2[dataTagForUser] = 1;
        }
        tags_2 = [...tags_2, dataTagForUser];
      }
    }

    let labels_2 = Object.keys(tagsDict_2);
    const datax_2 = {
      labels: labels_2.slice(0, 5),
      datasets: [
        {
          label:
            "Feelings intensity for " +
            all_dates[2]+
            "." +
            (today.getMonth() + 1),
          data: Object.values(tagsDict_2).slice(0, 5),
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
      options:{
        responsive: true,
        maintainAspectRatio: false,
        legend: {
           fontColor: "white",
        },
        scales: {
           xAxes: [{
              ticks: {
                 fontColor: "white",
              }
           }],
           yAxes: [{
              ticks: {
                 fontColor: "white",
                 beginAtZero: true,
                 maxTicksLimit: 5,
                 stepSize: Math.ceil(250 / 5),
                 max: 250
              }
           }]
        }
     }
    };
    if(labels_2.length>0){
    this.setState({ data_2: datax_2});
      }
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

    const urlCounterForMessages =
      "http://127.0.0.1:8000/api/counter?obj=" + messages;
    const responseCounterForMessages = await fetch(urlCounterForMessages);
    const dataCounterForMessages = await responseCounterForMessages.json();

    let labelsx = Object.keys(dataCounterForMessages);

    let datax2 = {
      labels: labelsx.slice(0, 5),

      datasets: [
        {
          label: "Feelings intensity for today",
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
      options: {
        legend: {
          labels: {
            fontColor: 'f00'
          },
        }}
    };

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
      labels.length === 0 &&
      labelsx === 0
    ) {
      this.setState({
        hasData: false,
        loading: false,
      });
    } else {
      this.setState({
        data: datax,
        data2: datax2,
        loading: false,
        hasData: true,
        options: options
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.loading && this.state.hasData ? (
          <div>loading...</div>
        ) : (
          <div>
            {this.state.hasData ? (
               
              <div>
              <div style={{width:"800px", display:"flex", textAlign:"center", width:"100%"}}>
                <div id="myChart"/>
                 <div className="chartContainer" style={{width:"500px", height:"auto"}} >
                <Bar data={this.state.data} style={{width:"200px", height:"auto"}} options={this.state.options}/>
                </div>
                <div className="chartContainer" style={{width:"250px", height:"auto"}}>
                <Pie 
                  data={this.state.data2}
                  options={ {
                    plugins: {
                      title: {
                        display: true,
                        text: "Today's displayed emotions",
                        font: {
                          weight: "10px"
                        }
                    }
                    }
                }}
                /></div>
                <div className="chartContainer" style={{width:"250px", height:"auto"}} >
                    <DonutChart user_id={this.state.user_id} title="Today's emotion polarity chart"/> </div>
                <br />
                
              </div>

              <div style={{marginTop:"20px"}}> 
                <div>
                <div className="chartContainer" style={{width:"500px", height:"auto",marginRight:"20px"}} >
                    <Bar data={this.state.data_1} style={{width:"300px", height:"auto"}} /> </div>
                    <div className="chartContainer" style={{width:"500px", height:"auto"}} >
                    <Bar data={this.state.data_2} style={{width:"250px", height:"auto"}}/> </div>
                    
                  </div>
              </div>
              </div>
            ) : (
              <div> There is no data for today...</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

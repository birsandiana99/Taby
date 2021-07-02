import { Card, Button } from "@material-ui/core";
import React, { Component } from "react";

export default class TherapistPage extends Component {
  state = {
    loading: true,
    dataPatients: [],
    dataPatientsList: [],
    datesForJoining: {},
    dataPatientIDs: [],
    raw_data: [],
  };


  getMyDate= (mydate) => {
    let date = new Date(mydate);
    return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear() + ' ' +date.getHours()+":"+date.getMinutes();
  } 
  async componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    const urlPatientsForTherapist =
      "http://127.0.0.1:8000/api/patients?therapist_id=" + user_id;
    const response = await fetch(urlPatientsForTherapist);
    const dataMessagesForUser = await response.json();
    let dataPatients = [];
    let dataPatientsNames = [];
    let dataPatientIDs = [];
    let datesForJoining = {};
    let raw_data = dataMessagesForUser;
    for (const val of dataMessagesForUser) {
      dataPatients = dataPatients + val;
      dataPatientIDs = [...dataPatientIDs, val["id"]];
      dataPatientsNames = [...dataPatientsNames, val["username"]];
      datesForJoining[val["username"]] = val["date_joined"];
    }


    //let date = new Date(raw_data[0]["last_login"]);


    this.setState({
      raw_data: raw_data,
      dataPatients: dataPatients,
      dataPatientsNames: dataPatientsNames,
      dataPatientIDs: dataPatientIDs,
      datesForJoining: datesForJoining,
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
            <h2 style={{color:"white"}}>Here is your client list</h2>
            <div className="patientListContainer">
            {this.state.raw_data.map((item) => (
              <div className="patientCard" key={item["id"]}>
                {/* <button onClick={localStorage.setItem(patient_to_view,item)}> */}
                <div >
                  <label> Username: {item["username"]}</label>
                  <br />
                  <label> First Name: {item["first_name"]}</label>
                  <br />
                  <label> Last Name: {item["last_name"]}</label>
                  <br />
                  <label> Age: {item["age"]}</label>
                  <br />
                  <label> Last active: {
                        this.getMyDate(item["last_login"])
                       
                      
                  
                 }</label>
                  <br />
                  <a style={{color:"white"}}  onClick={()=>localStorage.setItem("patient_id",item["id"])} href={`/patient/${item["id"]}`}>
                    {" "}
                    Go to dashboard for {item["username"]}
                  </a>
                  <br />
                  <a style={{color:"white"}} href={`/chats/${item["id"]}`}>
                    {" "}
                    Chat with {item["username"]}
                  </a>
                  {/* <ChartWithProps user_id={item}/> */}
                  {/* {this.state.datesForJoining[item]} */}
                </div>
              </div>
            ))}</div>
          </div>
        )}
      </div>
    );
  }
}

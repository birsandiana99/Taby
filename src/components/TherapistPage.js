import { Card, Button } from "@material-ui/core";
import React, { Component } from "react";

const PatientCardStyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
  paddingBottom: "14px",
  marginBottom: "14px",
};

export default class TherapistPage extends Component {
  state = {
    loading: true,
    dataPatients: [],
    dataPatientsList: [],
    datesForJoining: {},
    dataPatientIDs: [],
    raw_data: [],
  };

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

    console.log(datesForJoining);
    console.log("==========", raw_data);
    console.log(dataPatientIDs);
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
            {this.state.raw_data.map((item) => (
              <div key={item["id"]}>
                {/* <button onClick={localStorage.setItem(patient_to_view,item)}> */}
                <Card className="patientCard" style={PatientCardStyle}>
                  <label> Username: {item["username"]}</label>
                  <br />
                  <label> First Name: {item["first_name"]}</label>
                  <br />
                  <label> Last Name: {item["last_name"]}</label>
                  <br />
                  <label> Age: {item["age"]}</label>
                  <br />
                  <label> Last active: {item["last_login"]}</label>
                  <br />
                  <a href={`/patient/${item["id"]}`}>
                    {" "}
                    Go to dashboard for {item["username"]}
                  </a>
                  <br />
                  <a href={`/chats/${item["id"]}`}>
                    {" "}
                    Chat with {item["username"]}
                  </a>
                  {/* </button> */}
                  {/* <ChartWithProps user_id={item}/> */}
                  {/* {this.state.datesForJoining[item]} */}
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

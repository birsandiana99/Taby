import { ThumbUpSharp } from "@material-ui/icons";
import { React, Component } from "react";
import swal from 'sweetalert';
export default class UserProfile extends Component {
  state = {
    user: {},
  };
  getMyDate= (mydate) => {
    let date = new Date(mydate);
    return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear() + ' ' +date.getHours()+":"+date.getMinutes();
  }  
  async componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    const urlUsers =
      "http://127.0.0.1:8000/api/someuser?user_id=" + user_id;
    const resp = await fetch(urlUsers);
    const data = await resp.json();
    this.setState({user: data});


    const therapist=await fetch(
      "http://localhost:8000/api/therapist?user_id=" + user_id
    );
    const therapistForUser = await therapist.json();
    this.setState({therapist: therapistForUser});

  }

  

  render() {    
    return (
      <div>
        <h2>Hello, {this.state.user.first_name}</h2>
        <h3>Here is your relevant information</h3>
        <div className="patientCard">
            <div>
          <label className="controlLabel"> Name: </label>  <label> {this.state.user.first_name} {this.state.user.last_name}</label>
          <br/>
          <label className="controlLabel"> Email: </label> <label> {this.state.user.email}</label>
          <br/>
          <label className="controlLabel"> Age: </label> <label> {this.state.user.age}</label>
          <br/>
          <label className="controlLabel"> Type of user: </label> <label> {this.state.user.type_of_user}</label>
          <br/>
          <label className="controlLabel"> Date Joined: </label> <label> {this.getMyDate(this.state.user.date_joined)}</label>
          <br/>
          {this.state.user.type_of_user === "client" ? 
            <div> {this.state.therapist ? <div><label className="controlLabel"> Your therapist: </label> <label>{this.state.therapist.first_name + " " + this.state.therapist.last_name} </label></div>: "No therapist assigned for this user" }</div>
            : <></>
          }
          </div>
        </div>
      </div>
    );
  }
}

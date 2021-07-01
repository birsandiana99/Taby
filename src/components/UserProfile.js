import { ThumbUpSharp } from "@material-ui/icons";
import { React, Component } from "react";
import swal from 'sweetalert';
export default class UserProfile extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    const urlUsers =
      "http://127.0.0.1:8000/api/someuser?user_id=" + user_id;
    const resp = await fetch(urlUsers);
    const data = await resp.json();
    this.setState({user: data});
    console.log("RRRRRRRRRRR",data);


    const therapist=await fetch(
      "http://localhost:8000/api/therapist?user_id=" + user_id
    );
    const therapistForUser = await therapist.json();
    this.setState({therapist: therapistForUser});
    console.log("RRRRRRRRRRR",therapistForUser);

  }

  

  render() {
    console.log(localStorage.getItem("user_type"));
    
    return (
      <div>
        <h1>Hello, {this.state.user.first_name}</h1>
        <h2>Here is some of your relevant information</h2>
        <div>
          <label> Name: {this.state.user.first_name} + {this.state.user.last_name}</label>
          <br/>
          <label> Email: {this.state.user.email}</label>
          <br/>
          <label> Age: {this.state.user.age}</label>
          <br/>
          <label> Type of user: {this.state.user.type_of_user}</label>
          <br/>
          <label> Date Joined: {this.state.user.date_joined}</label>
          <br/>
          {this.state.user.type_of_user === "client" ? 
            <label> {this.state.therapist ? <label>Your therapist: {this.state.therapist.first_name + " " + this.state.therapist.last_name} </label>: "No therapist assigned for this user" }</label>
            : <></>
          }
        </div>
      </div>
    );
  }
}

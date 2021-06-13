import { React, Component } from "react";

export default class UserProfile extends Component {
  state = {
    user: localStorage.getItem("user_type"),
  };

  async componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    const urlUsers =
      "http://127.0.0.1:8000/api/users?id=" + user_id;
    const resp = await fetch(urlUsers);
    const data = await resp.json();
    console.log(data);
  }

  

  render() {
    console.log(localStorage.getItem("user_type"));
    return (
      <div>
        <h2>HELLO {localStorage.getItem("user_type")}</h2>
      </div>
    );
  }
}

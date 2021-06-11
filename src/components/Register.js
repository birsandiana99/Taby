import React, { Component} from 'react';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router';
import { useHistory } from 'react-router-dom';
import history from "./../history";
class Login extends Component {

  state = {
    credentials: {username: '', password: '', email: '', first_name: '', last_name: '', age: '',type_of_user: 'therapist'},
    password_2: ''
  }

  
  register = event => {
      if(this.state.password_2 != this.state.credentials["password"])
      {
          console.log("NOOOOOOOOOOOOOOOO");
      }
      else{
          console.log("YESSSSSSSSSSSSS");
      }
      console.log(this.state.credentials["type_of_user"]);
      this.setState({type_of_user:'therapist'});
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .catch( error => console.error(error))
    console.log("register");
  }
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
    console.log(cred);
    // console.log("TYPE",this.state.type_of_user);

  }

  render() {
    return (
      <div>
        <h1>Login user form</h1>

        <label>
          First Name:
          <input type="text" name="first_name"
           value={this.state.credentials.first_name}
           onChange={this.inputChanged}/>
        </label>
        <br />
        <label>
          Last name:
          <input type="text" name="last_name"
           value={this.state.credentials.last_name}
           onChange={this.inputChanged}/>
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="age"
           value={this.state.credentials.age}
           onChange={this.inputChanged}/>
        </label>
        <br/>
        <label>
          Username:
          <input type="text" name="username"
           value={this.state.credentials.username}
           onChange={this.inputChanged}/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password"
           value={this.state.credentials.password}
           onChange={this.inputChanged} />
        </label>
        <br />
        <label>
          Repeat Password:
          <input type="password" name="password_2"
           value={this.state.password_2}
           onChange={event => this.setState({password_2: event.target.value})} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email"
           value={this.state.credentials.email}
           onChange={this.inputChanged} />
        </label>
        <br/>
        <label>
          What kind of user are you going to be?
            <select name="type_of_user" id="type_of_user" onChange={this.inputChanged}>
                <option value="therapist">therapist</option>
                <option value="client">client</option>
               
            </select>
          {/* <input type="text" name="email"
           value={this.state.credentials.email}
           onChange={this.inputChanged} /> */}
        </label>
        <br/>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

export default Login;
import React, { Component} from 'react';
import { Redirect } from 'react-router';
import {withRouter} from 'react-router';
import { useHistory } from 'react-router-dom';
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      credentials: {username: '', password: ''}
    }
}
  

  login = event => {
    // console.log(this.state.credentials);
    fetch('http://127.0.0.1:8000/api/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        localStorage.setItem('token',data.token);
        localStorage.setItem('user_id',data.user_id);
        localStorage.setItem('user_type',data.type_of_user);
        this.props.userLogin(data.token, data.user_id, data.type_of_user);
      },
      this.props.history.push("/user_profile")
      )
    .catch( error => console.error(error))
  }

  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  render() {
    return (
      <div>
        <h1>Login user form</h1>

        <label>
          Username:
          <input type="text" name="username"
           value={this.state.credentials.username}
           onChange={this.inputChanged}/>
        </label>
        <br/>
        <label>
          Password:
          <input type="password" name="password"
           value={this.state.credentials.password}
           onChange={this.inputChanged} />
        </label>
        <br />
        <button onClick={this.login}>Login</button>
        <br/>
        <p>Don't have an account? Register <a href={`/register`}> here </a> Or try the application without one <a href={`/chat`}> here </a></p>
      </div>
    );
  }
}

export default withRouter(Login);
import React, { Component } from "react";
import ChatbotPage from "./ChatbotPage";
import AppLayout from "./AppLayout";
import UserProfile from "./UserProfile";
import TherapistPage from "./TherapistPage";
import ChartWithProps from "./ChartWithProps";
import ChatMessages from "./ChatMessages";
import Messages from "./Messages";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Quotes from "./Quotes";
import ClientPage from "./ClientPage";
import { createBrowserHistory } from "history";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardWithProps from "./DashboardWithProps";
import HomePage from "./HomePage";

import swal from 'sweetalert';

const history = createBrowserHistory();
export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      type_of_user: localStorage.getItem("type_of_user"),
    };
    this.history = createBrowserHistory();
  }

  userLogin = (token, user_id, type_of_user) => {
    if(token!==undefined){
    this.setState({ token: token });
    this.setState({ user_id: user_id });
    this.setState({ type_of_user: type_of_user });
    localStorage.setItem("user_messages", []);
    return 1;
  }
    else{
      return 0;
    }
    // console.log("token:: " , this.state.token);
  };

  render() {
    return (
      <div className="my-app" style={{background:"inherit"}}>
        <Router history={history}>
          <AppLayout {...this.props}>
            <Switch>
              <Route
                exact
                path="/home"
                component={() => <HomePage userLogin={this.userLogin} />}
              />
              <Route
                exact
                path="/chat"
                component={() => <ChatbotPage user_id={this.state.user_id} />}
              />
              <Route
                exact
                path="/chats"
                component={() => <ChatMessages user_id={this.state.user_id} />}
              />
              <Route
                exact
                path="/login"
                component={() => <LoginPage userLogin={this.userLogin} />}
              />
              <Route
                exact
                path="/register"
                component={() => <RegisterPage />}
              />
              <Route exact path="/dash" component={() => <ClientPage user_id={localStorage.getItem("user_id")}/>} />
              <Route
                exact
                path="/user_profile"
                component={() => <UserProfile user_id={this.state.user_id} />}
              />
              <Route
                exact
                path="/therapist"
                component={() => <TherapistPage />}
              />
              <Route
                exact
                path="/messages"
                component={() => <ChatMessages />}
              />
              <Route path="/patient/:user_id" component={ClientPage} />
              <Route path="/chats/:user2" component={Messages} />
              <Route path="/quotes" component={Quotes} />
              {/* <Redirect from="*" to="/home" /> */}
            </Switch>
          </AppLayout>
        </Router>
      </div>
    );
  }
}

import React, {Component, Fragment,useState} from "react";
import {render} from "react-dom";
import HomePage from './HomePage';
import RoomJoinPage from './RoomJoinPage';
import Message from './Message';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Navigator from './Navigator';
import AppLayout from './AppLayout';
import UserProfile from './UserProfile';
import TherapistPage from './TherapistPage';
import ChartWithProps from './ChartWithProps';
import DonutChart from './DonutChart';
import ChatMessages from './ChatMessages';
import Messages from './Messages';

import {
    BrowserRouter as Router,
    Switch, Route,
    Link, Redirect, useHistory
} from "react-router-dom";
import { AppBar } from '@material-ui/core';

import DashPage from "./PieChart";
import ClientPage from "./ClientPage";
import { createBrowserHistory } from "history";


const history = createBrowserHistory();
export default class MyApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            type_of_user: localStorage.getItem('type_of_user'),
        }
        this.history = createBrowserHistory();
    }
    
    userLogin = (token, user_id, type_of_user) =>{
        this.setState({token: token});
        this.setState({user_id: user_id});
        this.setState({type_of_user: type_of_user});
        localStorage.setItem('user_messages',[]);
        // console.log("token:: " , this.state.token);
    
    }
    
    render(){
        return(
        <div className="my-app">
            <Router history={history}>
                <AppLayout {...this.props}>
                    <Switch>
                    <Route exact path='/home' component={HomePage} />
                    <Route exact path='/chat' component={() => <Message user_id={this.state.user_id}/>}/>
                    <Route exact path='/chats' component={() => <ChatMessages user_id={this.state.user_id}/>}/>
                    <Route exact path='/login' component={() => <Login userLogin={this.userLogin}/>} />
                    <Route exact path='/register' component={() => <Register/>} />
                    <Route exact path='/dash' component={() => <ClientPage/>} />
                    <Route exact path='/user_profile' component={() => <UserProfile/>} />
                    <Route exact path='/therapist' component={() => <TherapistPage/>} />
                    <Route exact path='/messages' component={() => <ChatMessages/>} />
                    <Route path='/patient/:user_id' component={ChartWithProps} />
                    <Route path='/chats/:user2' component={Messages}/>
                    {/* <Redirect from="*" to="/home" /> */}
                    </Switch>
                </AppLayout>
            </Router>
        </div>
    
        )
    }
}

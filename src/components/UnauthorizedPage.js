import React, {Component} from "react";
import {render} from "react-dom";
import Button from '@material-ui/core/Button'
import Login from './Login'

export default class UnauthorizedPage extends Component {
    constructor(props){
        super(props);
        console.log("PROPS home: ",props);
    }

    state = {
        data: ""
    }
    
    render(){     
        console.log(this.props.token) ; 
    // console.log("register");
        return  <h2> Unaothorized </h2>
    }
}
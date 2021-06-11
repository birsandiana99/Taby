import React, {Component} from "react";
import {render} from "react-dom";
import Button from '@material-ui/core/Button'

export default class RoomJoinPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props);
        return <h2>room join page </h2>
    }
}



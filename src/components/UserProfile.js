import React, {Component} from "react";

export default class UserProfile extends Component {
    constructor(props){
        super(props);
    }

    state = {
        user: localStorage.getItem("user_type")
    }
    
    render(){     
        console.log(localStorage.getItem("user_type"));
        return ( <div>
        <h2>HELLO {localStorage.getItem("user_type")}</h2> 
        
        </div>
        )
    }
}



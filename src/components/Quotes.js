import { Card, Button, IconButton } from "@material-ui/core";
import React, { Component } from "react";
import AddIcon from '@material-ui/icons/Add';
import { textAlign } from "@material-ui/system";

import $ from 'jquery';

export default class Quotes extends Component {
  state = {
    loading: true,
    data: []
  };

  async componentDidMount() {
    const user_id = localStorage.getItem("user_id");
    const urlQuotes = "http://127.0.0.1:8000/api/quotes";
    const response = await fetch(urlQuotes);
    const data = await response.json();
    let myData = [];
    for (const val of data) {
      myData = [...myData,{
            author_id: val["author_id"],
            text: val["quote_text"],
            date: val["date_added"]
      }];
    }

    this.setState({
      data: myData,
      loading: false,
    });
  }
  handleChange = (e) => {
    this.setState({ quote: e.target.value });
  };
  displayAddQuote = () =>{
      if(document.getElementById("quote").style.visibility === 'visible'){
        document.getElementById("quote").style.visibility='hidden';
      }
    document.getElementById("quote").style.visibility='visible';
  }

  sendQuote = () => {
    $.post("http://localhost:8000/api/quotes", {
        author_id: localStorage.user_id,
        quote_text: this.state.quote
      }).then((res) =>{this.forceUpdate();})
        .catch((err) => {
          console.log(err);
        });
        
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
            <div>
            <div className="icon-container">
              <AddIcon cursor="pointer" className="add-quote-icon" onClick={this.displayAddQuote}> </AddIcon>
              <div id="quote" style={{visibility:'hidden'}}>
                    <input onChange={(e) => this.handleChange(e)} id="quote_text"></input>
                    <button onClick={this.sendQuote}> Send </button>
              </div>
              </div>
            <div>
                    {this.state.data.map((item) => (
                    <div key={item["id"]}>
                        {/* <button onClick={localStorage.setItem(patient_to_view,item)}> */}
                        <Card className="patientCard" >
                        <label> Author: {item["author_id"]}</label>
                        <br />
                        <label> {item["text"]}</label>
                        <br />
                        <label> Date: {item["date"]}</label>
                        <br/>
                        {/* </button> */}
                        {/* <ChartWithProps user_id={item}/> */}
                        {/* {this.state.datesForJoining[item]} */}
                        </Card>
                    </div>
                    ))}
                </div>
        </div>)}
      </div>
    );
  }
}

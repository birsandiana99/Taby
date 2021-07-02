import React, { Component } from "react";
import { render } from "react-dom";
import UnauthorizedPage from "./UnauthorizedPage";
import $ from "jquery";
export default class ChatbotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      msg: "",
    };
  }

  handleChange = (e) => {
    this.setState({ msg: e.target.value });
  };
  handleSend = () => {
    if (this.state.msg != "") {
      $.get("http://localhost:8000/api/chatbot", {
        msg: this.state.msg,
        user: localStorage.user_id,
      })
        .then((res) => {
          if (
            res != "I do not understand..." &&
            localStorage.getItem("user_id")
          ) {
            $.post("http://localhost:8000/api/messages", {
              user_id: localStorage.user_id,
              message: this.state.msg,
              msg_date: Date.now(),
            })
              .then((res) => {})
              .catch((err) => {
                console.log(err);
              });
          }
          let ch = this.state.chat;
          ch.push({ from: "our", msag: this.state.msg });
          ch.push({ from: "cb", msag: res });
          this.setState({ chat: ch, msg: "" });
        })
        .catch((err) => {
          console.log(err);
        });

      this.forceUpdate();
    }
    let interval = window.setInterval(function () {
      var elem = document.getElementById("chatt");
      elem.scrollTop = elem.scrollHeight;
      window.clearInterval(interval);
    }, 5000);
  };

  render() {
    if (this.props.user_id == "") {
      return (
        <div>
          <UnauthorizedPage></UnauthorizedPage>
        </div>
      );
    }
    return (
      <div id="chatt">
        <div
          id="messagesContainer"
          style={{ overflowY: "auto", height: "63vh" }}
        >
          {this.state.chat.map((msg) => {
            if (msg.from == "cb") {
              return (
                <div >
                  <div id="chatbot-avatar"> </div>
                <div className="chat-message-bot"
                >
                  
                  {msg.msag}{" "}
                </div>
                </div>
              );
            } else {
              return (
                <div>
                
                <div className="user-message">
                  {msg.msag} 
                </div>
                <div id="user-avatar"> </div>
                </div>
              );
            }
          })}
        </div>
        {/* <div style={{ height: "2vh" }}> */}
          <div className="inputSendContainer">
          <input
            type="text"
            name="msg"
            onChange={(e) => this.handleChange(e)}
            onKeyDown={(e) => e.key === "Enter" && this.handleSend()}
            className="form-control"
            style={{ marginLeft: "150px", width: "80%", float: "left" }}
            value={this.state.msg}
          />
          <button
            onClick={() => this.handleSend()}
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
            className="btn btn-primary"
          >
            Send
          </button>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

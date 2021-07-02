import { React, Component } from "react";
import UnauthorizedPage from "./UnauthorizedPage";
import $ from "jquery";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      msg: "",
      // therapist: 0,
    };
  }

  handleChange = (e) => {
    this.setState({ msg: e.target.value });
  };
  handleSend = () => {
    if (this.state.msg !== "") {
      
      $.post("http://localhost:8000/api/chat_messages", {
        author_id: localStorage.user_id,
        text: this.state.msg,
        recipient_id: this.state.therapist,
      })
        .then((res) => {
          let ch = this.state.chat;
          ch.push({ from: "our", msag: this.state.msg });
          this.setState({msg: ""});
          this.forceUpdate();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  async componentDidMount() {
    const therapistResp = await fetch(
      "http://localhost:8000/api/therapist?user_id=" + localStorage.user_id
    );
    const dataTherapist = await therapistResp.json();
    this.setState({therapist: dataTherapist["id"]});

    this.setState({user_id: localStorage.getItem("user_id")});  
    const user_id = localStorage.getItem("user_id");
    const urlMessagesForUser =
      "http://127.0.0.1:8000/api/chats_for_user?user=" + user_id;
    const responseMessagesForUser = await fetch(urlMessagesForUser);
    const dataMessagesForUser = await responseMessagesForUser.json();
    
    let ch = this.state.chat;
    for (const val of dataMessagesForUser) {
      if (val["author_id"] === Number(this.state.user_id)) {
        ch.push({ from: "our", msag: val["text"] });
      }
      else{
        ch.push({ from: "cb", msag: val["text"] });
      }
      this.forceUpdate();
    }
  }
  render() {
    if (this.props.user_id === "") {
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
          if (msg.from === "cb") {
            return (
              <div >
                <div id="therapist-avatar"> </div>
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

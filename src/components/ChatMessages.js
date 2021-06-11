import {React, Component} from "react";
import {render} from "react-dom";
import UnauthorizedPage from "./UnauthorizedPage";

const $ = window.$;

export default class Message extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            chat:[],
            msg:'',
            therapist: 0
        }
    }


    
    handleChange = (e)=>{
        console.log(e.target.value);
        this.setState({msg:e.target.value});
        // console.log(this.state.chat)
    };
    handleSend = ()=>{
        if(this.state.msg != '')
        {
            $.get("http://localhost:8000/api/therapist?user_id="+ localStorage.user_id)
            .then(
                res=>{
                    this.state.therapist=res["id"];
                }
            )
            .catch(err=>{
                console.log(err);
            });
            console.log("DFDFSDFSFDSFSDFDSF",this.state.therapist);
            $.post("api/chat_messages", { author_id: localStorage.user_id, text: this.state.msg , recipient_id: 15})
            .then(
                res=>{
                    let ch = this.state.chat;
                    ch.push({from:'our',msag:this.state.msg});
                    this.state.msg='';
                    this.forceUpdate();
                }
            )
            .catch(err=>{
                console.log(err);
            });
            
            
        }
    };

    async componentDidMount() {
        const user_id = localStorage.getItem("user_id");
        const urlMessagesForUser = 'http://127.0.0.1:8000/api/chats_for_user?user_id='+user_id;
        const responseMessagesForUser = await fetch(urlMessagesForUser);    
        const dataMessagesForUser = await responseMessagesForUser.json();
        let dataMessages = []
        let ch = this.state.chat;
        // ch.push({from:'our',msag:this.state.msg});
        // ch.push({from:'cb',msag:res});
        for (const val of dataMessagesForUser){
            console.log("VAL::::",val);
            if(val["author_id"] == user_id){
                ch.push({from:'our',msag:val["text"]});
            }
            else{
                ch.push({from:'cb',msag:val["text"]});
            }
        this.forceUpdate();
        }

    }
    render()
    {
        if( this.props.user_id == ""){
            console.log("not logged in")
            return (
                <div>
                    <UnauthorizedPage></UnauthorizedPage>

                </div>

            )

        }
        return(
            <div  >
                <div id='chatt' style={{overflow:'scroll',overflowX:'hidden',height:'85vh'}}>
                    {
                        this.state.chat.map((msg)=>{
                            if(msg.from == 'cb')
                            {
                                return <div style={{flexWrap:'wrap',fontSize:'25px',fontFamily:'cursive',
                                marginBottom:'10px',borderRadius:'100px',marginRight:'500px',
                                padding:'30px',paddingBottom:'20px',width:'30%',
                                backgroundColor:'black',color:'white',float:'left',
                                display:'block'}}>{msg.msag} </div>
                            }
                            else{
                            return <div style={{flexWrap:'wrap',fontSize:'25px',fontFamily:'cursive',
                            marginBottom:'10px',borderRadius:'100px',marginLeft:'500px',
                            padding:'30px',paddingBottom:'20px',width:'30%',backgroundColor:'orange',
                            float:'right',display:'block',color:'whitesmoke'}}>{msg.msag}</div>
                            }
                        })
                    }
                </div>
                <div style={{height:'2vh'}}>
                    <input type='text' name='msg' 
                      onChange={(e)=>this.handleChange(e)} 
                      onKeyDown={e => e.key === 'Enter' && this.handleSend()}
                      className="form-control"
                      
                      style={{marginLeft:'150px',width:'80%',float:'left'}}
                      value={this.state.msg} />
                      <button onClick={()=>this.handleSend()} style={{paddingLeft:'25px',paddingRight:'25px'}} className="btn btn-primary">Send</button>
                </div>
            </div>
        );
    }
}

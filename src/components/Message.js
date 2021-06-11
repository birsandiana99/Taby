import React, {Component} from "react";
import {render} from "react-dom";
import UnauthorizedPage from "./UnauthorizedPage";
import $ from 'jquery';
export default class Message extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            chat:[],
            msg:''
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
            $.get("http://localhost:8000/api/chatbot", { msg: this.state.msg , user: localStorage.user_id})
            .then(
                res=>{
                if(res!="I do not understand..." && localStorage.getItem("user_id")){
                    $.post("http://localhost:8000/api/messages", { user_id: localStorage.user_id, message: this.state.msg , msg_date: Date.now()})
                    .then(
                        res=>{
                        }
                    )
                    .catch(err=>{
                        console.log(err);
                    });
                }
                let ch = this.state.chat;
                ch.push({from:'our',msag:this.state.msg});
                ch.push({from:'cb',msag:res});
                this.setState({chat:ch,msg:''});
            })
            .catch(err=>{
                console.log(err);
            });
            
            this.forceUpdate();
        }
        let interval = window.setInterval(function(){
            var elem = document.getElementById('chatt');
            elem.scrollTop = elem.scrollHeight;
            window.clearInterval(interval);
        },5000)
    };

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
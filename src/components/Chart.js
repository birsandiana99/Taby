import React, {Component} from "react";
import { Pie } from 'react-chartjs-2';
let messageData;
const getDataFromAPI = () =>{
  const user_id = localStorage.getItem("user_id");
  const url = 'http://127.0.0.1:8000/api/messages?user_id='+user_id;
  // const params = {user_id  user_id};

  return (fetch(url, {
      // user_id : user_id,
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then( data => data.json() ) 
    .then(respData => {
        let finalResp = []
        for (const val of respData){
            // finalResp = [...finalResp, val["message"]]
            finalResp = finalResp + " " +val["message"];
        }
        messageData = finalResp;
        // console.log(finalResp);
        
        return finalResp;
    })
    // .then(respData => {return(respData)})
    .catch( error => console.error(error)))
}
let finalData;
let mycounts;
const getCountersFromApi = () =>{
  let mydata = getDataFromAPI();
  mydata.then(
    mydata => 
      {
        return fetch('http://127.0.0.1:8000/api/counter?obj=' + mydata,{
          method: 'GET',
          // headers: {'Content-Type': 'application/json'}
        }).then(data => data.json() )
        .then(data=>{return data})
        .catch( error => console.error(error))
      }
    
    );       
}
const datax = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
export default class DashPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          messages_from_API: "",
          counters: {},
          data: ""
        };
        // console.log("PROPS home: ",props);
    }
    // getDataFromAPI = () =>{
    //   const user_id = localStorage.getItem("user_id");
    //   console.log("AICI");
    //   const url = 'http://127.0.0.1:8000/api/messages?user_id='+user_id;
    //   // const params = {user_id  user_id};
    
    //   return (fetch(url, {
    //       // user_id : user_id,
    //       method: 'GET',
    //       headers: {'Content-Type': 'application/json'}
    //     })
    //     .then( data => data.json() ) 
    //     .then(respData => {
    //         let finalResp = []
    //         for (const val of respData){
    //             finalResp = [...finalResp, val["message"]]
    //             // finalResp = finalResp + " " +val["message"];
    //         }
    //         messageData = finalResp;
    //         console.log("AAAAAA",messageData);
            
    //         return finalResp;
    //     }).then(this.setState(() => {return {messages_from_API:messages_from_API +  finalResp}}))
    //     // .then(respData => {return(respData)})
    //     .catch( error => console.error(error)))
    // }
    // var = getDataFromAPI()
    
    // var.then(res=>console.log(res))
    // state = {
    //     data: ""
    // }
    
    render(){    
      let mydata = getDataFromAPI();
      mydata.then(data => console.log(data));
      // my_data = getCountersFromApi().then(data=> data);
      
      // console.log(my_data.then(d => {return d}));
      // console.log("DSFSDfsdf",mycounts);
      // let counter = getCountersFromApi(mydata[0]);
      // counter.then(mydata => console.log("dsfdsfs",mydata)); 
        // console.log(this.props.token) ; 
    // console.log("register");
      // this.getDataFromAPI()
      console.log("gggggg",this.state.messages_from_API);
        return ( 
        localStorage.token ?
        <div>
        <h2>HELLO</h2> <Pie data={datax}></Pie> 
        </div> 
        : 
        <div></div>
        )
    }
}



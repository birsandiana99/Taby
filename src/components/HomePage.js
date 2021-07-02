import React, { Component } from "react";



export default class HomePage extends Component {

  state = {
    data: "",
  };

  render() {
    return (
      <div>
        {
          
          (localStorage.getItem("user_type") === 'therapist') ?
          (
          <div className="home-page-container">
            <h1>Welcome to TABY</h1>
            <div>TABY wishes to provide therapists all around the world an easy and
               simple tool for sharing with their patients. While they are offered 
               a chance to chat with our specialist, feel free to check out your
               <a href='/therapist'> patient list</a>.


              </div>
          </div>
          )

          :(
            <div className="home-page-container">
          <h1>Welcome to TABY</h1>
        <div>
        TABY is offering support for therapy all around the world, in a simple and accessible web application.
        We wish to support you to a journey of becoming the best version of yourself and overcoming your fears.
        Chat with TABY <a href='/chat'>here</a> or view your dashboard page <a href='/dash'>here</a>
        </div>
        </div>
        
        )}




        </div>
    );
  }
}

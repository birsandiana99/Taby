import { TodayTwoTone } from "@material-ui/icons";
import React, { Component } from "react";
import { Bar, Pie, PolarArea, Radar } from "react-chartjs-2";

export default class PieGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hasData: false,
    };
  }

  async componentDidMount() {
    
  }
  render() {
    return (
      <div>
        {this.state.loading && this.state.hasData ? (
          <div>loading...</div>
        ) : (
                 <div className="chartContainer" style={{width:"500px", height:"auto"}} >
                <Bar data={this.state.data} /> </div>
            )} 
      </div>
    );
  }
}

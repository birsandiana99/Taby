import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
// const ChartWithProps = (props) => {
//     // const params = useParams();
//     console.log(props);
//     const userID = props.match.params.user_id;
//     console.log("ASDDDDDDDD",userID);
//     return <div>dfgdfgfd</div>;
// }
// export default withRouter(ChartWithProps);

// const appDiv = document.getElementById("dashboard");
// render(<ChartWithProps name="dash"/>, appDiv);
export default class ChartWithProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      person: null,
      dataMessagesForUser: null,
      dataCounterForMessages: null,
    };
  }

  async componentDidMount() {
    // const user_id = this.props.user_id;
    console.log("PROPS:", this.props);
    const user_id = this.props.match.params.user_id;
    console.log("USERID", user_id);
    // console.log("DFGDGSF ", user_id );
    const urlMessagesForUser =
      "http://127.0.0.1:8000/api/messages?user_id=" + user_id;
    const responseMessagesForUser = await fetch(urlMessagesForUser);
    const dataMessagesForUser = await responseMessagesForUser.json();
    let dataMessages = [];
    for (const val of dataMessagesForUser) {
      // dataMessages = [...dataMessages, val["message"]]
      dataMessages = dataMessages + " " + val["message"];
    }

    const urlCounterForMessages =
      "http://127.0.0.1:8000/api/counter?obj=" + dataMessages;
    const responseCounterForMessages = await fetch(urlCounterForMessages);
    const dataCounterForMessages = await responseCounterForMessages.json();
    console.log(dataCounterForMessages);

    let labels = Object.keys(dataCounterForMessages);
    console.log(labels);

    let datax = {
      labels: labels.slice(0, 5),
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(dataCounterForMessages).slice(0, 5),
          backgroundColor: [
            "#8a3ffc",
            "#08bdba",
            "#4589ff",
            "#ff7eb6",
            "#d4bbff"
          ],
          borderColor: [
            "#7c38e2",
            "#07aaa7",
            "#3e7be5",
            "#e571a3",
            "#bea8e5",
          ],
          borderWidth: 1,
        },
      ],
    };
    console.log(dataMessages);
    console.log(dataCounterForMessages);
    this.setState({
      dataMessagesForUser: dataMessages,
      dataCounterForMessages: dataCounterForMessages,
      data: datax,
      loading: false,
    });
  }
  render() {
    console.log("GOOOd");
    return (
      <div>
        {this.state.loading ? (
          <div>loading...</div>
        ) : (
          <div>
            <Pie data={this.state.data}></Pie>
          </div>
        )}
      </div>
    );
  }
}

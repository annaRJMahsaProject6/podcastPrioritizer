import React, { Component } from "react";
import axios from "axios";

class Podcast extends Component {
  constructor() {
    super();
    this.state = {
        podcastList: [],
        userInput: ""
    }
  }

  componentDidMount() {
    axios({
      url: "https://listen-api.listennotes.com/api/v2/search",
      method: "GET",
      headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
      dataResponse: "jsonp",
      params: {
        q: "dog",
        type: "episode"
      },
    }).then((response) => {
      console.log(response);
      this.setState({
        podcastList: response.data.results,
      });
    });
  }

  render() {
      return(
        <div></div>
      )
  }


}

export default Podcast;

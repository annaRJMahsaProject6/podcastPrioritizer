import React, { Component } from "react";


class Podcast extends Component {
  constructor() {
    super();
    this.state = {
        podcastInput: ""
    }
  }
  handleChange=(event)=>{
    this.setState({
      podcastInput:event.target.value
    })
    

  }
  render() {
      // user podcast selection form
      return(
        <form>
          <label htmlFor="podcast"></label>
          <input className="input-search" type="text" id="podcast" value={this.state.podcastInput} onChange={this.handleChange}/>
          <button type="submit" onClick={(event)=>{this.props.submitForm(event, this.state.podcastInput)}}></button>
        </form>
      )
  }
}

export default Podcast;

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
        <section className="whatToListen">
        <form className="search-form wrapper">
          <div className="inputContainer"> 
          <label htmlFor="podcast"></label>
          <input placeholder="e.g. finance, pets, health" className="podcast-search" type="text" id="podcast" value={this.state.podcastInput} onChange={this.handleChange}/>
          <button type="submit" onClick={(event)=>{this.props.submitForm(event, this.state.podcastInput)}}>Search</button>
          </div>
        </form>
        </section>
      )
  }
}

export default Podcast;

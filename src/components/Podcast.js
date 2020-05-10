import React, { Component } from "react";


class Podcast extends Component {
  constructor() {
    super();
    this.state = {
        podcastInput: ""
    }
    this.podcastRef = React.createRef();
  }
  componentDidMount(){
    this.scroll(this.podcastRef);
  }
  componentDidUpdate(){
    this.scroll(this.podcastRef);
  }

  handleChange=(event)=>{
    this.setState({
      podcastInput:event.target.value
    })
  }
  scroll(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }
  
  render() {
      // user podcast selection form
      return (
        <section className="whatToListen">
        <div className="whatToListenContainer wrapper">
          <form className="search-form podcastSearchForm wrapper">
            <h2 ref={this.podcastRef} className="podcastSearchHeader">What to Listen to?</h2>
            <div className="podcastSearchInput">
              <label htmlFor="podcast"></label>
              <input
                placeholder="Your topic of interest (e.g. finance, pets, health)"
                className="podcast-search"
                type="text"
                id="podcast"
                value={this.state.podcastInput}
                onChange={this.handleChange}
              />
              <button
                type="submit"
                onClick={(event) => {
                  this.props.submitForm(event, this.state.podcastInput);
                  this.props.loadPodcastList();
                }}
              >
                Search
              </button>
            </div>
          </form>
          <ol className="whatToListenInstructions">
            <h3>Instructions</h3>
            <li>
              Type your topic of interest into the input field above and
              click search once you are ready.
            </li>
            <li>
              Afterwards, you will be automatically directed to a list of curated
              podcasts selected based on your chosen topic and the length of
              your commute.
            </li>
            <li>
              Click the listen button to hear a podcast. Happy listening!
            </li>
          </ol>
          </div>
        </section>
      );
  }
}

export default Podcast;

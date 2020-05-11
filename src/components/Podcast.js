import React, { Component } from "react";
import scrollTo from "../helper/scrollTo";
// Component to search for podcast
class Podcast extends Component {
  constructor() {
    super();
    this.state = {
      podcastInput: "",
    };
    this.podcastRef = React.createRef();
  }
  // On mounting scroll to Podcast list returned
  // @params: no-params
  componentDidMount() {
    scrollTo(this.podcastRef);
  }
  // On Updating component scroll to Podcast list returned
  // @params: no-params
  componentDidUpdate() {
    scrollTo(this.podcastRef);
  }
  // When user enter a new item
  // @params: event - onChange
  handleChange = (event) => {
    this.setState({
      podcastInput: event.target.value,
    });
  };

  // Render the component on page
  render() {
    // user podcast selection form
    return (
      <section className="whatToListen">
        <div className="whatToListenContainer wrapper">
          <form className="searchForm podcastSearchForm">
            <h2 ref={this.podcastRef} className="podcastSearchHeader">
              <span>What To Listen To?</span>
            </h2>
            <div className="dividerContainer">
              <div className="dividerYellow dividerLeftReverse dividerLeft"></div>
              <div className="dividerYellow dividerLeftReverse dividerRight"></div>
            </div>
            <div className="podcastSearchInput">
              <label htmlFor="podcast"></label>
              <input
                placeholder="Your topic of interest (e.g. finance, pets, health)"
                className="podcastSearch"
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
              Type your topic of interest into the input field above and click
              search once you are ready.
            </li>
            <li>
              Afterwards, you will be automatically directed to a list of
              curated podcasts based on your chosen topic and the length of your
              commute.
            </li>
            <li>Click the listen button to hear a podcast. Happy listening!</li>
          </ol>
        </div>
      </section>
    );
  }
}

export default Podcast;
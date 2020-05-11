import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <section className="hero wrapper">
          <div className="whiteBlock">
            <h1>Podcast Prioritizer</h1>
            <div className="heroTextContainer">
              <p className="heroTextTagline">
                Say goodbye to dull and boring commutes!
              </p>
              <p className="heroText">
                Podcast Prioritizer will fill your long and uneventful commutes
                with informative and juicy podcasts for your listening pleasure.
                Simply enter your starting location, desired destination and
                topic of interest and we will suggest a lists of podcasts based
                on the length of your journey.{" "}
                <button
                  className="startLink"
                  aria-label="Click here to proceed to the next section"
                  onClick={this.props.goToInput}
                >
                  &nbsp;Let's Start!
                </button>
              </p>
            </div>
          </div>
        </section>
    );
  }
}

export default Header;
import React, { Component } from "react";
import ReadMoreAndLess from "react-read-more-less";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PodcastDisplay extends Component {

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  render() {
    // console.log(this.props.podcastList);
    return (
      <section className="podcastContainer">
        <h2 className="podcastHeader">Pick Your Podcast</h2>
        <ul className="podcastGrid wrapper">
          {this.props.podcastList.map((podcast) => {
            return (
              <li className="podcastList">
                <div className="podcastImgContainer">
                  <img
                    src={podcast.thumbnail}
                    alt=""
                    className="podcastImg"
                  />
                  <button className="audioButton" 
                  onClick={()=>this.props.getAudioItem(podcast)}>
                    <FontAwesomeIcon icon={faHeadphones} />
                    &nbsp;Listen
                  </button>
                </div>
                <div className="podcastInfo">
                  <h3>{podcast.title_original}</h3>
                  <ReadMoreAndLess
                    ref={this.Readmore}
                    charLimit={200}
                    readMoreText="Read More"
                    readLessText="&nbsp;Read Less"
                  >
                    {podcast.description_original}
                  </ReadMoreAndLess>
                  <p className="podcastLength">
                    Length: {Math.floor(podcast.audio_length_sec / 60)} minutes
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default PodcastDisplay;

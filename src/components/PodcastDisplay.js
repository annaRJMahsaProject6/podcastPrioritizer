import React, { Component } from "react";
import ReadMoreAndLess from "react-read-more-less";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Preloader from "./Preloader";

class PodcastDisplay extends Component {
  constructor() {
    super();
    this.podcastListRef = React.createRef();
  }

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  componentDidUpdate(){
    this.scroll(this.podcastListRef);
  }
  componentDidMount(){
    this.scroll(this.podcastListRef);
  }
  scroll(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }
  render() {
    return (
      <section className="podcastDisplay">
        <div className="wrapper">
          <h2 ref={this.podcastListRef} className="podcastHeader">Pick Your Podcast</h2>
          {this.props.isLoadingPodcast ? <Preloader styleName="PodcastDisplay"/> : null}
          {this.props.isLoadingPodcast ? null : (
            <ul className="podcastGrid ">
              {this.props.podcastList.map((podcast) => {
                return (
                  <li className="podcastList" key={podcast.id}>
                    <div className="podcastImgContainer">
                      <img
                        src={podcast.thumbnail}
                        alt={podcast.title_highlighted}
                        className="podcastImg"
                      />
                      <button
                        className="audioButton"
                        onClick={() => this.props.getAudioItem(podcast)}
                      >
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
                        Length: {Math.floor(podcast.audio_length_sec / 60)}{" "}
                        minutes
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    );
  }
}

export default PodcastDisplay;

import React, { Component } from "react";
import ReadMoreAndLess from "react-read-more-less";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Preloader from "./Preloader";
import scrollTo from '../helper/scrollTo';
// Component to display the podcast list on page
class PodcastDisplay extends Component {
  constructor() {
    super();
    this.state = {
      podcastList: []
    }
    this.podcastListRef = React.createRef();
  }
  // Methods to set state for Read more or less
  // @params: no-params
  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });
  // Update podcastList and scroll to it on update
  // @params: pervProps - Previous Props, prevState - previous State
  componentDidUpdate(prevProps, prevState) {
    if (this.props.podcastList !== prevState.podcastList) {
      this.setState({
        podcastList: this.props.podcastList
      })
      scrollTo(this.podcastListRef);
    }
  }
  // Scroll to list on mounting
  // @params: no-params
  componentDidMount() {
    this.setState({
      podcastList: this.props.podcastList
    })
    scrollTo(this.podcastListRef);
  }
  
  // Render the component on page
  render() {
    return (
      <section className="podcastDisplay">
        <div className="wrapper">
          <h2 ref={this.podcastListRef} className="podcastHeader"><span>Pick Your Podcast</span></h2>
          <div className="dividerContainer">
            <div className="dividerBlue dividerLeftReverse dividerLeft"></div>
            <div className="dividerBlue dividerLeftReverse dividerRight"></div>
          </div>
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

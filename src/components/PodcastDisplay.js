import React, { Component } from "react";
import ReadMoreAndLess from "react-read-more-less";

class PodcastDisplay extends Component {
  constructor() {
    super();
    this.state = {
      isAudioPlaying: false,
    };
  }

  // thank you Salvatore https://stackoverflow.com/questions/39779527/toggle-play-pause-in-react-with-audio

  audio = new Audio();

  showMore = () => this.setState({ showAll: true });
  showLess = () => this.setState({ showAll: false });

  playAudio = (audio) => {
    console.log(typeof audio);
    console.log("play");
    this.setState({
      isAudioPlaying: true,
    });
    this.audio.src = audio;
    this.audio.play();
  };

  pauseAudio = () => {
    console.log("pause");
    this.setState({
      isAudioPlaying: false,
    });
    this.audio.pause();
  };

  render() {
    console.log(this.props.podcastList);
    return (
      <section className="podcastContainer">
        <h2 className="podcastHeader">Pick Your Podcast</h2>
        <ul className="podcastGrid wrapper">
          {this.props.podcastList.map((podcast) => {
            return (
              <li className="podcastList">
                <div className="podcastImgContainer">
                  <img
                    onClick={
                      this.state.isAudioPlaying
                        ? this.pauseAudio
                        : () => {
                            this.playAudio(podcast.audio);
                          }
                    }
                    src={podcast.thumbnail}
                    alt=""
                    className="podcastImg"
                  />
                  <button className="audioButton">Listen</button>
                </div>
                <div className="podcastInfo">
                  <h3>{podcast.title_original}</h3>
                  <ReadMoreAndLess
                    ref={this.Readmore}
                    charLimit={250}
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

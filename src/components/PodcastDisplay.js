import React,{Component} from 'react';

class PodcastDisplay extends Component {
  constructor() {
    super();
    this.state = {
      isAudioPlaying: false,
    };
  }

  // thank you Salvatore https://stackoverflow.com/questions/39779527/toggle-play-pause-in-react-with-audio

  audio = new Audio();

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
    return (
      <ul>
        {this.props.podcastList.map((podcast) => {
          return (
            <li>
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
              />
              <h3>{podcast.title_original}</h3>
              <p>Length: {Math.floor(podcast.audio_length_sec / 60)} minutes</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default PodcastDisplay;
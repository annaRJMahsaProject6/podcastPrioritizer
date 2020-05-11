import React, { Component } from "react";
import Swal from "sweetalert2";
import scrollTo from '../helper/scrollTo';
// Component that receives the audio file and plays it
class AudioPlayer extends Component {
    constructor() {
        super();
        this.state = {
            isAudioPlaying: false,
            toggleButton: "▶️",
            progress: "",
            timeLeft: "00:00",
            mouseDown: false,
            audioFile: "",
            callNumber:0
        };
        this.progressBar = React.createRef();
        this.audioPlayerRef = React.createRef();    
    }
    // thank you Salvatore @ stackoverflow.com (https://stackoverflow.com/questions/39779527/toggle-play-pause-in-react-with-audio)
    // Declare global audio file
    audio = new Audio();
    // On update update the audio file and scroll to player
    // @params: prevProps - previous Props, prevState - Previous State
    componentDidUpdate(prevProps, prevState) {
        if (this.props.audioToPlay.audio !== prevState.audioFile) {
            this.setAudio();
            scrollTo(this.audioPlayerRef);
        }
    }
    // Set initial state on component mounting
    componentDidMount() {
        this.setState({
            isAudioPlaying: false,
            toggleButton: '▶️'
        })
        this.audio.src = this.props.audioToPlay.audio;
        this.audio.ontimeupdate = this.handleProgress;
        setTimeout(this.playAudio, 1000);
        scrollTo(this.audioPlayerRef);
    }
    // Helper method to return the time in 00:00:00 format from seconds
    // @params: timeLeft - time in seconds
    getFormattedTime = (timeLeft) => {
        const hour = Math.floor(timeLeft / (60 * 60));
        let mins = Math.floor(timeLeft / 60) % 60;
        let seconds = timeLeft % 60;
        mins = mins < 10 && mins >= 0 ? "0" + mins : mins;
        seconds = seconds < 10 && seconds >= 0 ? "0" + seconds : seconds;
        timeLeft = hour ? `${hour}:${mins}:${seconds}` : `${mins}:${seconds}`;
        return timeLeft;
    };
    // Set the audio to new audio on component update or initial
    // @params: no-params
    setAudio = () => {
        const newAudio = this.props.audioToPlay;
        this.setState({
            isAudioPlaying: false,
            toggleButton: '▶️',
            progress: '0',
            audioFile: newAudio.audio,
            timeLeft: this.getFormattedTime(newAudio.audio_length_sec)
        })
        this.audio.src = newAudio.audio;
        this.audio.currentTime = 0;
        setTimeout(this.playAudio,1000);
    }
    // Message to show on wrong audio file
    // @params: no-params
    showAlert = ()=>{
        Swal.fire({
            title: "Uh-oh!",
            text: "This audio is not available at the moment. Please select another podcast!",
            confirmButtonText: "OK",
            padding: "2rem",
        });
    }
    // Play the audio file if exists
    // @params: no-params, uses global audio variable
    playAudio = () => {
        let flag = false;
        if(!this.audio.duration){
            if(!this.state.callNumber){
                setTimeout(()=>{
                        this.playAudio();
                        this.setState({callNumber:1})}
                    ,2000);
            }else{
                flag = true;
            }
        }
        else{
            this.setState({
                isAudioPlaying: true,
                toggleButton: '❚ ❚',
            });
            this.audio.play();
        }
        if(flag)this.showAlert();
    };
    // Pause the audio file if playing
    // @params: no-params, uses global audio variable
    pauseAudio = () => {
        this.setState({
            isAudioPlaying: false,
            toggleButton: '▶️'
        });
        this.audio.pause();
    };
    // Play file if paused or vice-versa
    // @params: no-params
    togglePlay = () => {
        if (this.state.isAudioPlaying) { this.pauseAudio() }
        else { this.playAudio(); }
    }
    // Scrub audio file to go to where user click on audio progress
    // @params: event - mouse move event on progress bar
    scrubAudio = (event) => {
        event.persist();
        const scrubTime = (event.nativeEvent.offsetX / this.progressBar.current.offsetWidth) * this.audio.duration;
        this.audio.currentTime = scrubTime;
    }
    // Handles the progress bar while audio is playing
    // @params: no-params
    handleProgress = () => {
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        let timeLeft = Math.floor(this.audio.duration - this.audio.currentTime);
        timeLeft = this.getFormattedTime(timeLeft);
        if (percent) {
            this.setState({
                timeLeft: timeLeft,
                progress: `${percent}`
            })
        }
    }
    // Method to render the component on page
    render() {
        const selectedAudio = this.props.audioToPlay;
        return (
            <div className="wrapper audioWrapper">
                <h2 className="audioHeader"><span>Your Podcast</span></h2>
                <div className="dividerContainer">
                    <div className="dividerYellow dividerLeftReverse dividerLeft"></div>
                    <div className="dividerYellow dividerLeftReverse dividerRight"></div>
                </div>
                <div className="playerThumbnail">
                    <img 
                    src={selectedAudio.thumbnail} 
                    alt={selectedAudio.title} />
                </div>
                <div ref={this.audioPlayerRef} className="audioControl">
                    <button
                        className="playerButton toggle" title="Toggle Play"
                        onClick={() => this.togglePlay()}>{this.state.toggleButton}
                    </button>
                    <div className="progress"
                        ref={this.progressBar}
                        onMouseDown={() => this.setState({ mouseDown: true })}
                        onMouseUp={() => this.setState({ mouseDown: false })}
                        onMouseMove={(event) => this.state.mouseDown && this.scrubAudio(event)}
                    >
                        <div className="progressFilled" style={{ flexBasis: `${this.state.progress}%` }}></div>
                    </div>
                    <p className="timeLeft">{this.state.timeLeft}</p>
                </div>
            </div>
        )
    }
};
export default AudioPlayer;

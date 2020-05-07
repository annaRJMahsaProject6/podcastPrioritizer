import React,{Component} from  'react';

class AudioPlayer extends Component{
    
    constructor() {
        super();
        this.progressBar = React.createRef();
        this.state = {
            isAudioPlaying: false,
            toggleButton:'▶️',
            progress:'',
            timeLeft:'00:00',
            mouseDown:false,
            audioFile:'',
        };
    }


    // thank you Salvatore @ stackoverflow.com (https://stackoverflow.com/questions/39779527/toggle-play-pause-in-react-with-audio)
    audio = new Audio();

    // here first check if there is any difference in state and props received
    componentDidUpdate(prevProps, prevState) {
        if (this.props.audioToPlay.audio !== prevState.audioFile) {
            this.setAudio();
        }
    }
    
    componentDidMount(){
        this.setState({
            isAudioPlaying: false,
            toggleButton:'▶️'
        })
        this.audio.src = this.props.audioToPlay.audio;
        this.audio.ontimeupdate = this.handleProgress;
    }
    setAudio=()=>{
        const newAudio = this.props.audioToPlay;
        this.setState({
            isAudioPlaying: false,
            toggleButton: '▶️',
            progress:'0',
            audioFile:newAudio.audio,
            timeLeft:this.getFormattedTime(newAudio.audio_length_sec)
        })
        this.audio.src = newAudio.audio;
        this.audio.currentTime = 0;
    }
    playAudio = () => {
        this.setState({
            isAudioPlaying: true,
            toggleButton:'❚ ❚',
        });
        this.audio.play();
    };

    pauseAudio = () => {
        this.setState({
            isAudioPlaying: false,
            toggleButton: '▶️'
        });
        this.audio.pause();
    };
    togglePlay = ()=>{
        if(this.state.isAudioPlaying)
        {this.pauseAudio()}
        else{this.playAudio();}
    }
    scrubAudio= (event)=>{
        event.persist();
        const scrubTime = (event.nativeEvent.offsetX / this.progressBar.current.offsetWidth) * this.audio.duration;
        this.audio.currentTime = scrubTime;
    }
    getFormattedTime=(timeLeft)=>{
        const hour = Math.floor(timeLeft / (60 * 60))
        let mins = Math.floor(timeLeft / 60) % 60;
        let seconds = timeLeft % 60;
        mins = mins < 10 && mins >= 0 ? '0' + mins : mins;
        seconds = seconds < 10 && seconds >= 0 ? '0' + seconds : seconds;
        timeLeft = hour ? `${hour}:${mins}:${seconds}` : `${mins}:${seconds}`;
        return timeLeft;
    }
    handleProgress = ()=>{
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        let timeLeft = Math.floor(this.audio.duration - this.audio.currentTime);
        timeLeft = this.getFormattedTime(timeLeft);
        if(percent){
            this.setState({
                timeLeft: timeLeft,
                progress: `${percent}`
            })
        }
    }
    render(){
        // window.scrollTo(0, document.body.scrollHeight);
        const selectedAudio = this.props.audioToPlay;
        return(
            <div className="audioPlayer wrapper">
                <img src={selectedAudio.thumbnail} alt={selectedAudio.title}/>
                <div className="audioControl">
                    <button 
                        className="playerButton toggle" title="Toggle Play"
                        onClick={()=>this.togglePlay()}>{this.state.toggleButton}
                    </button>
                    <div className="progress" 
                        ref={this.progressBar}
                        onMouseDown={()=>this.setState({mouseDown:true})}
                        onMouseUp={()=>this.setState({mouseDown:false})}
                        onMouseMove={(event)=> this.state.mouseDown && this.scrubAudio(event)}
                    >
                        <div className="progressFilled" style={{flexBasis:`${this.state.progress}%`}}></div>
                    </div>
                    <p className="timeLeft">{this.state.timeLeft}</p>
                </div>
            </div>
        )
    }
}

export default AudioPlayer;
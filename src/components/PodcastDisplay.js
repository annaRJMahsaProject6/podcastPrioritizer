import React,{Component} from 'react';

class PodcastDisplay extends Component{
    constructor(){
        super();
    }

    render(){

        return(
            <ul>
                {this.props.podcastList.map((podcast)=>{
                    return (
                        <li>
                            <img onClick={()=>{
                                new Audio(podcast.audio).play()}} 
                                src={podcast.thumbnail} 
                                alt=""/>
                            <h3>{podcast.title_original}</h3>
                            <p>Length: {Math.floor(podcast.audio_length_sec / 60)} minutes</p>
                            
                        </li>
                    )
                })
                }
            </ul>
        )
    }
}

export default PodcastDisplay;
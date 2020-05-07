import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import Map from './components/Map';
import Header from './components/Header';
import Podcast from './components/Podcast';
import TravelType from './components/TravelType';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faWalking, faBiking } from '@fortawesome/free-solid-svg-icons';
import PodcastDisplay from './components/PodcastDisplay';


library.add(fab, faWalking, faBiking)
class App extends Component {
  constructor(){
    super()
    this.state={
      staticMapUrl:'',
      formatedWalkTime:"",
      formatedCycleTime:"",
      walkTime:"",
      cycleTime:"",
      podcastList: [],
      travelType:"",
    }
  }
  handleAddressSubmit=(event,fromInput,toInput)=>{
        // getting travel time and static map from map quest API
          event.preventDefault();
              axios({
              url:'https://www.mapquestapi.com/staticmap/v5/map',
              method: 'GET',
              responseType: 'json',
              params: {
                  key: 'ozwRV4KrZgLGMjKBYbnTIZBWQAN4JZBn',
                  start:fromInput,
                  end:toInput,
                  // start:"312 horsham ave, northyork, ontario",
                  // end:"9205 yonge st, richmonhill, ontario",
                  size:'400,400',
                  countryCode:'CA',
                  routeColor:'F97068',
                  routeWidth: 5,
              }
              }).then((result)=>{
              this.setState({
                  staticMapUrl:result.request.responseURL
              })
              })
          // getting pedestrian travel time
          axios({
              method:'GET',
              url:'http://www.mapquestapi.com/directions/v2/route',
              params:{
                  key:"TpZYQMsUgBgXUKt2b3xmQCxKpHB7JWoS",
                  // from:fromInput,
                  // to:toInput,
                  from:"312 horsham ave, northyork, ontario",
                  to:"9205 yonge st, richmonhill, ontario",
                  routeType:'pedestrian',
                  unit:'k',
              }
          }).then((result)=>{
              //  console.log(result.data.route)
              this.setState({
                  formatedWalkTime:result.data.route.formattedTime,
                  walkTime:result.data.route.time
              })
            
          })
      // getting cycling travel time
      axios({
          method:'GET',
          url:'http://www.mapquestapi.com/directions/v2/route',
          params:{
              key:"TpZYQMsUgBgXUKt2b3xmQCxKpHB7JWoS",
              // from:fromInput,
              // to:toInput,
              from:"312 horsham ave, northyork, ontario",
              to:"9205 yonge st, richmonhill, ontario",
              routeType:'bicycle',
              unit:'k',
          }
      }).then((result)=>{
          console.log(result.data.route)
          this.setState({
              formatedCycleTime:result.data.route.formattedTime,
              cycleTime:result.data.route.time
          })
          })
  }
  handlePodcastSubmit=(event, podcastInput)=>{
    event.preventDefault();
    let travelTime=0
    if(this.state.travelType==="walk"){
      travelTime=Math.floor((this.state.walkTime)/60)
    }
    else if(this.state.travelType==="cycle"){
      travelTime=Math.floor((this.state.cycleTime)/60)
    }
    const minLength=travelTime-5
    const maxLength=travelTime+5
    axios({
      url: "https://listen-api.listennotes.com/api/v2/search",
      method: "GET",
      headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
      dataResponse: "jsonp",
      params: {
          q: podcastInput,
          type: "episode",
          len_min:minLength,
          len_max:maxLength,

      },
      }).then((result) => {
      console.log(result);
          this.setState({
              podcastList: result.data.results
          })
      }); 
  }
  handleChoice=(id)=>{
    console.log(id)
      this.setState({
        travelType:id
      })
  }
  render() {
    return (
      <div className="App">
        <Header /> 
        <Map submitForm={this.handleAddressSubmit} />
        <Podcast  submitForm={this.handlePodcastSubmit}
      />
      {this.state.formatedWalkTime !== "" ? <TravelType walkTime={this.state.formatedWalkTime} cycleTime={this.state.formatedCycleTime} chooseTravelType={this.handleChoice}></TravelType> : <section></section>}
      <section className="route-map">
        <img src={this.state.staticMapUrl} alt="Route on map"/>
      </section>
      <section>
        <PodcastDisplay podcastList={this.state.podcastList}/>
      </section>
      </div>  
    );
  }
}

export default App;
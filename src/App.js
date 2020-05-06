import React, { Component } from 'react';
import './App.scss';
import axios from 'axios'
import Map from './components/Map';
import Header from './components/Header';
import Podcast from './components/Podcast'


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
                  size:'400,400',
                  countryCode:'CA',
                  zoom:10
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
                  from:fromInput,
                  to:toInput,
                  routeType:'pedestrian',
                  unit:'k',
              }
          }).then((result)=>{
               console.log(result.data.route)
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
              from:fromInput,
              to:toInput,
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
  handlePodcasSubmit=(event, podcastInput)=>{
    event.preventDefault();
    axios({
      url: "https://listen-api.listennotes.com/api/v2/search",
      method: "GET",
      headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
      dataResponse: "jsonp",
      params: {
          q: podcastInput,
          type: "episode",

      },
      }).then((result) => {
      console.log(result);
          this.setState({
              podcastList: result.data.results
          })
      }); 
  }
  
  render() {
    return (
      <div className="App">
        <Header /> 
        <Map submitForm={this.handleAddressSubmit} />
        <Podcast  submitForm={this.handlePodcasSubmit}
      />
      <section className="route-map">
        <img src={this.state.staticMapUrl} alt="Route on map"/>
      </section>
      </div>  
    );
  }
}

export default App;
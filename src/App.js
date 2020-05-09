import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import Map from "./components/Map";
import Header from "./components/Header";
import Podcast from "./components/Podcast";
import TravelType from "./components/TravelType";
import PodcastDisplay from "./components/PodcastDisplay";
import AudioPlayer from "./components/AudioPlayer";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faWalking, faBiking } from "@fortawesome/free-solid-svg-icons";
library.add(fab, faWalking, faBiking);

class App extends Component {
  constructor() {
    super();
    this.state = {
      staticMapUrl: "",
      formatedWalkTime: "",
      formatedCycleTime: "",
      walkTime: "",
      cycleTime: "",
      podcastList: [],
      travelType: "",
      audio: "",
    };
  }
  
  handleAddressSubmit=(event, fromInput, toInput)=>{
    // getting travel time and static map from map quest API
    event.preventDefault();
    axios({
      url: "https://www.mapquestapi.com/staticmap/v5/map",
      method: "GET",
      responseType: "json",
      params: {
        key: "ozwRV4KrZgLGMjKBYbnTIZBWQAN4JZBn",
        format: "png",
        start: fromInput,
        end: toInput,
        size: "500,200@2x",
        countryCode: "CA",
        routeColor: "F97068",
        routeWidth: 5,
      },
    }).then((result) => {
      console.log("map API", result);
      this.setState({
        staticMapUrl: result.request.responseURL,
      });
    });
    
    // getting pedestrian travel time
    if (fromInput !== "" && toInput !== "") {
     axios({
        method: "GET",
        url: "https://www.mapquestapi.com/directions/v2/route",
        params: {
          key: "TpZYQMsUgBgXUKt2b3xmQCxKpHB7JWoS",
          from: fromInput,
          to: toInput,
          // from:"312 horsham ave, northyork, ontario",
          // to:"9205 yonge st, richmonhill, ontario",
          routeType: "pedestrian",
          unit: "k",
        },
      }).then((result) => {
         console.log("route API", result)
        if (
          result.data.route.formattedTime !== undefined &&
          result.data.route.time !== undefined &&
          result.data.route.formattedTime !== "00:00:00" &&
          result.data.route.time !== "00:00:00"
        ) {
          this.setState({
            formatedWalkTime: result.data.route.formattedTime,
            walkTime: result.data.route.time,
          });
        } else {
          this.showInvalidAdressModal();
        }
      });
    }

    // getting cycling travel time
     axios({
      method: "GET",
      url: "https://www.mapquestapi.com/directions/v2/route",
      params: {
        key: "TpZYQMsUgBgXUKt2b3xmQCxKpHB7JWoS",
        from: fromInput,
        to: toInput,
        routeType: "bicycle",
        unit: "k",
      },
    }).then((result) => {
      if (
        result.data.route.formattedTime !== undefined &&
        result.data.route.time !== undefined &&
        result.data.route.formattedTime !== "00:00:00" &&
        result.data.route.time !== "00:00:00"
      ) {
        this.setState({
          formatedCycleTime: result.data.route.formattedTime,
          cycleTime: result.data.route.time,
        });
      } else {
        this.showInvalidAdressModal();
      }
    });
  };

  showInvalidAdressModal = () => {
    Swal.fire({
      title: "Uh-oh!",
      text: "You must enter in a valid starting and destination address if you wish to proceed.",
      confirmButtonText: "OK",
      padding: "2rem",
    });
  };

  handlePodcastSubmit = (event, podcastInput) => {
    event.preventDefault();
    let travelTime = 0;
    if (this.state.travelType === "walk") {
      travelTime = Math.floor(this.state.walkTime / 60);
      console.log(this.state.walkTime);
    } else if (this.state.travelType === "cycle") {
      travelTime = Math.floor(this.state.cycleTime / 60);
      console.log(this.state.cycleTime);
    }

    const minLength = travelTime - 5;
    const maxLength = travelTime + 5;

    axios({
      url: "https://listen-api.listennotes.com/api/v2/search",
      method: "GET",
      headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
      dataResponse: "jsonp",
      params: {
        q: `"${podcastInput}"`,
        type: "episode",
        language: "English",
        len_min: minLength,
        len_max: maxLength,
      },
    }).then((result) => {
      this.setState({
        podcastList: result.data.results,
      });

      if (this.state.podcastList.length === 0) {
        Swal.fire({
          title: "Uh-oh!",
          text: "Sorry, there are no podcasts that match your search criteria. Please choose another topic!",
          confirmButtonText: "OK",
          padding: "2rem",
        });
      }
    });
  };

  handleChoice = (id) => {
    this.setState({
      travelType: id,
    });
  };

  getAudio = (selectedAudio) => {
    this.setState({
      audio: selectedAudio,
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Map submitForm={this.handleAddressSubmit} />
        {this.state.staticMapUrl && this.state.formatedWalkTime !== "" ? (
          <section className="routeMap">
            <div className="routeMapContainer wrapper">
              <h2 class="routeMapHeader">Your Travel Route</h2>
              <p>Map overview of your communte.</p>
              <img src={this.state.staticMapUrl} className="routeMapImg" alt="Route on map" />
            </div>
          </section>
        ) : (
          <section></section>
        )}
        {this.state.formatedWalkTime !== "" ? (
          <TravelType
            walkTime={this.state.formatedWalkTime}
            cycleTime={this.state.formatedCycleTime}
            chooseTravelType={this.handleChoice}
          ></TravelType>
        ) : (
          <section></section>
        )}
        <Podcast submitForm={this.handlePodcastSubmit} />
        <section>
          <PodcastDisplay
            podcastList={this.state.podcastList}
            getAudioItem={this.getAudio}
          />
        </section>
        <section className="audioPlayer">
          {this.state.audio ? (
            <AudioPlayer audioToPlay={this.state.audio} />
          ) : (
            ""
          )}
        </section>
      </div>
    );
  }
}

export default App;

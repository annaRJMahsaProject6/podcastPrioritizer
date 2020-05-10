import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TravelType extends Component {
  constructor() {
    super();
    this.state = {
      travelType: "",
    };
  }
  
  handleClick = (event) => {
    event.persist();
    const id =
      event.target.id ||
      event.target.parentElement.id ||
      event.target.parentElement.parentElement.id;
    this.setState({
      travelType: id,
    });
    this.props.chooseTravelType(id);
  };

  render() {
    return (
      <section className="travelTypeSection">
        <div className="travelTypeSelection wrapper">
          <h2 className="travelHeading">Travel Preference?</h2>
          <p className="travelTypeText">
            We suggest the faster route, but please pick whatever option suits
            you best.
          </p>
          <p className="travelTypeText">
            Warning: Biking with headphones on is{" "}
            <span className="emphasisText">not</span> suggested.
          </p>
          <p className="travelTypeText">
            Please be safe when listening to audio while cycling.
          </p>
          <div className="travelTypeButtonContainer">
            <button
              id="walk"
              onClick={this.handleClick}
              className={
                this.state.travelType === "walk" ? "active" : "inactive"
              }
            >
              <FontAwesomeIcon
                icon="walking"
                className="icon"
              ></FontAwesomeIcon>
              <p>{`your walking travel time is ${this.props.walkTime} hour(s)`}</p>
            </button>
            <button
              id="cycle"
              onClick={this.handleClick}
              className={
                this.state.travelType === "cycle" ? "active" : "inactive"
              }
            >
              <FontAwesomeIcon icon="biking" className="icon"></FontAwesomeIcon>
              <p>{`your cycling travel time is ${this.props.cycleTime} hour(s)`}</p>
            </button>
          </div>
        </div>
      </section>
    );
  }
}
export default TravelType;

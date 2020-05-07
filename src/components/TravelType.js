import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TravelType (props){
    let handleClick=(event)=>{
        event.persist()
        const id=event.target.id || event.target.parentElement.id || event.target.parentElement.parentElement.id
        props.chooseTravelType(id)
}
    return (
      <section className="travelTypeSection">
        <div className="travelTypeSelection wrapper">
          <h2 className="travelHeading">Travel Preference?</h2>
          <p class="safetyWarning">
            <span className="warning">Warning:</span> Biking with headphones on
            is <span className="emphasisText">not</span> suggested.
          </p>
          <p class="safetyWarning">
            Please be safe when listening to audio while cycling.
          </p>
          <div className="travelTypeButtonContainer">
            <button id="walk" onClick={handleClick} className="option">
              <FontAwesomeIcon
                icon="walking"
                className="icon"
              ></FontAwesomeIcon>
              <p>{`your walking travel time is ${props.walkTime} hour(s)`}</p>
            </button>
            <button id="cycle" onClick={handleClick} className="option">
              <FontAwesomeIcon icon="biking" className="icon"></FontAwesomeIcon>
              <p>{`your cycling travel time is ${props.cycleTime} hour(s)`}</p>
            </button>
          </div>
        </div>
      </section>
    );
}
export default TravelType
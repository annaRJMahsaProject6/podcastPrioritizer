import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TravelType (props){
    return(
        <section className="travelTime">
            <button id="walk" onClick={(event)=>{props.chooseTravelType(event.target.id)}}>
                <FontAwesomeIcon icon="walking" className="walkingIcon"></FontAwesomeIcon>
                <p>{`your walking travel time is ${props.walkTime}`}</p>
            </button>
            <button id="cycle" onClick={(event)=>{props.chooseTravelType(event.target.id)}}>
                <FontAwesomeIcon icon="walking" className="walkingIcon"></FontAwesomeIcon>
                <p>{`your cycling travel time is ${props.cycleTime}`}</p>
            </button>
        </section>
    )
}
export default TravelType
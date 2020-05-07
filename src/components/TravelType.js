import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TravelType (props){
    let handleClick=(event)=>{
        event.persist()
        const id=event.target.id || event.target.parentElement.id || event.target.parentElement.parentElement.id
        props.chooseTravelType(id)
}
    return(
        <section className="travelTypeSelection">
            <div className="wrapper">
            <h2>please indicate your prefered form of travel</h2>
            <button id="walk" onClick={handleClick} className="option">
                <FontAwesomeIcon icon="walking" className="icon"></FontAwesomeIcon>
                <p >{`your walking travel time is ${props.walkTime} hours`}</p>
            </button>
            <button id="cycle" onClick={handleClick}>
                <FontAwesomeIcon icon="biking" className="icon"></FontAwesomeIcon>
                <p>{`your cycling travel time is ${props.cycleTime}`}</p>
            </button>
            </div>
        </section>
    )
}
export default TravelType
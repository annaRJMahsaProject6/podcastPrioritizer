import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TravelType extends Component{
    constructor(){
        super()
        this.state={

        }
    }
     handleClick=(event)=>{
        event.persist()
        const id=event.target.id || event.target.parentElement.id || event.target.parentElement.parentElement.id
        props.chooseTravelType(id)
}
    render(){
    return(
        <section className="travelTypeSelection">
            <div className="wrapper">
            <h2>please indicate your prefered form of travel</h2>
            <button id="walk" onClick={this.handleClick}>
                <FontAwesomeIcon icon="walking" className="icon"></FontAwesomeIcon>
                <p >{`your walking travel time is ${this.props.walkTime} hours`}</p>
            </button>
            <button id="cycle" onClick={this.handleClick}>
                <FontAwesomeIcon icon="biking" className="icon"></FontAwesomeIcon>
                <p>{`your cycling travel time is ${this.props.cycleTime}`}</p>
            </button>
            </div>
        </section>
    )}
}
export default TravelType
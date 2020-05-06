import React, { Component } from 'react'
import axios from 'axios'

class Direction extends Component{
    constructor(){
        super()
        this.state={
            from:"",
            to:"",
        }
    }
    handleInput=(event)=>{
        if(event.target.id==="from"){
            this.setState({
                from:event.target.value,
            })
        }
        else if(event.target.id==="to"){
            this.setState({
                to:event.target.value, 
            })
    }}
    handleSubmit=(e)=>{
        e.preventDefault()
        axios({
           method:'GET',
           url:'http://www.mapquestapi.com/directions/v2/route',
           params:{
               key:"TpZYQMsUgBgXUKt2b3xmQCxKpHB7JWoS",
            //    from:this.state.from,
            //    to:this.state.to,
               routeType:'pedestrian',
               unit:'k',
               from:'toronto, ontario',
               to:'richmondhill, ontario'
           }
        }).then((result)=>{
            console.log(result.data.route)
           console.log(result.data.route.formattedTime)

            
        })
    }
    render(){
        return(
            <form action="" name="Direction">
                {/* <label htmlFor="from"></label>
                <input type="text" id="from" value={this.state.from} onChange={this.handleInput}/>

                <label htmlFor="to"></label>
                <input type="text" id="to" value={this.state.to} onChange={this.handleInput}/>
                <button type="submit" onClick={this.handleSubmit}>submit</button> */}
            </form>
        )
    }
}
export default Direction

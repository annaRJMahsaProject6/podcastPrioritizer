import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';


class Map extends Component{
    constructor(){
        super();
        this.state = {
            userInputFrom:'',
            userInputTo:'',
            htmlFrom:'',
            htmlTo:'',
        }
    }
    getAddressFromApi = (query)=>{
        return axios({
            url:'https://www.mapquestapi.com/search/v3/prediction',
            method: 'GET',
            responseType: 'jsonp',
            params: {
                key:'ozwRV4KrZgLGMjKBYbnTIZBWQAN4JZBn',
                limit:'5',
                collection:'adminArea,address,category,franchise,airport,poi',
                countryCode:'CA',
                q:query,
            }
        })
    }
    handleUlClick = (event)=>{
        if (event.target.parentNode.classList.contains('from-address')){
            if(event.target.localName === 'li'){
                const text = event.target.innerText;
                if(text !== 'Address'){
                    this.setState({
                        userInputFrom:text,
                        htmlFrom:``
                    })
                }
            }
        }
        if (event.target.parentNode.classList.contains('to-address')){
            if(event.target.localName === 'li'){
                const text = event.target.innerText;
                if(text !== 'Address'){
                    this.setState({
                        userInputTo:text,
                        htmlTo:``
                    })
                }
            }
        }
    }
    handleUserInput = (event) => {
        if(event.target.classList.contains('from-input')){
            if (event.target.value) {
                this.setState({
                    userInputFrom: event.target.value,
                })
                if((event.target.value).length > 1)
                this.getAddressFromApi(event.target.value)
                .then((result)=>{
                    let dynamicHtml = '';
                    if (result && result.data.results) {
                        result.data.results.forEach((address) => {
                            dynamicHtml = dynamicHtml + `<li>${address.displayString}</li>`;
                        })
                    }
                    this.setState({
                        htmlFrom: dynamicHtml ? dynamicHtml : ''
                    })
                })
            } else {
                this.setState({
                    userInputFrom:'',
                    htmlFrom: ``
                })
            }
        }
        if (event.target.classList.contains('to-input')){
            if (event.target.value) {
                this.setState({
                    userInputTo: event.target.value,
                })
                if ((event.target.value).length > 1)
                    this.getAddressFromApi(event.target.value)
                        .then((result) => {
                            let dynamicHtml = '';
                            if (result && result.data.results) {
                                result.data.results.forEach((address) => {
                                    dynamicHtml = dynamicHtml + `<li>${address.displayString}</li>`;
                                })
                            }
                            this.setState({
                                htmlTo: dynamicHtml ? dynamicHtml : ''
                            })
                        })
            } else {
                this.setState({
                    userInputTo: '',
                    htmlTo: ''
                })
            }
        }
    }
    render(){
        return(
            <section className="whereTo">
                <h2>Where To Go?</h2>
                <form action="submit" className="search-form wrapper" autoComplete="off">
                    <div className="inputContainer">
                        <label htmlFor="fromaddress">Starting Location</label>
                        <input
                            type="text"
                            name="fromaddress"
                            className="address-search from-input"
                            placeholder="1 Canada's Wonderland Drive, Vaughan, ON L6A 1S6"
                            value={this.state.userInputFrom}
                            onKeyUp={this.handleUserInput}
                            onChange={this.handleUserInput}
                        />
                        {
                        this.state.htmlFrom
                        ?   <ul
                                className="suggestions from-address"
                                onClick={this.handleUlClick}
                            >
                                {ReactHtmlParser(this.state.htmlFrom)}
                            </ul>
                        :   ''
                        }
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="toaddress">Destination</label>
                        <input
                            type="text"
                            name="toaddress"
                            className="address-search to-input"
                            placeholder="288 Bremner Blvd, Toronto, ON M5V 3L9"
                            value={this.state.userInputTo}
                            onKeyUp={this.handleUserInput}
                            onChange={this.handleUserInput}
                        />
                        {this.state.htmlTo 
                         ?   <ul
                                className="suggestions to-address"
                                onClick={this.handleUlClick}
                            >
                                {ReactHtmlParser(this.state.htmlTo)}
                            </ul>
                        : ''
                        }   
                    </div>
                    <button
                        type="submit"
                        onClick={(event) => { this.props.submitForm(event, this.state.userInputFrom, this.state.userInputFrom) }}
                    >
                        Submit
                </button>
                </form>
            </section>
        )
    }
}

export default Map;
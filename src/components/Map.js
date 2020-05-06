import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';


class Map extends Component{
    constructor(){
        super();
        this.state = {
            userInputFrom:'',
            userInputTo:'',
            htmlFrom:'<li>Address</li>',
            htmlTo:'<li>Address</li>',
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
                        htmlFrom:`<li>Address</li>`
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
                        htmlTo:`<li>Address</li>`
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
                        htmlFrom: dynamicHtml ? dynamicHtml : '<li>Address</li>'
                    })
                })
            } else {
                this.setState({
                    userInputFrom:'',
                    htmlFrom: `<li>Address</li>`
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
                                htmlTo: dynamicHtml ? dynamicHtml : '<li>Address</li>'
                            })
                        })
            } else {
                this.setState({
                    userInputTo: '',
                    htmlTo: `<li>Address</li>`
                })
            }
        }
    }
    render(){
        return(
        <div>
            <form action="" 
                className="search-form"
                >
                <label htmlFor="fromaddress">From</label>
                <input 
                    type="text"
                    id="fromaddress"
                    className="input-search from-input"
                    value={this.state.userInputFrom}
                    onKeyUp={this.handleUserInput}
                    onChange={this.handleUserInput}
                />
                <ul className="suggestions from-address"
                    onClick={this.handleUlClick}
                >
                    {ReactHtmlParser(this.state.htmlFrom)}
                </ul>
                <label htmlFor="toaddress">To</label>
                <input 
                    type="text"
                    id="toaddress"
                    className="input-search to-input"
                    value={this.state.userInputTo}
                    onKeyUp={this.handleUserInput}
                    onChange={this.handleUserInput}
                />
                <ul className="suggestions to-address"
                    onClick={this.handleUlClick}
                >
                    {ReactHtmlParser(this.state.htmlTo)}
                </ul>
                <button 
                    type="submit"
                    onClick={(event)=>{this.props.submitForm(event, this.state.userInputFrom, this.state.userInputFrom)}}
                >
                    Submit
                </button>
            </form>
        </div>
        )
    }
}

export default Map;
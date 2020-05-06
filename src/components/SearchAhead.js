import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

class SearchAhead extends Component{
    constructor(){
        super();
        this.state = {
            userInputFrom:'',
            userInputTo:'',
            htmlFrom:'',
            htmlTo:'',
            staticMapUrl:''
        }
    }
    getStaticMap = (event)=>{
        event.preventDefault();
        const from = this.state.userInputFrom;
        const to = this.state.userInputTo;
        console.log(from,to);
        axios({
            url:'https://www.mapquestapi.com/staticmap/v5/map',
            // url: 'http://www.mapquestapi.com/directions/v2/route',
            method: 'GET',
            responseType: 'json',
            params: {
                key: 'ozwRV4KrZgLGMjKBYbnTIZBWQAN4JZBn',
                start:from,
                end:to,
                size:'400,400',
                countryCode:'CA',
                zoom:10
                // from:from,
                // to: to,
                // routeType:'pedestrian',
                // zoom:15,
                // ambiguities:'ignore',
                // doReverseGeocode:false,
                // enhancedNarrative:false,
                // avoidTimedConditions:false
            }
        }).then((result)=>{
            console.log(result.request.responseURL);
            this.setState({
                staticMapUrl:result.request.responseURL
            })
        })
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
                    htmlTo: ``
                })
            }
        }
    }
    render(){
        return (
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
                <ul
                  className="suggestions from-address"
                  onClick={this.handleUlClick}
                >
                  {ReactHtmlParser(this.state.htmlFrom)}
                </ul>
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
                <ul
                  className="suggestions to-address"
                  onClick={this.handleUlClick}
                >
                  {ReactHtmlParser(this.state.htmlTo)}
                </ul>
              </div>
              <button type="submit" onClick={this.getStaticMap}>
                Search
              </button>
            </form>

            <div className="route-map">
              <img src={this.state.staticMapUrl} alt="Route on map" />
            </div>
          </section>
        );
    }
}

export default SearchAhead;
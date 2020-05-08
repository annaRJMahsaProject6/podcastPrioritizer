import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';


class Map extends Component{
    constructor(){
        super();

        this.setULRef = this.setULRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            userInputFrom:'',
            userInputTo:'',
            htmlFrom:'',
            htmlTo:'',
            podcastInput: ""
        }
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    // set reference of UL node
    setULRef(node) {
        this.ULRef = node;
    }

    // if clicked on outside of li then address disappear
    handleClickOutside(event) {
        if (this.ULRef && !this.ULRef.contains(event.target)) {
            this.setState({
                htmlFrom:'',
                htmlTo: ''
            })
        }
    }

    getAddressFromApi = (query)=>{
        return axios({
            url:'https://www.mapquestapi.com/search/v3/prediction',
            method: 'GET',
            responseType: 'jsonp',
            params: {
                key:'ozwRV4KrZgLGMjKBYbnTIZBWQAN4JZBn',
                format: 'png',
                limit:'5',
                collection:'adminArea,address,category,franchise,airport,poi',
                countryCode:'CA',
                q:query,
            }
        })
    }

    handleUlClick = (event)=>{
        this.handleClickOutside(event);
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
        // this.checkEmptyUserInput();

    }

    // checkEmptyUserInput = (event) => {
    //     if (event.target.value === "") {
    //         console.log(event.target.value)
    //         alert('please type an address')
    //     }
    // }


    render(){
        return(
            <section className="whereTo">
                <div className="whereToContainer wrapper">
                    <h2>Where To Go?</h2>
                    <form action="submit" className="search-form wrapper" autoComplete="off">
                        <div className="addressSearchInput">
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
                                    ref={this.setULRef}
                                >
                                    {ReactHtmlParser(this.state.htmlFrom)}
                                </ul>
                            :   ''
                            }
                        </div>
                        <div className="addressSearchInput">
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
                                    ref={this.setULRef}
                                >
                                    {ReactHtmlParser(this.state.htmlTo)}
                                </ul>
                            : ''
                            }   
                        </div>
                        <button
                            type="submit"
                            onClick={(event) => { this.props.submitForm(event, this.state.userInputFrom, this.state.userInputTo) }}
                        >
                            Search
                    </button>
                    </form>
                    <ol className="whereToInstructions">
                        <h3>Instructions</h3>
                        <li>Type in your starting and desired destination address in the input field.</li>
                        <li>Once you are satisfied with your entries, click search to find out the length of your commute.</li>
                        <li>Next, select your preferred method of travel. We recommend the shorter travel time, but otherwise, it is completely optional.</li>
                    </ol>
                </div>
            </section>
        )
    }
}

export default Map;
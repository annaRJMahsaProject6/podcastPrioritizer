import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Preloader from "./Preloader";

// Get the user value for starting address and destination with search ahead
class Map extends Component {
  constructor() {
    super();
    this.state = {
      userInputFrom: "",
      userInputTo: "",
      htmlFrom: "",
      htmlTo: "",
      podcastInput: "",
      isFromListExpanded: false,
      isToListExpanded: false,
    };
    this.setULRef = this.setULRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  // To add event listener to listen UL outside click
  // @params: no-params
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  // To remove event listener added in DidMount
  // @params: no-params
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // Set reference of UL node
  // @params: node - node to which reference is given
  setULRef(node) {
    this.ULRef = node;
  }

  // If clicked on outside of UL then address list disappears
  // @params: event - ul outside click event
  handleClickOutside(event) {
    if (this.ULRef && !this.ULRef.contains(event.target)) {
      this.setState({
        htmlFrom: "",
        htmlTo: "",
      });
    }
  }
  // Promise to search ahead for the user input to generate a list of addresses
  // @params: query - for which to return suggestions
  getAddressFromApi = (query)=>{
      return axios({
          url:'https://www.mapquestapi.com/search/v3/prediction',
          method: 'GET',
          responseType: 'jsonp',
          params: {
              key:'TpZYQMsUgBgXUKt2b3xmQCxKpHB7JWoS',
              format: 'png',
              limit:'5',
              collection:'adminArea,address,category,franchise,airport,poi',
              countryCode:'CA',
              q:query,
          }
      })
  }
  // Set the value of starting address
  // @params: text - starting address
  setFromState=(text)=>{
    this.setState({
      userInputFrom: text,
      htmlFrom: ``,
    });
  }
  // Set the value of ending address
  // @params: text - ending address
  setToState=(text)=>{
    this.setState({
      userInputTo: text,
      htmlTo: ``,
    });
  }
  // Get value from suggestions list on click
  // @params: event - UL click event or space-bar or enter if user using keyboard
  handleUlClick = (event) => {
    event.preventDefault();
    this.handleClickOutside(event);
    if (event.target.localName === "button" && 
        event.target.parentNode.parentNode.classList.contains("fromAddress")){
      const text = event.target.parentNode.innerText;
      this.setFromState(text);
    }
    if (event.target.localName === "li" && 
        event.target.parentNode.classList.contains("fromAddress")) {
        const text = event.target.innerText;
      this.setFromState(text);
    }
    if (event.target.localName === "li" && 
      event.target.parentNode.classList.contains("toAddress")) {
      const text = event.target.innerText;
        this.setToState(text);
      }
    if (event.target.localName === "button" && 
      event.target.parentNode.parentNode.classList.contains("toAddress")) {
        const text = event.target.parentNode.innerText;
        this.setToState(text);
    }
  };
  // Return List from result returned by api
  // @params: result - returned by search ahead api
  extractList = (result) => {
    let list = "";
    if (result && result.data.results) {
      result.data.results.forEach((address) => {
        list =
          list +
          `<li><button><img src="https://assets.mapquestapi.com/icon/v2/marker.png" alt="drop icon"></img>${address.displayString}</button></li>`;
      });
    } else {
      list = "";
    }
    return list;
  };
  // Get the value from user input and make api calls
  // @params: event - onChange or onKeyUp
  handleUserInput = (event) => {

  // For starting address  
  if (event.target.classList.contains("fromInput")) {
      if (event.target.value) {
        this.setState({
          userInputFrom: event.target.value,
        });
        if (event.target.value.length > 1)
          this.getAddressFromApi(event.target.value).then((result) => {
            let dynamicHtml = this.extractList(result);
            this.setState({
              htmlFrom: dynamicHtml ? dynamicHtml : "",
            });
          });
      } else {
        this.setState({
          userInputFrom: "",
          htmlFrom: ``,
        });
      }
    }

    // For destination or ending address
    if (event.target.classList.contains("toInput")) {
      if (event.target.value) {
        this.setState({
          userInputTo: event.target.value,
        });
        if (event.target.value.length > 1)
          this.getAddressFromApi(event.target.value).then((result) => {
            let dynamicHtml = this.extractList(result);
            this.setState({
              htmlTo: dynamicHtml ? dynamicHtml : "",
            });
          });
      } else {
        this.setState({
          userInputTo: "",
          htmlTo: "",
        });
      }
    }
  };
  // Render the component on page
  render() {
    return (
      <div className="whereTo" id="whereTo">
        <div className="whereToContainer wrapper">
          <h2>Where To Go?</h2>
          <form
            action="submit"
            className="searchForm"
            autoComplete="off"
          >
            <div className="addressSearchInput">
              <label htmlFor="fromaddress">Starting Location</label>
              <input
                type="text"
                name="fromaddress"
                className="addressSearch fromInput"
                placeholder="1 Canada's Wonderland Drive, Vaughan, ON L6A 1S6"
                value={this.state.userInputFrom}
                onKeyUp={this.handleUserInput}
                onChange={this.handleUserInput}
                onFocus={() => this.setState({ isFromListExpanded: true })}
              />
              {this.state.htmlFrom && this.state.isFromListExpanded ? (
                <ul
                  className="suggestions fromAddress"
                  onClick={this.handleUlClick}
                  onMouseDown={this.handleUlClick}
                  ref={this.setULRef}
                >
                  {ReactHtmlParser(this.state.htmlFrom)}
                </ul>
              ) : (
                ""
              )}
            </div>
            <div className="addressSearchInput">
              <label htmlFor="toaddress">Destination</label>
              <input
                type="text"
                name="toaddress"
                className="addressSearch toInput"
                placeholder="288 Bremner Blvd, Toronto, ON M5V 3L9"
                value={this.state.userInputTo}
                onKeyUp={this.handleUserInput}
                onChange={this.handleUserInput}
                onFocus={() => this.setState({ isToListExpanded: true })}
              />
              {this.state.htmlTo && this.state.isToListExpanded ? (
                <ul
                  className="suggestions toAddress"
                  onClick={this.handleUlClick}
                  onMouseDown={this.handleUlClick}
                  ref={this.setULRef}
                >
                  {ReactHtmlParser(this.state.htmlTo)}
                </ul>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              onClick={(event) => {
                this.props.submitForm(
                  event,
                  this.state.userInputFrom,
                  this.state.userInputTo
                );
                this.props.loadMapUrl();
              }}
            >
              Search
            </button>
          </form>
          <ol className="whereToInstructions">
            <h3>Instructions</h3>
            <li>
              Type in your starting and desired destination address in the input
              field.
            </li>
            <li>
              Once you are satisfied with your entries, click search to find out
              the length of your commute.
            </li>
            <li>
              Next, select your preferred method of travel. We recommend the
              shorter travel time, but otherwise, it is completely optional.
            </li>
          </ol>
        </div>
        {this.props.isLoadingMap ? <Preloader styleName="WhereTo" /> : null}
      </div>
    );
  }
}

export default Map;
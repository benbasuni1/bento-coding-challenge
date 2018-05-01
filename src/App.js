// React & React Components
import React, { Component } from 'react';
import PageNavBar from './components/PageNavbar';

// API Calls and Parser
import axios from 'axios';
import convert from 'xml-to-json-promise';

// CSS
import './App.css';

const catPicturesAPI  = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25'; // XML to JSON
const catDescriptionsAPI = 'http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25'; // JSON.parse

class App extends Component {
  constructor() {
    super();
    this.state = {
      cats: [],
      favorites: [],
      view: 'default',
    }
  }

  componentDidMount() {
    this.populateCatObjects();
  }

  populateCatObjects() {
    axios.get(catPicturesAPI)
    .then(data => convert.xmlDataToJSON(data.data))
    .then(json => json.response.data[0].images[0].image)
    .then(images => {
      for (let i = 0; i < images.length; i++) {
        this.setState({
          cats: [...this.state.cats, {
            id: i,
            url: images[0].url[0]
          }]
        })
      }
    })
    axios.get(catDescriptionsAPI)
    .then(data => JSON.parse(data.data.body))
    .then(parsedData => parsedData.data)
    .then(descriptions => {
        for (let key in descriptions) {
          let fact = descriptions[key].fact;
          let descriptionInfo = [...this.state.cats];
          descriptionInfo.forEach(item => {
            item.description = fact;
            item.last = fact.split(' ').splice(-1)[0];
          });
          this.setState({
            cats: descriptionInfo
          })
        }
    })
  }

  render() {
    return (
      <PageNavBar />
    );
  }
}

export default App;

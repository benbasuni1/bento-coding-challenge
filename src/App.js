// React & React Components
import React, { Component } from 'react';
import PageNavBar from './components/PageNavbar';

// API Calls and Parser
import axios from 'axios';
import xml2json from 'xml2js';

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
    this.populateCatDescriptions();
  }

  populateCatDescriptions() {
    axios.get(catDescriptionsAPI)
    .then(data => JSON.parse(data.data.body))
    .then(parsedData => parsedData.data)
    .then(descriptions => {
        for (let key in descriptions) {
          let fact = descriptions[key].fact;
          this.state.cats.push({ 
            description: fact,
            last: fact.split(' ').splice(-1)[0]
          });
        }
        console.log(this.state)
    })
    .catch(err => console.log(err));
  }

  getCatPictures() {
    axios.get(catPicturesAPI)
    .then(data => console.log('catPictures: ', data))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <PageNavBar />
    );
  }
}

export default App;

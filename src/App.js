import { Button, Image, Label } from 'react-bootstrap';
// React & React Components
import React, { Component } from 'react';
import PageNavBar from './components/PageNavbar';
// import Card from './components/Card';

// API Calls and Parser 
import convert from 'xml-js';
import axios from 'axios';

// CSS
import './App.css';

// API Calls
const catImagesAPI       = 'http://thecatapi.com/api/images/get?format=xml&results_per_page=25'; // XML to JSON
const catDescriptionsAPI = 'http://cors-proxy.htmldriven.com/?url=https://catfact.ninja/facts?limit=25'; // JSON.parse

class App extends Component {
  constructor() {
    super();
    
    // Instantiating state
    this.state = {
      cats      : [],
      favorites : [],
      view      : 'default',
      openModal : false,
    }
  }

  componentWillMount() {
    // When the App renders, instantiate this.state.cats 
    this.populateCatObjects();
  }

  openModal() {
    this.setState({ openModal: true });
  }

  populateCatObjects() {
    let arr = [];

    // Axios calls to get data
    let catObjVals = Promise.all([axios.get(catImagesAPI), axios.get(catDescriptionsAPI)])
    .then(requestData => {
      // Parse data
      return [
        convert.xml2js(requestData[0].data, { compact: true }).response.data.images.image,
        JSON.parse(requestData[1].data.body).data,
      ];
    })
    .catch(err => {
      console.log(err)
    })

    // Populate this.state.cats
    catObjVals.then(items => {
      let catImages = items[0];
      let catDescription = items[1];
      for (let i = 0; i < catImages.length; i++) {
        let fact = catDescription[i].fact;
        arr.push({
          id: catImages[i].id._text,
          description: fact,
          image: catImages[i].url._text,
          last: fact.split(' ').splice(-1)[0]
        })
      }
      this.setState({
        cats: arr
      });
    })
  }

  render() {
    console.log(this.state.cats);
    return (
      <div className="main">
        <PageNavBar />
        <div className="cards">

          <div className="card" onClick={() => this.openModal()}>
            <Image className="cat-image" width="70%" height="70%" src={'http://25.media.tumblr.com/tumblr_m27b53Tkji1qze0hyo1_1280.jpg'} circle />
            <Button bsStyle="primary" className="favorite-button">Fav</Button>
            <span className="cat-description">This is a description!</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
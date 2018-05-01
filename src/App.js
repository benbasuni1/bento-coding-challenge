import { Button, Image } from 'react-bootstrap';
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
    }
  }

  componentWillMount() {
    // When the App renders, instantiate this.state.cats 
    this.populateCatObjects();
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

          <div className="card">
            <Button bsStyle="primary" className="favorite-button">Fav</Button>
          </div>

        </div>
      </div>
    );
  }
}

export default App;

/* <Image src={this.state.cats[0].image} /> */
    // axios.get(catPicturesAPI)
    // .then(data => convert.xmlDataToJSON(data.data))
    // .then(json => json.response.data[0].images[0].image)
    // .then(images => {
    //   for (let i = 0; i < images.length; i++) {
    //     this.setState({
    //       cats: [...this.state.cats, {
    //         id: i,
    //         url: images[0].url[0]
    //       }]
    //     })
    //   }
    // })
    // axios.get(catDescriptionsAPI)
    // .then(data => JSON.parse(data.data.body))
    // .then(parsedData => parsedData.data)
    // .then(descriptions => {
    //     for (let key in descriptions) {
    //       let fact = descriptions[key].fact;
    //       let descriptionInfo = [...this.state.cats];
    //       descriptionInfo.forEach(item => {
    //         item.description = fact;
    //         item.last = fact.split(' ').splice(-1)[0];
    //       });
    //       this.setState({
    //         cats: descriptionInfo
    //       })
    //     }
    // })
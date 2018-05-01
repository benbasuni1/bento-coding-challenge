import { Button, Image } from 'react-bootstrap';
// React & React Components
import React, { Component } from 'react';
import PageNavBar from './components/PageNavbar';
// import Card from './components/Card';

// API Calls and Parser 
import convert from 'xml-to-json-promise';

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
    // When the App renders, make 
    this.populateCatObjects();
  }

  populateCatObjects() {

    // Implement using fetch and use promise.all
    const fetchCatDescriptions = fetch(catDescriptionsAPI).then(res => res.json());
    const fetchCatImages       = fetch(catImagesAPI).then(res => res.text());

    console.log(fetchCatImages);
    let abc = Promise.all([fetchCatDescriptions, fetchCatImages])
    .then(requestData => [requestData[0], convert.xmlDataToJSON(requestData[1]).then(res => res)])
    .then(item => {
      let catDescriptions  = JSON.parse(item[0].body).data;
      let catImages        = item[1].then(json => json.response.data[0].images[0].image)
      return [catDescriptions, catImages];
    });

    console.log(abc.then(res => console.log(res)));
  }

  render() {
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
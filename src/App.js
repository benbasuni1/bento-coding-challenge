// React & React Components
import React, { Component } from 'react';
import PageNavBar from './components/PageNavbar';
import CatCard from './components/CatCard';
import { Modal, Image, Button } from 'react-bootstrap';

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
      view      : 'default',
      openModal : false,
    }

    this.openModal.bind(this);
    this.saveToFavorites.bind(this);
  }

  componentWillMount() {
    // When the App renders, instantiate this.state.cats 
    this.populateCatObjects();
  }

  saveToFavorites(e) {
    this.setState({
      cats: this.state.cats.map( cat => {
        return (e.id === cat.id) ? {
          ...cat,
          favorite: !cat.favorite
        } : cat
      })
    })
  }

  openModal(e) {
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  populateCatObjects() {
    let arr = [];

    const getCatInfo = async () => {
      try {
        let imagePromise = axios.get(catImagesAPI)
          .then(requestData => convert.xml2js(requestData.data, { compact: true }).response.data.images.image);
        let descriptionPromise = axios.get(catDescriptionsAPI)
          .then(requestData => JSON.parse(requestData.data.body).data); 
        return await Promise.all([imagePromise, descriptionPromise]);
      } catch (err) { console.log(err); }

      return null;
    }

    getCatInfo().then( information => {
      let catImages = information[0];
      let catDescription = information[1];
      for (let i = 0; i < catImages.length; i++) {
        let fact = catDescription[i].fact;
        arr.push({
          id: catImages[i].id._text,
          description: fact,
          image: catImages[i].url._text,
          last: fact.split(' ').splice(-1)[0],
          favorite: 0
        })
      }
      this.setState({
        cats: arr
      });
    });
  }

  render() {
    return (
      <div className="main">
        <PageNavBar />
        <div className="cards">
          {this.state.cats.map( item => (
            <CatCard 
              openModal={(e) => this.openModal(e)}
              saveToFavorites = {(e) => this.saveToFavorites(e)}
              description={item.description} 
              key={item.id} 
              id={item.id} 
              image={item.image} 
              last={item.last} 
              favorite={item.favorite}
            />
          ))}
        </div>

        <Modal show={this.state.openModal} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title align="center">This is a description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image className="cat-image-modal" width="70%" src={'http://25.media.tumblr.com/tumblr_m27b53Tkji1qze0hyo1_1280.jpg'} circle />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default App;

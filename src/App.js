// React & React Components
import React, { Component } from 'react';
import PageNavBar from './components/PageNavbar';
import CatCard from './components/CatCard';
import CatModal from './components/CatModal';

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
      allCats   : [],
      openModal : false,
      current   : ''
    }

    this.openModal.bind(this);
    this.saveToFavorites.bind(this);
    this.viewFavorites.bind(this);
  }

  componentWillMount() {
    // When the App renders, instantiate this.state.cats 
    this.populateCatObjects();
  }

  /* View Favorites && all */
  viewAll() {
    this.setState({ cats: (this.state.allCats.length) ? this.state.allCats : this.state.cats })
  }

  viewFavorites() {
    this.setState({
      allCats : (this.state.allCats.length) ? this.state.allCats : this.state.cats,
      cats    : this.state.cats.filter( cat =>  cat.favorite ),
    })
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

  /* Sort Alphabetically */
  sortAlphabeticallyByLast() {
    this.setState({
      cats: this.state.cats.sort((a, b) => {
        if (a.last < b.last) return -1;
        else if (a.last > b.last) return 1;
        return 0;
      })
    })
  }

  openModal(e) { 
    let { id, image } = e.target.attributes;
    this.setState({ 
      openModal: true,
      current: {
        id          : id.value,
        description : e.target.innerHTML,
        image       : image.value
      }
    }) 
  }

  closeModal() { this.setState({ openModal: false }) }

  populateCatObjects() {
    let arr = [];

    const getCatInfo = async () => {
      try {
        let imagePromise = axios.get(catImagesAPI).then(requestData => {
          return convert.xml2js(requestData.data, { compact: true }).response.data.images.image;
        });

        let descriptionPromise = axios.get(catDescriptionsAPI).then(requestData => {
          return JSON.parse(requestData.data.body).data; 
        });

        return await Promise.all([imagePromise, descriptionPromise]);

      } catch (err) { console.log(err); }

      return null;
    }

    getCatInfo().then( information => {
      let catImages      = information[0];
      let catDescription = information[1];

      for (let i = 0; i < catImages.length; i++) {
        let fact = catDescription[i].fact;
        arr.push({
          id          : catImages[i].id._text,
          description : fact,
          image       : catImages[i].url._text,
          last        : fact.split(' ').splice(-1)[0],
          favorite    : false
        });
      }
      this.setState({ cats: arr });
    });
  }

  render() {
    return (
      <div className="main">
        <PageNavBar 
          sortAlphabeticallyByLast= {() => this.sortAlphabeticallyByLast()}
          viewFavorites           = {() => this.viewFavorites()}
          viewAll                 = {() => this.viewAll()}
        />
        <div className="cards">
          {this.state.cats.map( item => (
            <CatCard 
              openModal       = {e => this.openModal(e)}
              saveToFavorites = {e => this.saveToFavorites(e)}
              key             = {item.id} 
              id              = {item.id} 
              description     = {item.description} 
              image           = {item.image} 
              last            = {item.last} 
              favorite        = {item.favorite}
            />
          ))}
        </div>
        <CatModal 
          show        = {this.state.openModal}
          closeModal  = {() => this.closeModal()}
          id          = {this.state.current.id} 
          description = {this.state.current.description} 
          image       = {this.state.current.image} 
        />
      </div>
    );
  }
}

export default App;
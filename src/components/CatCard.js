import React from 'react';
import { Button, Image } from 'react-bootstrap';

const CatCard = props => (
    <div className="card">
        <Image className="cat-image" src={props.image} circle />
        <Button 
        onClick={(e) => props.saveToFavorites(props)} 
        bsStyle={props.favorite ? "warning" : "danger"}
        className="favorite-button">{props.favorite ? "Unfav" : "Fav"}</Button>
        <div className="card-overlay">
            <div 
                onClick={e => props.openModal(e)} 
                image={props.image} 
                id={props.id}  
                className="card-description">
                {props.description}
            </div>
        </div>
    </div>
)

export default CatCard;
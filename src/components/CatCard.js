import React from 'react';
import { Button, Image, Modal, Navbar, NavItem, Nav} from 'react-bootstrap';

const CatCard = props => (
    <div className="card">
        <Image className="cat-image" src={props.image} circle />
        <Button onClick={(e) => props.saveToFavorites(props)} bsStyle="primary" className="favorite-button">Fav</Button>
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
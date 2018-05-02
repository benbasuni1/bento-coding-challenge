import React from 'react';
import { Button, Image, Modal, Navbar, NavItem, Nav} from 'react-bootstrap';

const CatCard = props => (
    <div className="card">
       <Image onClick={(e) => props.openModal(e)} className="cat-image" src={props.image} circle />
       <Button onClick={(e) => props.saveToFavorites(props)} bsStyle="primary" className="favorite-button">Fav</Button>
    </div>
)

export default CatCard;
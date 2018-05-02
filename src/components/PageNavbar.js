import React from 'react';
import { Button, Navbar, NavItem, Nav} from 'react-bootstrap';

const PageNavBar = props => (
    <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand className="items brand">
            Bento-Bento Cats!
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
            <NavItem eventKey={1} >
                <Button onClick={() => props.sortAlphabeticallyByLast()} bsStyle="success" className="nav-item" bsSize="large">Sort</Button>
            </NavItem>
            <NavItem eventKey={2} href="#">
                <Button onClick={() => props.viewFavorites()}bsStyle="primary" className="nav-item" bsSize="large">View Favorites</Button>
            </NavItem>
            <NavItem eventKey={3} href="#">
                <Button onClick={() => props.viewAll()}bsStyle="danger" className="nav-item" bsSize="large">View All</Button>
            </NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
)

export default PageNavBar;
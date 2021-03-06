import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Randomizer</Navbar.Brand>
            <Nav className="mr-auto">
                <Link to="/"> <div style={{marginRight: '1rem'}}>Home</div></Link>
                <Link to="/stats" style={{marginRight: '1rem'}}><div>Stats</div></Link>
                <Link to="/games"><div>Match History</div></Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>

    )
}

export default Header;



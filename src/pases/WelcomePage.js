import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
       <Navbar className="bg-body-tertiary border-bottom border-dark">
      <Container>
        <Navbar.Brand href="#home">Welcome to expense tracker!!</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Your profile is Incomplete: <NavLink to="/profile">complete</NavLink>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default WelcomePage

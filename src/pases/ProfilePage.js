import React from 'react';
import { Navbar, Container } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <div>
       <Navbar className="bg-body-tertiary border-bottom border-dark">
      <Container>
        <Navbar.Brand href="#home">Winner never quite, Quitters never win.</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Your Profile is 64% completed. A complete profile has higher chances of landing a job: <a href="#login">Complete now</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default ProfilePage;

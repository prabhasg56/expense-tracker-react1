import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const WelcomePage = () => {
  const baseUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const idToken = localStorage.getItem("token");

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "post",
        body: JSON.stringify({
          idToken: idToken,
          requestType: "VERIFY_EMAIL",
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      if (response.status === 200) {
        alert("Verify link has been sent to your register email Id!");
      } else {
        throw new Error(responseJson.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary border-bottom border-dark">
        <Container>
          <Navbar.Brand href="#home">Welcome to expense tracker!!</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Your profile is Incomplete:{" "}
              <NavLink to="/profile">complete</NavLink>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Container className="mt-3">
          <Button onClick={() => verifyEmailHandler()}>Verify Email id</Button>
        </Container>
      </div>
    </div>
  );
};

export default WelcomePage;

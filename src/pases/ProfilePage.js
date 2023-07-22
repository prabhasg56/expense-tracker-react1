import React, { useEffect, useRef } from "react";
import { Navbar, Container, Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const profileNameRef = useRef("");
  const profileUrlRef = useRef("");

  const baseUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const enteredProfileName = profileNameRef.current.value;
  const enteredProfileUrl = profileUrlRef.current.value;
  const idToken = localStorage.getItem("siginUpIdToken");

  const fetchProfileData = async () => {
    const baseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";
   
    try{
        const response = await fetch(`${baseUrl}`, {
            method: 'post',
            body: {
                idToken: idToken
            },
            headers: {
                "Content-Type": "application/json",
              },
        })

        const responseJson = await response.json();
        console.log(responseJson)
    }catch(error){
        alert(error);
    }
  }

  useEffect(()=>{
    fetchProfileData()
  },[]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}`, {
        method: "post",
        body: JSON.stringify({
          idToken: idToken,
          profileName: enteredProfileName,
          profileUrl: enteredProfileUrl,
          returnSecureToken: true,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonResponse = await response.json();

      if (response.status === 200) {
        alert("Successfully updated!");
      } else {
        throw new Error(jsonResponse.error.message);
      }
    } catch (error) {
      alert(error)
    }
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary border-bottom border-dark">
        <Container>
          <Navbar.Brand href="#home">
            Winner never quite, Quitters never win.
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end ">
            <Navbar.Text
              className="fs-15 fw-bold p-2"
              style={{
                width: "40%",
                fontSize: "12px",
                backgroundColor: "#ffcccc",
                borderRadius: "5px",
              }}
            >
              Your Profile is <span className="text-dark">64%</span> completed.
              A complete profile has higher chances of landing a job:{" "}
              <a href="#login">Complete now</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="bg-secondary bg-gradient p-3 mt-5">
        <h2>Contact Details</h2>
        <Form>
          <Row>
            <Col>
              <label>Git Full Name</label>

              <Form.Control ref={profileNameRef} />
            </Col>

            <Col>
              <label> Git Profile photo URL</label>

              <Form.Control ref={profileUrlRef} />
            </Col>
          </Row>
          <Button className="mt-2" onClick={(e) => updateProfileHandler(e)}>
            Update
          </Button>
          <Button
            className="mt-2 ms-3 btn btn-danger"
            onClick={() => navigate("/welcome")}
          >
            Cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ProfilePage;

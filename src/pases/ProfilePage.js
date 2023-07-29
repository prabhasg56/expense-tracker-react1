import React, { useEffect, useRef } from "react";
import { Navbar, Container, Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfileAction } from "../store/updateProfileSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const profileNameRef = useRef("");
  const profileUrlRef = useRef("");
  const dispatch = useDispatch();

  const baseUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const idToken = localStorage.getItem('token');

  const fetchProfileData = async () => {
    const baseUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

    try {
      const response = await fetch(`${baseUrl}`, {
        method: "post",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();
  
      if(response.status === 200){
        localStorage.setItem('profileUpdated', 200);
        dispatch(updateProfileAction.profileUpdateStatus());
      }else{
        throw new Error(responseJson.error.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const enteredProfileName = profileNameRef.current.value;
    const enteredProfileUrl = profileUrlRef.current.value;

    try {
      const response = await fetch(`${baseUrl}`, {
        method: "post",
        body: JSON.stringify({
          idToken: idToken,
          displayName: enteredProfileName,
          photoUrl: enteredProfileUrl,
          // deleteAttribute: "DISPLAY_NAME",
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
      alert(error);
    }

    fetchProfileData();

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
                fontSize: ".7vw",
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

import { useRef } from "react";
import {useDispatch} from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { authAction } from "../store/authSlice";

const SignInForm = (props) => {
  const emailRef = useRef(""),
    passwordRef = useRef("");

  const navigate = useNavigate();// for navigate one page to another page
  const dispatch = useDispatch();

  const basUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const signInHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value,
      enteredPassword = passwordRef.current.value;

    if (enteredEmail && enteredPassword) {
      try {
        const response = await fetch(basUrl, {
          method: "post",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          Headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonResponse = await response.json();

        if (response.status === 200) {
          alert("Login successfull!");
          localStorage.setItem('token', jsonResponse.idToken);
          localStorage.setItem('loginEmail', jsonResponse.email);

          dispatch(authAction.login({idToken: jsonResponse.idToken, userId: enteredEmail}));
          navigate('/welcome');
          emailRef.current.value = "";
          passwordRef.current.value = "";
        } else {
          throw new Error(jsonResponse.error.message);
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please valid email or password!");
    }
  };

  const forgotModalHandler = () => {
    props.showModalHandler(true);
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Form className="p-3 border border-dark rounded ">
          <h3 className="text-center">Sign In</h3>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              ref={emailRef}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>

          <div className="d-grid">
            
            <Button
              type="submit"
              className="btn btn-primary rounded-pill"
              onClick={(e) => signInHandler(e)}
            >
              Sign In
            </Button>
            <p className="ms-5 user-select-none mt-2" onClick={() => forgotModalHandler()}>Forgot Password?</p>
          </div>
        </Form>
      </div>
      <div className="d-flex justify-content-center mt-2 ">
        <NavLink to="/" className="btn btn-secondary">
          Don't Have an account? Sign Up
        </NavLink>
      </div>
    </>
  );
};

export default SignInForm;

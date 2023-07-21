import { useRef } from "react";
import { Button, Form } from "react-bootstrap";

const SignInForm = () => {
  const emailRef = useRef(""),
    passwordRef = useRef("");

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
          emailRef.current.value = "";
          passwordRef.current.value = "";
        } else {
          throw new Error(jsonResponse.error.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Invalid email or password!");
    }
  };

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
          </div>
        </Form>
      </div>
      <div className="d-flex justify-content-center mt-2 ">
        <Button type="submit" className="btn btn-secondary">
          Don't Have an account? Sign Up
        </Button>
      </div>
    </>
  );
};

export default SignInForm;

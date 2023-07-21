import { useRef } from "react";
import { Button, Form } from "react-bootstrap";

const SignUpForm = () => {
  const emailRef = useRef(""),
    passwordRef = useRef(""),
    confirmPasswordRef = useRef("");

  const basUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const signUpHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value,
      enteredPassword = passwordRef.current.value,
      enteredConfirmPassword = confirmPasswordRef.current.value;

    if (
      enteredPassword === enteredConfirmPassword &&
      enteredEmail &&
      enteredPassword &&
      enteredConfirmPassword
    ) {
      try {
        const response = await fetch(basUrl, {
          method: "post",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            returnSecureToken: true,
          }),
          Headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonResponse = await response.json();

        if (response.status === 200) {
          alert("Your are successfully register!");
          emailRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
        } else {
          throw new Error(JSON.stringify(jsonResponse));
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert("Please enter same password!");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Form className="p-3 border border-dark rounded ">
          <h3 className="text-center">Sign Up</h3>

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

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              ref={confirmPasswordRef}
            />
          </div>
          <div className="d-grid">
            <Button
              type="submit"
              className="btn btn-primary rounded-pill"
              onClick={(e) => signUpHandler(e)}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
      <div className="d-flex justify-content-center mt-2 ">
        <Button type="submit" className="btn btn-secondary">
          Have an account? Login
        </Button>
      </div>
    </>
  );
};

export default SignUpForm;

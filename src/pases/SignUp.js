import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignUp = () => {
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
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
            />
          </div>
          <div className="d-grid">
            <Button type="submit" className="btn btn-primary rounded-pill">
              Submit
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

export default SignUp;

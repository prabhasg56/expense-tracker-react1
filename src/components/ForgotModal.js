import { useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ForgotModal = (props) => {
  const enteredEmailRef = useRef("");

  const basForgotUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const handleClose = () => props.showModalHandler(false);

  const forgotPasswordHandler = async () => {
    const enteredEmail = enteredEmailRef.current.value;
    const siginupEmail = localStorage.getItem('signupEmail');

    if(enteredEmail === siginupEmail){
        try {
            const response = await fetch(`${basForgotUrl}`, {
              method: 'post',
              body: JSON.stringify({
                  requestType: "PASSWORD_RESET",
                  email: enteredEmail
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
            });
      
            const jsonResponse = await response.json();
      
            if(response.status === 200) {
              alert('The password reset link has been successfully sent, please check your email!');
            } else {
              throw new Error(jsonResponse.error.message);
            }
          } catch (error) {
              alert(error);
          }
    }else{
        alert('Please enter register email Id!')
    }
  
  };

  return (
    <>
      <Modal show={props.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Enter the email with which you have registered!
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="email Id"
            ref={enteredEmailRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => forgotPasswordHandler()}>
            Send link
          </Button>
          <Button variant="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ForgotModal;

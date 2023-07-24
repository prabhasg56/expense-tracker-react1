import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Button, Form, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const spentAmountRef = useRef("");
  const expenseDescRef = useRef("");
  const expenseCatRef = useRef("");

  const baseUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const expenseBaseUrl = "https://expense-tracker-dc8d1-default-rtdb.firebaseio.com/";

  const idToken = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.clear("token");
    navigate("/signin");
  };

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

  const expenseFormHandler = (e) => {
    e.preventDefault();
    const enteredExpenseAmt = spentAmountRef.current.value;
    const enteredExpenseCat = expenseCatRef.current.value;
    const enteredExpenseDesc = expenseDescRef.current.value;

    setExpenses([...expenses,{
      expenseAmount: enteredExpenseAmt,
      expenseDescription: enteredExpenseDesc,
      expenseCategory: enteredExpenseCat,
    }]);

    saveToFireBase();
  };

  const saveToFireBase = async () => {

    try {
      const response = await fetch(`${expenseBaseUrl}expense.json`, {
          method: 'post',
          body: JSON.stringify(expenses),
          headers: {
            'Content-Type': 'application/json'
          }
      })

      const responseJson = await response.json();

      if(response.status === 200){
        alert('Expense added successfully!');
      } else {
        throw new Error(responseJson.error.message);
      }

    }catch(error) {
      alert(error);
    }
  }

  const fetchExpense = async() => {

    try{
      const response = await fetch(`${expenseBaseUrl}expense.json`);

      const responseJson = await response.json();

      console.log(JSON.stringify(responseJson));
      // setExpenses(responseJson);
    }catch(error) {
      alert(error);
    }
  }

  useEffect(()=>{
    fetchExpense();
  },[])

  return (
    <>
      <Navbar className="bg-body-tertiary border-bottom border-dark">
        <Container>
          <Navbar.Brand href="#home">Welcome to expense tracker!!</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Your profile is Incomplete:
              <NavLink to="/profile">complete</NavLink>
            </Navbar.Text>
          </Navbar.Collapse>
          <Button className="ms-2 btn-danger" onClick={() => logoutHandler()}>
            Logout
          </Button>
          <Button onClick={() => verifyEmailHandler()} className="ms-3">
            Verify Email id
          </Button>
        </Container>
      </Navbar>

      <Form className="bg-secondary mt-3 p-3 m-4 rounded">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Spent amount</Form.Label>
            <Form.Control type="text" placeholder="Enter spent amount" ref={spentAmountRef}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Expense description</Form.Label>
            <Form.Control type="text" placeholder="Enter expense description" ref={expenseDescRef}/>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Category of the expense</Form.Label>
          <Form.Control placeholder="Enter expense category" ref={expenseCatRef}/>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={(e) => expenseFormHandler(e)}
        >
          Add expense
        </Button>
      </Form>

      <div class="container mt-3">
        <h2 className="text-center">List of expenses</h2>
        <table class="table">
          <tbody>
            {expenses.map((expense, index) => {
              
              return (
                <tr key={index}>
                  <td class="text-dark">{expense.expenseAmount}</td>
                  <td className="text-secondary">
                    {expense.expenseDescription}
                  </td>
                  <td className="text-secondary">{expense.expenseCategory}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger text-white fw-bold"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WelcomePage;

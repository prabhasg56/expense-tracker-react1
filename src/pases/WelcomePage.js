import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Button, Form, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import fileDownload from "js-file-download";

import { authAction } from "../store/authSlice";
import { expenseAction } from "../store/expenseSlice";

const WelcomePage = () => {
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [expenseUpdateId, setExpenseUpdateId] = useState("");
  const [theme, setTheme] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const idToken = localStorage.getItem("token");

  const expenses = useSelector((state) => state.expenses.expenses);
  const totalExpense = useSelector(
    (state) => state.expenses.totalExpensesAmount
  );
  const userEmail = useSelector((state) => state.auth.userId);

  const userId = userEmail.replace(/[@.]/g, "");

  const spentAmountRef = useRef("");
  const expenseDescRef = useRef("");
  const expenseCatRef = useRef("");

  const baseUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDTB9cmJf7cTzfA2fAENNOyqnaSNpLFnac";

  const expenseBaseUrl =
    "https://expense-tracker-dc8d1-default-rtdb.firebaseio.com/";

  const isPremium = useSelector((state) => state.expenses.isPremium);
  let bgDark = theme && "bg-dark text-white vh-100";

  const logoutHandler = () => {
    dispatch(authAction.logout());
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

  const saveToFireBase = async (e) => {
    e.preventDefault();
    const enteredExpenseAmt = spentAmountRef.current.value;
    const enteredExpenseCat = expenseCatRef.current.value;
    const enteredExpenseDesc = expenseDescRef.current.value;

    try {
      const response = await fetch(`${expenseBaseUrl}${userId}/expense.json`, {
        method: "post",
        body: JSON.stringify({
          expenseAmount: enteredExpenseAmt,
          expenseDescription: enteredExpenseDesc,
          expenseCategory: enteredExpenseCat,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      if (response.status === 200) {
        alert("Expense added successfully!");
        fetchExpense();
        spentAmountRef.current.value = "";
        expenseCatRef.current.value = "";
        expenseDescRef.current.value = "";
      } else {
        throw new Error(responseJson.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const fetchExpense = async () => {
    try {
      const response = await fetch(`${expenseBaseUrl}${userId}/expense.json`);

      const jsonResponse = await response.json();
      const totalExpenses = [];
      let totalExpensesAmount = 0;

      for (let key in jsonResponse) {
        totalExpenses.push({
          id: key,
          expenseAmount: jsonResponse[key].expenseAmount,
          expenseDescription: jsonResponse[key].expenseDescription,
          expenseCategory: jsonResponse[key].expenseCategory,
        });

        totalExpensesAmount += Number(jsonResponse[key].expenseAmount);
      }

      dispatch(
        expenseAction.expenses({
          expense: totalExpenses,
          totalExpensesAmount: totalExpensesAmount,
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const editExpenseHandler = async (expense) => {
    spentAmountRef.current.value = expense.expenseAmount;
    expenseCatRef.current.value = expense.expenseCategory;
    expenseDescRef.current.value = expense.expenseDescription;

    setShowUpdateBtn(true);
    setExpenseUpdateId(expense.id);
  };

  const updateExpenseHandler = async (e) => {
    e.preventDefault();
    const enteredExpenseAmt = spentAmountRef.current.value;
    const enteredExpenseCat = expenseCatRef.current.value;
    const enteredExpenseDesc = expenseDescRef.current.value;

    setShowUpdateBtn(false);

    try {
      const response = await fetch(
        `${expenseBaseUrl}${userId}/expense/${expenseUpdateId}.json`,
        {
          method: "put",
          body: JSON.stringify({
            expenseAmount: enteredExpenseAmt,
            expenseDescription: enteredExpenseDesc,
            expenseCategory: enteredExpenseCat,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseJson = await response.json();

      if (response.status === 200) {
        alert("Expense updated successfully!");
        fetchExpense();
        spentAmountRef.current.value = "";
        expenseCatRef.current.value = "";
        expenseDescRef.current.value = "";
      } else {
        throw new Error(responseJson.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch(
        `${expenseBaseUrl}${userId}/expense/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        throw new Error("Somthing went wrong!");
      } else {
        alert("Deleted successfully!");
        fetchExpense();
      }
    } catch (error) {
      alert(error);
    }
  };

  const cancelBtnHandler = (e) => {
    e.preventDefault();
    spentAmountRef.current.value = "";
    expenseCatRef.current.value = "";
    expenseDescRef.current.value = "";
    setShowUpdateBtn(false);
  };

  const activatePremiumHandler = () => {
    dispatch(expenseAction.activatePremium({ dark: true }));
    setTheme(true);
  };

  const expenseReporHandler = () => {
    const makeCSV = expenses
      .map((ex) => Object.entries(ex).join(","))
      .join("\n");

    fileDownload(makeCSV, "expense.csv");
  };

  const bgThemeHandler = () => {
    theme ? setTheme(false) : setTheme(true);
  };

  return (
    <div className={bgDark}>
      <Navbar className="navbar bg-secondary border-bottom border-dark">
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
        {isPremium && (
          <button
            onClick={() => bgThemeHandler()}
            className="btn btn-dark rounded-pill"
          >
            {!theme ? "dark" : "light"}
          </button>
        )}
      </Navbar>

      <Form className="bg-secondary  bg-gradient mt-3 p-3 m-4 rounded">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Spent amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter spent amount"
              ref={spentAmountRef}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Expense description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter expense description"
              ref={expenseDescRef}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Category of the expense</Form.Label>
          <Form.Control
            placeholder="Enter expense category"
            ref={expenseCatRef}
          />
        </Form.Group>

        {!showUpdateBtn && (
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => saveToFireBase(e)}
          >
            Add expense
          </Button>
        )}

        {showUpdateBtn && (
          <Button
            variant="success"
            type="submit"
            onClick={(e) => updateExpenseHandler(e)}
          >
            Update
          </Button>
        )}

        {showUpdateBtn && (
          <Button
            variant="danger"
            type="submit"
            className="ms-3"
            onClick={(e) => cancelBtnHandler(e)}
          >
            Cancel
          </Button>
        )}
      </Form>

      <div class="container mt-3 ">
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
                      className="btn btn-primary text-white fw-bold"
                      onClick={() => editExpenseHandler(expense)}
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger text-white fw-bold ms-3"
                      onClick={() => deleteExpenseHandler(expense.id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <p className="fw-bold">
                  {`Total expense = ${totalExpense}`}
                  {totalExpense >= 10000 && !isPremium && (
                    <button
                      type="button"
                      className="btn bg-success text-white fw-bold ms-3"
                      onClick={() => activatePremiumHandler()}
                    >
                      Activate Premium
                    </button>
                  )}
                  {isPremium && (
                    <button
                      className="btn bg-info bg-gradient text-white fw-bold ms-3"
                      onClick={() => expenseReporHandler()}
                    >
                      Download expenses report
                    </button>
                  )}
                </p>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WelcomePage;

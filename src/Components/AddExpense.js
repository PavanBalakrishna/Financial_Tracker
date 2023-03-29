import React, { useState, useContext } from 'react'
import FileService from '../Utilities/aws'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Expense from '../Models/Expense';
import Utilities from '../Utilities/Utilities';
import { ExpensesContext, ReRenderContext } from '../CustomContextProvider';

export default function AddExpense() {
    const ReRenderContextObject = useContext(ReRenderContext);
    const ExpenseContextObject = useContext(ExpensesContext);
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseCurrency, setExpenseCurrency] = useState('JPY');
    const [expenseName, setExpenseName] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date().toLocaleDateString("fr-CA"));
    const [successfullyAdded, setSuccessfullyAdded] = useState(false);
    const [failedToadd, setFailedToadd] = useState(false);
    if (Utilities.GetCookie("FinancialTracker.ExpenseGroup") === "") {
        Utilities.SetCookie("FinancialTracker.ExpenseGroup", "Home")
    }
    const [expenseGroup, setExpenseGroup] = useState(Utilities.GetCookie("FinancialTracker.ExpenseGroup"));

    const handleSubmit = (event) => {
        event.preventDefault();


        let newid = 0;
        ExpenseContextObject.expensesState.forEach((m) => {
            if (m.Id > newid) {
                newid = m.Id;
            }
        })
        let addExpense = new Expense(newid + 1, expenseName, expenseDate, expenseCategory, expenseAmount, expenseCurrency, expenseGroup, Utilities.ConvertToYen(expenseAmount, expenseCurrency));
        ExpenseContextObject.setExpensesState([...ExpenseContextObject.expensesState, addExpense])
        FileService.SaveDataToAWS("data/Expense.json", [...ExpenseContextObject.expensesState, addExpense], (resposne, err) => {
            if (err === null) {
                setSuccessfullyAdded(true);
                setFailedToadd(false);
                ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
            } else {
                setSuccessfullyAdded(false);
                setFailedToadd(true);
            }
        });

        setExpenseAmount(0);
        setExpenseCategory('');
        setExpenseCurrency('JPY');
        setExpenseName('');
        setExpenseDate(new Date().toLocaleDateString("fr-CA"));
        setExpenseGroup('Home');

    };
    return (

        <Container>
            <header>
                <h1>Add Expense</h1>
            </header>
            <Row>
                <Col m={4}>
                    <h4 >Expense Group</h4>
                    <Form>
                        <Form.Group controlId="expenseGroup">
                            <Form.Control
                                as="select"
                                value={expenseGroup}
                                onChange={(event) => {
                                    Utilities.SetCookie("FinancialTracker.ExpenseGroup", event.target.value);
                                    setExpenseGroup(event.target.value)
                                }}
                            >
                                <option value="Home">Home</option>
                                <option value="India">India</option>
                                <option value="KruthikaParents">Kruthika Parents</option>
                                <option value="PavanParents">Pavan Parents</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            {
                !successfullyAdded && !failedToadd ?
                    (
                        <Row>
                            <Col m={12}>
                                <h4 >Add Details</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="expenseAmount">
                                        <Form.Label>Expense Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter expense amount"
                                            value={expenseAmount}
                                            onChange={(event) => setExpenseAmount(parseInt(event.target.value))}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="expenseCategory">
                                        <Form.Label>Expense Category</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={expenseCategory}
                                            onChange={(event) => setExpenseCategory(event.target.value)}
                                            required
                                        >
                                            <option value="">Select expense category</option>
                                            <option value="Eatingout">Eating out</option>
                                            <option value="Groceries">Groceries</option>
                                            <option value="Home">Home</option>
                                            <option value="Bills">Bills</option>
                                            <option value="Transportation">Transportation</option>
                                            <option value="Accommodation">Accommodation</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Others">Others</option>
                                            <option value="Backloginfo">Backlog Information</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="expenseName">
                                        <Form.Label>Expense Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter expense name"
                                            value={expenseName}
                                            onChange={(event) => setExpenseName(event.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="expenseCurrency">
                                        <Form.Label>Expense Currency</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={expenseCurrency}
                                            onChange={(event) => setExpenseCurrency(event.target.value)}
                                            required
                                        >
                                            <option value="JPY">Japanese Yen (JPY)</option>
                                            <option value="INR">Indian Rupee (INR)</option>
                                            <option value="THB">Thai Baht (THB)</option>
                                            <option value="USD">US Dollar (USD)</option>
                                            <option value="EUR">Euro (EUR)</option>
                                            <option value="GBP">British Pound (GBP)</option>
                                            <option value="AUD">Australian Dollar (AUD)</option>
                                            <option value="CAD">Canadian Dollar (CAD)</option>
                                            <option value="CHF">Swiss Franc (CHF)</option>
                                            <option value="CNY">Chinese Yuan (CNY)</option>
                                            <option value="HKD">Hong Kong Dollar (HKD)</option>
                                            <option value="NZD">New Zealand Dollar (NZD)</option>
                                            <option value="SGD">Singapore Dollar (SGD)</option>
                                            <option value="ZAR">South African Rand (ZAR)</option>
                                            <option value="SEK">Swedish Krona (SEK)</option>
                                            <option value="KRW">South Korean Won (KRW)</option>
                                            <option value="SKK">Slovak Koruna (SKK)</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="expenseDate">
                                        <Form.Label>Expense Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Enter expense date"
                                            value={expenseDate}
                                            onChange={(event) => setExpenseDate(event.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    )
                    : (
                        <Row>
                            <Col m={12}>
                                {
                                    successfullyAdded && <div className="success-alert">
                                        Successfully added expense!
                                    </div>
                                }{
                                    failedToadd && <div className="failure-alert">
                                        Failed to add expense!
                                    </div>
                                }
                                <div >
                                    <input type="button" value="Add another expense" onClick={() => {
                                        setSuccessfullyAdded(false);
                                        setFailedToadd(false);
                                    }} />
                                </div>

                            </Col>
                        </Row>

                    )
            }
        </Container>
    )
}

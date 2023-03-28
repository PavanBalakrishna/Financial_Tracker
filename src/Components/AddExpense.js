import React, { useState } from 'react'
import FileService from '../Utilities/aws'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Expense from '../Models/Expense';
import Utilities from '../Utilities/Utils';

export default function AddExpense() {
    const [expenseAmount, setExpenseAmount] = useState('');
    const [expenseCategory, setExpenseCategory] = useState('');
    const [expenseCurrency, setExpenseCurrency] = useState('JPY');
    const [expenseName, setExpenseName] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().substring(0, 10));
    if (Utilities.GetCookie("FinancialTracker.ExpenseGroup") === "") {
        Utilities.SetCookie("FinancialTracker.ExpenseGroup", "Home")
    }
    const [expenseGroup, setExpenseGroup] = useState(Utilities.GetCookie("FinancialTracker.ExpenseGroup"));

    const handleSubmit = (event) => {
        event.preventDefault();
        
        
        let newid = 0;
        window.FinancialTracker.Expenses.forEach((m) => {
            if (m.Id > newid) {
                newid = m.Id;
            }
        })
        let addExpense = new Expense( newid + 1, expenseName, expenseDate, expenseCategory, expenseAmount, expenseCurrency, expenseGroup);
        window.FinancialTracker.Expenses.push(addExpense)
        FileService.SaveDataToAWS("data/Expense.json", window.FinancialTracker.Expenses)
        setExpenseAmount('');
        setExpenseCategory('');
        setExpenseCurrency('JPY');
        setExpenseName('');
        setExpenseDate(new Date().toISOString().substring(0, 10));
        setExpenseGroup('Home');

    };
    return (

        <Container>
            <header>
                <h1>Add Expense</h1>
            </header>
            <Row>
                <Col m={4}>
                    <h3 >Expense Group</h3>
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
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col m={12}>
                <h3 >Add Details</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="expenseAmount">
                            <Form.Label>Expense Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter expense amount"
                                value={expenseAmount}
                                onChange={(event) => setExpenseAmount(event.target.value)}
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
                                <option value="eatingout">Eating out</option>
                                <option value="groceries">Groceries</option>
                                <option value="home">Home</option>
                                <option value="transportation">Transportation</option>
                                <option value="accommodation">Accommodation</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="others">Others</option>
                                <option value="backlog">Backlog</option>
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
                                <option value="JPY">JPY</option>
                                <option value="INR">INR</option>
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

                        <Button  type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

import React, {useContext} from 'react'
import { Container, Row, Col, Table, } from 'react-bootstrap';
import { ExpensesContext } from '../../CustomContextProvider';
import Utilities from '../../Utilities/Utilities';

export default function Summary() {

  const ExpenseContextObject = useContext(ExpensesContext);
  const currentDateRange = Utilities.GetCurrent25DateRange();
  
  const dailyExpenses = ExpenseContextObject.expensesState.filter(m => m.Date === new Date().toLocaleDateString("fr-CA"));

  const monthly25Expenses = Utilities.GroupDatesByPeriod(ExpenseContextObject.expensesState);
  if (!monthly25Expenses[currentDateRange]) {
    monthly25Expenses[currentDateRange] = [];
  }
  const category25Expenses = monthly25Expenses[currentDateRange].reduce((result, expense) => {
    let category = expense.Category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(expense);
    return result;
  }, {})
  
  const grouped25Expenses = monthly25Expenses[currentDateRange].reduce((result, expense) => {
    const group = expense.Group;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(expense);
    return result;
  }, {});

  const categoryTotalExpenses = ExpenseContextObject.expensesState.reduce((result, expense) => {
    let category = expense.Category;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(expense);
    return result;
  }, {})

  const groupedTotalExpenses = ExpenseContextObject.expensesState.reduce((result, expense) => {
    const group = expense.Group;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(expense);
    return result;
  }, {});


  return (
    <>
      <Container fluid>
        <h4>Today's Expenses</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Amount In Yen</th>
                  <th>Currency</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                {

                  dailyExpenses.map((m) => {
                    return (
                      <tr key={m.Id}>
                        <td>{m.Id}</td>
                        <td>{m.Name}</td>
                        <td>{m.Date}</td>
                        <td>{m.Category}</td>
                        <td>{m.Amount}</td>
                        <td>{m.ConvertedAmount}</td>
                        <td>{m.Currency}</td>
                        <td>{m.Group}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <h6>Today's Total: {dailyExpenses.reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</h6>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>25 to 25 Expenses</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total In Yen</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(monthly25Expenses).map((month) => {
                    return (
                      <tr key={month}>
                        <td>{month}</td>
                        <td>{monthly25Expenses[month].reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Category wise Expenses for {currentDateRange}</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total In Yen</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(category25Expenses).map((category) => {
                    return (
                      <tr key={category}>
                        <td>{category}</td>
                        <td>{category25Expenses[category].reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Group wise Expenses for {currentDateRange}</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Total In Yen</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(grouped25Expenses).map((group) => {
                    return (
                      <tr key={group}>
                        <td>{group}</td>
                        <td>{grouped25Expenses[group].reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Category Wise Expenses(All Time)</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total In Yen</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(categoryTotalExpenses).map((category) => {
                    return (
                      <tr key={category}>
                        <td>{category}</td>
                        <td>{categoryTotalExpenses[category].reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Group Wise Expenses (All Time))</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Total In Yen</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(groupedTotalExpenses).map((group) => {
                    return (
                      <tr key={group}>
                        <td>{group}</td>
                        <td>{groupedTotalExpenses[group].reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

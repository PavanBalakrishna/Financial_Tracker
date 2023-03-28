import React from 'react'
import { Container, Row, Col , Table, } from 'react-bootstrap';

export default function DailyExpenses() {

  const groupedExpenses = window.FinancialTracker.Expenses.reduce((result, expense) => {
    const group = expense.Group;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(expense);
    return result;
  }, {});

  const monthlyExpenses = window.FinancialTracker.Expenses.filter(m => m.Date.substring(0, 7) === new Date().toISOString().substring(0, 7)).reduce((result, expense) => {
    const month = expense.Date.substring(0, 7);
    if (!result[month]) {
      result[month] = [];
    }
    result[month].push(expense);
    return result;
  }, {})

  return (
    <>
      <Container>
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
                  <th>Currency</th>
                  <th>Group</th>
                </tr>
              </thead>
              <tbody>
                {
                
                window.FinancialTracker.Expenses.filter(m => m.Date === new Date().toISOString().substring(0, 10)).map((m) => {
                  return (
                    <tr key={m.Id}>
                      <td>{m.Id}</td>
                      <td>{m.Name}</td>
                      <td>{m.Date}</td>
                      <td>{m.Category}</td>
                      <td>{m.Amount}</td>
                      <td>{m.Currency}</td>
                      <td>{m.Group}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Monthly Total Expenses</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(monthlyExpenses).map((month) => {
                  return (
                    <tr key={month}>
                      <td>{month}</td>
                      <td>{monthlyExpenses[month].reduce((sum, expense) => parseInt(sum) + parseInt(expense.Amount), 0)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Grouped Expenses</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
              Object.keys(groupedExpenses).map((group) => {
                  return (
                    <tr key={group}>
                      <td>{group}</td>
                      <td>{groupedExpenses[group].reduce((sum, expense) => parseInt(sum) + parseInt(expense.Amount), 0)}</td>
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

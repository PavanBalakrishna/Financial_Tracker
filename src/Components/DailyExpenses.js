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
  
  console.log(groupedExpenses);

  return (
    <>
      <Container>
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
                
                window.FinancialTracker.Expenses.map((m) => {
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
    </>
  )
}

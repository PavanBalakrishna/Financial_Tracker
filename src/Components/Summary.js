import React, {useContext} from 'react'
import { Container, Row, Col, Table, } from 'react-bootstrap';
import FileService from '../Utilities/aws'
import { ExpensesContext, ReRenderContext } from '../CustomContextProvider';

export default function Summary() {

  const ReRenderContextObject = useContext(ReRenderContext);
  const ExpenseContextObject = useContext(ExpensesContext);
  const groupedExpenses = ExpenseContextObject.expensesState.reduce((result, expense) => {
    const group = expense.Group;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(expense);
    return result;
  }, {});

  const dailyExpenses = ExpenseContextObject.expensesState.filter(m => m.Date === new Date().toISOString().substring(0, 10));

  const monthlyExpenses = ExpenseContextObject.expensesState.filter(m => m.Date.substring(0, 7) === new Date().toISOString().substring(0, 7)).reduce((result, expense) => {
    let month = expense.Date.substring(0, 7);
    if (!result[month]) {
      result[month] = [];
    }
    result[month].push(expense);
    return result;
  }, {})

  const deleteExpense = (id) => {
    return () => {
      let listWithoutId = ExpenseContextObject.expensesState.filter(m => m.Id !== id);
      ExpenseContextObject.setExpensesState(listWithoutId);
      FileService.SaveDataToAWS("data/Expense.json", listWithoutId, (_, err) =>{
        if(err){
          console.log(err);
        }else{
          ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
        }
      });
      
    }
  }


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
                        <td><input type="button" value="Delete" onClick={deleteExpense(m.Id)} /> </td>
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
        <h4>Monthly Total Expenses</h4>
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
                  Object.keys(monthlyExpenses).map((month) => {
                    return (
                      <tr key={month}>
                        <td>{month}</td>
                        <td>{monthlyExpenses[month].reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container>
        <h4>Group wise Expenses</h4>
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
                  Object.keys(groupedExpenses).map((group) => {
                    return (
                      <tr key={group}>
                        <td>{group}</td>
                        <td>{groupedExpenses[group].reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</td>
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

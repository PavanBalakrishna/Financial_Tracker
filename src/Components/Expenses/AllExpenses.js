import React, {  useContext } from 'react'
import { ExpensesContext, ReRenderContext } from '../../CustomContextProvider';
import { Container, Row, Col, Table, } from 'react-bootstrap';
import FileService from '../../Utilities/aws'

export default function AllExpenses() {
    const ReRenderContextObject = useContext(ReRenderContext);
    const ExpenseContextObject = useContext(ExpensesContext);
    const deleteExpense = (id) => {
        return () => {
          let listWithoutId = ExpenseContextObject.expensesState.filter(m => m.Id !== id);
          ExpenseContextObject.setExpensesState(listWithoutId);
          FileService.SaveDataToAWS("data/Expenses.json", listWithoutId, (_, err) =>{
            if(err){
              console.log(err);
            }else{
              ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
            }
          });
          
        }
      }

    return (
        <Container fluid>
            <h4>All Expenses</h4>
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

                        ExpenseContextObject.expensesState.map((m) => {
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
                    <h6>Total: {ExpenseContextObject.expensesState.reduce((sum, expense) => parseInt(sum) + parseInt(expense.ConvertedAmount), 0)} Yen</h6>
                </Col>
            </Row>
        </Container>
    )
}
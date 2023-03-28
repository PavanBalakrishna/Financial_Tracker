import React, { useState, useEffect  } from 'react'
import AddExpense from './Components/AddExpense';
import DailyExpenses from './Components/DailyExpenses'
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FileService from './Utilities/aws';

window.FinancialTracker= {}
window.FinancialTracker.Expenses=[]

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  

const fetchData = async () => {
  const response = await FileService.GetListFromAWS("data/Expense.json");
  window.FinancialTracker.Expenses=response;
  setIsLoaded(true);
};

  return (
    <div className="App">
      <Container>
          <Row>
            <Col md={12}>
              <AddExpense />
            </Col>
          </Row>
        </Container>
        <Container>
          {
            isLoaded ? <Row>
            <Col md={12}>
              <DailyExpenses />
            </Col>
          </Row> : <div>Loading...</div>
          }
          
        </Container>
    </div>
  );
}

export default App;

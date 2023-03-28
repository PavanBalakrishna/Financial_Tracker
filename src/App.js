import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect  } from 'react'
import AddExpense from './Components/AddExpense';
import Summary from './Components/Summary'
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
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Summary">Summary</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Container className="expense-container component-container">
              <Row>
                <Col md={12}>
                  <AddExpense />
                </Col>
              </Row>
            </Container>}>
            
          </Route>
          <Route path="/Summary" element={<Container className="summary-container component-container">
              {isLoaded ? (
                <Row>
                  <Col md={12}>
                    <Summary />
                  </Col>
                </Row>
              ) : (
                <div class="failure-alert">Loading OR Error</div>
              )}
            </Container>}>
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

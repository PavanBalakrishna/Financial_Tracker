import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import AddExpense from './Components/AddExpense';
import Summary from './Components/Summary'
import AllExpenses from './Components/AllExpenses';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FileService from './Utilities/aws';
import { ExpensesContext, ReRenderContext } from './CustomContextProvider';
import Utilities from './Utilities/Utils';

window.FinancialTracker = {}
window.FinancialTracker.Expenses = []

function App() {
  const [expensesState, setExpensesState] = useState([]);
  const [rerenderForm, setrerenderForm] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await FileService.GetListFromAWS("data/Expense.json");
    window.FinancialTracker.Expenses = response.sort(Utilities.SortByDates);
    setExpensesState(response);
  };

  return (
    <Router>
      <ExpensesContext.Provider value={{
        expensesState:expensesState,
        setExpensesState: setExpensesState
        }}>
        <ReRenderContext.Provider value={{
          rerenderForm: rerenderForm,
          setrerenderForm: setrerenderForm
        }}>
          <div className="App">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Summary">Summary</Link>
                </li>
                <li>
                  <Link to="/All">All</Link>
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
                  <Row>
                    <Col md={12}>
                      <Summary />
                    </Col>
                  </Row>
              </Container>}>
              </Route>
              <Route path="/All" exact element={<Container className="all-container component-container">
                <Row>
                  <Col md={12}>
                    <AllExpenses />
                  </Col>
                </Row>
              </Container>}>
              </Route>
            </Routes>
          </div>
        </ReRenderContext.Provider>
      </ExpensesContext.Provider>

    </Router>
  );
}

export default App;

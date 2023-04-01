import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import AddExpense from './Components/Expenses/AddExpense';
import Summary from './Components/Expenses/Summary'
import AllExpenses from './Components/Expenses/AllExpenses';
import AddInvestment from './Components/Investments/AddInvestments';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FileService from './Utilities/aws';
import { ExpensesContext, ReRenderContext, InvestmentsContext } from './CustomContextProvider';
import Utilities from './Utilities/Utilities';
import Investments from './Components/Investments/Investments';
import Report from './Components/Investments/Report';

window.FinancialTracker = {}
window.FinancialTracker.Expenses = []
window.FinancialTracker.Investments = []

function App() {
  const [expensesState, setExpensesState] = useState([]);
  const [investmentsState, setInvestmentsState] = useState([]);
  const [rerenderForm, setrerenderForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const resetPage = () => {
    setrerenderForm(!rerenderForm);
    window.scrollTo(0, 0);
  }

  const fetchData = async () => {
    const response = await FileService.GetListFromAWS("data/Expenses.json");
    window.FinancialTracker.Expenses = response.sort(Utilities.SortByDates);
    setExpensesState(response);

    const response2 = await FileService.GetListFromAWS("data/Investments.json");
    window.FinancialTracker.Investments = response2.sort(Utilities.SortByDates);
    setInvestmentsState(response2);
  };


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <InvestmentsContext.Provider value={{
        investmentsState: investmentsState,
        setInvestmentsState: setInvestmentsState
      }}>
        <ExpensesContext.Provider value={{
          expensesState: expensesState,
          setExpensesState: setExpensesState
        }}>
          <ReRenderContext.Provider value={{
            rerenderForm: rerenderForm,
            resetPage: resetPage
          }}>
            <div className="App">
              <Container fluid>
              <button onClick={handleToggle} className="toggle-button">Menu</button>
                <div className={`side-menu sidebar-${isOpen ? 'shown' : 'hidden'}`}>
                <button onClick={handleToggle} className="toggle-button">Close</button>
                  <ul>
                    <li>
                      <Link to="/" onClick={() => setIsOpen(false)}>Add Expense</Link>
                    </li>
                    <li>
                      <Link to="/Expenses/Summary" onClick={() => setIsOpen(false)}>Expenses Report</Link>
                    </li>
                    <li>
                      <Link to="/Expenses/All" onClick={() => setIsOpen(false)}>All Expenses</Link>
                    </li>
                    <li>
                      <Link to="/Investments" onClick={() => setIsOpen(false)}>All Investments</Link>
                    </li>
                    <li>
                      <Link to="/Investments/AddInvestment" onClick={() => setIsOpen(false)}>Add Investment</Link>
                    </li>
                    <li>
                      <Link to="/Investments/Report" onClick={() => setIsOpen(false)}>Investment Report</Link>
                    </li>
                  </ul>
                </div>

              </Container>
              <Container className='main-content' fluid onClick={() => setIsOpen(false)}>
                <Routes>
                  <Route path="/" exact element={<Container className="expense-container component-container" fluid>
                    <Row>
                      <Col md={12}>
                        <AddExpense />
                      </Col>
                    </Row>
                  </Container>}>
                  </Route>
                  <Route path="/Expenses/Summary" element={<Container className="summary-container component-container" fluid>
                    <Row>
                      <Col md={12}>
                        <Summary />
                      </Col>
                    </Row>
                  </Container>}>
                  </Route>
                  <Route path="/Expenses/All" exact element={<Container className="all-container component-container" fluid>
                    <Row>
                      <Col md={12}>
                        <AllExpenses />
                      </Col>
                    </Row>
                  </Container>}>
                  </Route>
                  <Route path="/Investments" element={<Container className="investments-container component-container" fluid>
                    <Row>
                      <Col md={12}>
                        <Investments />
                      </Col>
                    </Row>
                  </Container>}>
                  </Route>
                  <Route path="/Investments/AddInvestment" element={<Container className="addinvestment-container component-container" fluid>
                    <Row>
                      <Col md={12}>
                        <AddInvestment />
                      </Col>
                    </Row>
                  </Container>}>
                  </Route>
                  <Route path="/Investments/Report" element={<Container className="report-container component-container" fluid>
                    <Row>
                      <Col md={12}>
                        <Report />
                      </Col>
                    </Row>
                  </Container>}>
                  </Route>
                </Routes>
              </Container>
            </div>
          </ReRenderContext.Provider>
        </ExpensesContext.Provider>
      </ InvestmentsContext.Provider>
    </Router>
  );
}

export default App;

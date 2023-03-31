import React, {useContext} from 'react'
import { Container, Row, Col, Table, } from 'react-bootstrap';
import { InvestmentsContext } from '../../CustomContextProvider';
import Utilities from '../../Utilities/Utilities';

export default function Report() {

  const InvestmentContextObject = useContext(InvestmentsContext);
  
  const ownerGroups = InvestmentContextObject.investmentsState.reduce((result, investment) => {
    const group = investment.Owner;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(investment);
    return result;
  }, {});

  const typesGroups = InvestmentContextObject.investmentsState.reduce((result, investment) => {
    const group = investment.Type;
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(investment);
    return result;
  }, {});

  return (
    <>
      <Container fluid>
        <h4>Total Investments Report</h4>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Investment Owner</th>
                  <th>Investment Amount</th>
                  </tr>
              </thead>
              <tbody>
              {
                  Object.keys(ownerGroups).map((owner) => {
                    return (
                      <tr key={owner}>
                        <td>{owner}</td>
                        <td>{ownerGroups[owner].reduce((sum, investment) => parseInt(sum) + parseInt(Utilities.ConvertToINR(investment.Amount, investment.Currency)), 0)} INR</td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table>
              <thead>
                <tr>
                  <th>Investment Type</th>
                  <th>Investment Amount</th>
                  </tr>
              </thead>
              <tbody>
              {
                  Object.keys(typesGroups).map((investmenttype) => {
                    return (
                      <tr key={investmenttype}>
                        <td>{investmenttype}</td>
                        <td>{typesGroups[investmenttype].reduce((sum, investment) => parseInt(sum) + parseInt(Utilities.ConvertToINR(investment.Amount, investment.Currency)), 0)} INR</td>
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

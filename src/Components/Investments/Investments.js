import { useContext} from 'react';
import { InvestmentsContext } from '../../CustomContextProvider';
import { Container, Row, Col, Table, } from 'react-bootstrap';


export default function Investments() {
    const InvestmentsContextObject = useContext(InvestmentsContext);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Investments</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Source</th>
                            <th>Currency</th>
                            <th>IsSIP</th>
                            <th>Location</th>
                            <th>Owner</th>
                            <th>Type</th>
                            <th>SIPAmount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            InvestmentsContextObject.investmentsState.map((investment, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{investment.Amount}</td>
                                        <td>{investment.Source}</td>
                                        <td>{investment.Currency}</td>
                                        <td>{investment.IsSIP ? <span>Y</span> : <span>N</span>}</td>
                                        <td>{investment.Location}</td>
                                        <td>{investment.Owner}</td>
                                        <td>{investment.Type}</td>
                                        <td>{investment.SIPAmount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                </Col>
            </Row>
            </Container>
    )
}
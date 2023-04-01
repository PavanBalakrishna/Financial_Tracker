import React, { useState, useContext } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { InvestmentsContext, ReRenderContext } from '../../CustomContextProvider';
import Investment from '../../Models/Investment';
import FileService from '../../Utilities/aws'

window.FinancialTracker = {}
window.FinancialTracker.Investments = []

export default function AddInvestments() {
    const InvestmentsContextObject = useContext(InvestmentsContext);
    const ReRenderContextObject = useContext(ReRenderContext);
    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [currency, setCurrency] = useState("");
    const [isSIP, setIsSIP] = useState(false);
    const [location, setLocation] = useState("");
    const [owner, setOwner] = useState("");
    const [type, setType] = useState("");
    const [sIPAmount, setSIPAmount] = useState("");
    const [successfullyAdded, setSuccessfullyAdded] = useState(false);
    const [failedToadd, setFailedToadd] = useState(false);
    


    const handleSubmit = (e) => {
        e.preventDefault();
        let newid = 0;
        InvestmentsContextObject.investmentsState.forEach((m) => {
            if (m.Id > newid) {
                newid = m.Id;
            }
        })
        const newInvestment = new Investment(
            newid + 1, // Generate a random ID for the new investment
            amount,
            source,
            currency,
            isSIP,
            location,
            owner,
            type,
            sIPAmount
        );
        InvestmentsContextObject.setInvestmentsState([...InvestmentsContextObject.investmentsState, newInvestment])
        FileService.SaveDataToAWS("data/Investments.json", [...InvestmentsContextObject.investmentsState, newInvestment], (resposne, err) => {
            if (err === null) {
                setSuccessfullyAdded(true);
                setFailedToadd(false);
                setAmount("");
                setSource("");
                setCurrency("");
                setIsSIP(false);
                setLocation("");
                setOwner("");
                setType("");
                setSIPAmount("");
                ReRenderContextObject.resetPage();
            } else {
                setSuccessfullyAdded(false);
                setFailedToadd(true);
            }
        });

    };

    return (
        <Container fluid>
            <header>
                <h1>Add Investment</h1>
            </header>
            {
                !successfullyAdded && !failedToadd ?



                    (
                        <Row>
                            <Col m={12}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="amount">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="source">
                                        <Form.Label>Source</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={source}
                                            onChange={(e) => setSource(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="currency">
                                        <Form.Label>Currency</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={currency}
                                            onChange={(event) => setCurrency(event.target.value)}
                                            required
                                        >
                                            <option value="">Select currency</option>
                                            <option value="INR">Indian Rupee (INR)</option>
                                            <option value="JPY">Japanese Yen (JPY)</option>
                                        </Form.Control>
                                    </Form.Group>


                                    <Form.Group controlId="isSIP">
                                        <Form.Check
                                            type="checkbox"
                                            label="SIP?"
                                            checked={isSIP}
                                            onChange={(e) => setIsSIP(e.target.checked)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="sIPAmount">
                                        <Form.Label>SIP Amount</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={sIPAmount}
                                            onChange={(e) => setSIPAmount(e.target.value)}
                                            {...(isSIP ? { required: true } : { disabled: true })}
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="location">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            required
                                        >
                                            <option value="">Select location</option>
                                            <option value="India">India</option>
                                            <option value="Japan">Japan</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="owner">
                                        <Form.Label>Owner</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={owner}
                                            onChange={(event) => setOwner(event.target.value)}
                                            required
                                        >
                                            <option value="">Select owner</option>
                                            <option value="Pavan">Pavan</option>
                                            <option value="Kruthika">Kruthika</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="type">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={type}
                                            onChange={(event) => setType(event.target.value)}
                                            required
                                        >
                                            <option value="">Select investment type</option>
                                            <option value="EQUITY">EQUITY</option>
                                            <option value="DEBT">DEBT</option>
                                            <option value="HYBRID">HYBRID</option>
                                            <option value="CASH">CASH</option>
                                            <option value="FD">FD</option>
                                            <option value="ULIP">ULIP</option>
                                            <option value="LIQUILOAN">LIQUILOAN</option>
                                            <option value="LIC">LIC</option>
                                            <option value="PF">PF</option>
                                            <option value="NPS">NPS</option>
                                            <option value="GOLD">GOLD</option>
                                            <option value="REALESTATE">REALESTATE</option>
                                            <option value="OTHER">OTHER</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Investment
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    ) : (
                        <Row>
                            <Col m={12}>
                                {
                                    successfullyAdded && <div className="success-alert">
                                        Successfully added investment!
                                    </div>
                                }{
                                    failedToadd && <div className="failure-alert">
                                        Failed to add investment!
                                    </div>
                                }
                                <div >
                                    <input type="button" value="Add another expense" onClick={() => {
                                        setSuccessfullyAdded(false);
                                        setFailedToadd(false);
                                    }} />
                                </div>

                            </Col>
                        </Row>
                    )
            }
        </Container>
    );
}
import { useState, useContext } from 'react';
import { InvestmentsContext, ReRenderContext } from '../../CustomContextProvider';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import FileService from '../../Utilities/aws'

export default function Investments() {
    const InvestmentsContextObject = useContext(InvestmentsContext);
    const ReRenderContextObject = useContext(ReRenderContext);
    const [editableRowIndex, setEditableRowIndex] = useState(-1);
    const [editableInvestment, setEditableInvestment] = useState({});

    const handleUpdate = (index) => {
        setEditableInvestment(InvestmentsContextObject.investmentsState[index]);
        setEditableRowIndex(index);
    };

    const handleDelete = (id) => {
        let listWithoutId = InvestmentsContextObject.investmentsState.filter(m => m.Id !== id);
        FileService.SaveDataToAWS("data/Investments.json", listWithoutId, (resposne, err) => {
            if (err === null) {
                ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
                InvestmentsContextObject.setInvestmentsState(listWithoutId);
            }
        });
    };

    const handleChange = (field, value) => {
        setEditableInvestment({ ...editableInvestment, [field]: value });
    };



    const handleSave = () => {
        const newInvestmentArray = InvestmentsContextObject.investmentsState.map((inv) => {
            return inv.Id === editableInvestment.Id ? { ...inv, ...editableInvestment } : inv;
        });
        FileService.SaveDataToAWS("data/Investments.json", newInvestmentArray, (resposne, err) => {
            if (err === null) {
                ReRenderContextObject.setrerenderForm(!ReRenderContextObject.rerenderForm);
                InvestmentsContextObject.setInvestmentsState(newInvestmentArray);
            }
        });
        setEditableRowIndex(-1);
    };

    const handleSIP = (index) => {
        let updatetableInvestment = InvestmentsContextObject.investmentsState[index];
        updatetableInvestment.Amount =  parseInt(updatetableInvestment.Amount) + parseInt(updatetableInvestment.SIPAmount);
        setEditableInvestment(updatetableInvestment);
        setEditableRowIndex(index);

        
    };

    const cancelUpdate = () => {
        setEditableRowIndex(-1);
    };

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
                                <th>Id</th>
                                <th>Amount</th>
                                <th>Source</th>
                                <th>Currency</th>
                                <th>IsSIP</th>
                                <th>Location</th>
                                <th>Owner</th>
                                <th>Type</th>
                                <th>SIPAmount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {InvestmentsContextObject.investmentsState.map((investment, index) => {
                                return (
                                    <tr key={index}>
                                        {editableRowIndex === index ? (
                                            <>

                                                <td>{investment.Id}</td>
                                                <td>
                                                            <input
                                                                type="number"
                                                                defaultValue={investment.Amount}
                                                                onChange={(e) => handleChange('Amount', e.target.value)}
                                                            />
                                                        </td>

                                                <td>{investment.Source}</td>
                                                <td>{investment.Currency}</td>
                                                <td>{investment.IsSIP ? 'Yes' : 'No'}</td>
                                                <td>{investment.Location}</td>
                                                <td>{investment.Owner}</td>
                                                <td>{investment.Type}</td>
                                                <td>{investment.SIPAmount}</td>
                                                <td>
                                                    <Button variant="success" onClick={() => handleSave(index)}>
                                                        Save
                                                    </Button>

                                                    {
                                                        investment.IsSIP ? (
                                                            <Button variant="warning" onClick={() => handleSIP(index)}>
                                                                Add SIP
                                                            </Button>
                                                        ) : (
                                                            <div></div>
                                                        )
                                                    }
                                                    <Button variant="secondary" onClick={() => cancelUpdate(index)}>
                                                        Cancel
                                                    </Button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{investment.Id}</td>
                                                <td>{investment.Amount}</td>
                                                <td>{investment.Source}</td>
                                                <td>{investment.Currency}</td>
                                                <td>{investment.IsSIP ? 'Yes' : 'No'}</td>
                                                <td>{investment.Location}</td>
                                                <td>{investment.Owner}</td>
                                                <td>{investment.Type}</td>
                                                <td>{investment.SIPAmount}</td>
                                                <td>
                                                    <Button variant="primary" onClick={() => handleUpdate(index)}>
                                                        Update
                                                    </Button>
                                                    <Button variant="danger" onClick={() => handleDelete(investment.Id)}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}


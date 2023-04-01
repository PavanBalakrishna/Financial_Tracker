import { useState, useContext } from 'react';
import { InvestmentsContext, ReRenderContext } from '../../CustomContextProvider';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import FileService from '../../Utilities/aws'
import Utilities from '../../Utilities/Utilities';

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
                ReRenderContextObject.resetPage();
                InvestmentsContextObject.setInvestmentsState(listWithoutId);
            }
        });
    };

    const handleChange = (field, value ) => {
        setEditableInvestment({ ...editableInvestment, [field]: value });
    };


    const handleSave = () => {
        const newInvestmentArray = InvestmentsContextObject.investmentsState.map((inv) => {
            return inv.Id === editableInvestment.Id ? { ...inv, ...editableInvestment } : inv;
        });
        FileService.SaveDataToAWS("data/Investments.json", newInvestmentArray, (resposne, err) => {
            if (err === null) {
                ReRenderContextObject.resetPage();
                InvestmentsContextObject.setInvestmentsState(newInvestmentArray);
            }
        });
        setEditableRowIndex(-1);
    };

    const handleSIP = (index) => {
        let updatetableInvestment = InvestmentsContextObject.investmentsState[index];
        updatetableInvestment.Amount = parseInt(updatetableInvestment.Amount) + parseInt(updatetableInvestment.SIPAmount);
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
                                <th>Amount In INR</th>
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
                                                    <td>
                                                        {Utilities.ConvertToINR(investment.Amount, investment.Currency)}
                                                    </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        defaultValue={investment.Source}
                                                        onChange={(e) => handleChange('Source', e.target.value)}
                                                    />
                                                </td>
                                                <td><select defaultValue={investment.Currency} onChange={(e) => handleChange('Currency', e.target.value)}>
                                                    <option value="INR">Indian Rupee (INR)</option>
                                                    <option value="JPY">Japanese Yen (JPY)</option>
                                                </select></td>
                                                <td><input
                                                        type="checkbox"
                                                        checked={investment.IsSIP}
                                                        onChange={(e) => handleChange('IsSIP', e.target.checked)}
                                                    /></td>
                                                <td><select defaultValue={investment.Location} onChange={(e) => handleChange('Location', e.target.value)}>
                                                    <option value="India">India</option>
                                                    <option value="Japan">Japan</option>
                                                </select></td>
                                                <td><select defaultValue={investment.Owner} onChange={(e) => handleChange('Owner', e.target.value)}>
                                                    <option value="Pavan">Pavan</option>
                                                    <option value="Kruthika">Kruthika</option>
                                                </select></td>
                                                <td>
                                                    <select defaultValue={investment.Type} onChange={(e) => handleChange('Type', e.target.value)}>
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
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        defaultValue={investment.SIPAmount}
                                                        onChange={(e) => handleChange('SIPAmount', e.target.value)}
                                                    />
                                                </td>
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
                                                <td>{Utilities.ConvertToINR(investment.Amount, investment.Currency)}</td>
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


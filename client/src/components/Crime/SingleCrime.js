import React, { useState, useMemo, useRef } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Persons from '../../testdata/persons.json'
import JoditEditor from "jodit-react";
import { getAllPersons, getPerson } from '../../Services/PersonService';
const SingleCrime = (props) => {

    const actual = props.actual;
    const [option, setOption] = useState("general");
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [editDesc, setEditDesc] = useState(false)
    const [newMemberForm, setNewMemberForm] = useState()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = ((value) => {
        console.log(value);
        setOption(value);
    })

    const config = useMemo(() => ({
        readonly: false,
        theme: "dark",
        height: "18rem",
        allowResizeX: false,
        allowResizeY: false,
        colorPickerDefaultTab: 'color',
    }), [])

    const handleAddMember = async () => {
        try {
            const result = await getAllPersons(newMemberForm)
        } catch (error) {
 

        }
    }

    const handleChangeMember = (e) => {
        const { name, value } = e.target;
        console.log(newMemberForm);

        setNewMemberForm({
            ...newMemberForm,
            [name]:  value,
        });
    }

    return (
        <>
            <Container fluid className="crimeContainer" >
                <Row style={{ "height": "50%" }}>
                    <Col className="crimeTile1" >
                        <img src={actual?.photo} />
                        <p></p>
                        <h1><b>{actual?.name}</b></h1>
                        <i class="bi bi-droplet-fill" style={{ "color": "red" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "red" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "red" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "black" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "black" }}></i>
                    </Col>
                    <Col className="crimeTile2">
                        <Row style={{ "height": "10%" }}>
                            <Col>Teren organizacji</Col><Col>Powiązane sprawy</Col>
                        </Row>
                        <Row style={{ "height": "90%" }}>
                            <Col style={{ "height": "100%" }}>
                                <img src={actual?.orgAreaPhoto} />
                            </Col>
                            <Col style={{ "height": "100%" }}>
                                <Row style={{ "height": "100%" }}>
                                    <Col className="crimeActualCasesTable">
                                        {actual?.cases.map((key) => (
                                            <Row><Col className="crimeActualCasesSingle">{key.title}</Col></Row>
                                        ))}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ "height": "50%" }}>
                    <Col className="crimeTile3">
                        <Row style={{ "height": "15%", "padding": "0.5rem" }}>
                            <Col className="tableOption">Członkowie</Col><Col className="tableOption">Pojazdy</Col><Col className="tableOption" onClick={handleShow}>Dodaj</Col>
                        </Row>
                        <Row style={{ "height": "85%" }}>
                            <Col style={{ "height": "100%" }}>
                                <Row className="crimePersonsTableHeaders">
                                    <Col>Imię</Col>
                                    <Col>Nazwisko</Col>
                                    <Col>Pozycja</Col>
                                </Row>
                                <Row className="crimePersonsTable">
                                    <Col style={{ "height": "100%" }}>
                                        {actual?.members.map((key) => (
                                            <Row className="crimePersonsTableSingleRow">
                                                <Col className="crimePersonsTableSingle">{key.firstName}</Col>
                                                <Col className="crimePersonsTableSingle">{key.lastName}</Col>
                                                <Col className="crimePersonsTableSingle">Member</Col>

                                            </Row>
                                        ))}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="crimeTile4">
                        <Row style={{ "height": "100%" }}>
                            <Col className="crimePersonMenu">
                                {!editDesc ? (
                                    <Button variant="dark" onClick={() => { setEditDesc(true) }}>Edytuj opis</Button>
                                ) : (
                                    <Button variant="dark" onClick={() => { setEditDesc(false) }}>Zapisz</Button>
                                )}
                            </Col>
                            <Col className="crimePersonText">
                                {editDesc ? (
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        onChange={newContent => setContent(newContent)} />
                                ) : (
                                    (<div dangerouslySetInnerHTML={{ __html: content }} />)
                                )}
                            </Col>

                        </Row>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} className="addNewCrimeMemberModal">
                    <Modal.Body><h5>Dodaj nowego członka</h5>
                        <form>
                            <input 
                            type="text"
                            name="id"
                            onChange={handleChangeMember} />
                            <p>Numer dowodu</p>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Zamknij
                        </Button>
                        <Button variant="warning" onClick={() => { handleClose(); handleAddMember() }}>
                            Dodaj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default SingleCrime;
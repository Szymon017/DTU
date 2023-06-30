import React, { useState, useMemo, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Persons from '../../testdata/persons.json'
import JoditEditor from "jodit-react";
import { getAllPersons, getPerson } from '../../Services/PersonService';
import { updateCrimeOrg } from '../../Services/CrimesService';
import { getAllCases } from '../../Services/CasesService';
const SingleCrime = (props) => {

    const [actualOrg, setActualOrg] = useState()
    const [option, setOption] = useState("general");
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [editDesc, setEditDesc] = useState(false)
    const [newMemberForm, setNewMemberForm] = useState()
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [related, setRelated] = useState();
    const drops = [1, 2, 3, 4, 5];

    const handleClose = () => {
        setShow(false);
        setErrors()
    }
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

    useEffect(() => {
        if (actualOrg) {
            setContent(actualOrg.description)
            getRelated(props.actual._id)

        }
    }, [actualOrg])

    useEffect(() => {
        setActualOrg(props.actual);
    }, [props.actual])

    const getRelated = async (id) => {
        const result = await getAllCases({ orgs: id });
        console.log(result);
        setRelated(result.data.results);
    }


    const handleAddMember = async () => {
        const result = await getAllPersons(newMemberForm)
        if (result.data.results.length < 1) {
            setErrors({
                ...errors,
                ['userId']: "Brak osoby w bazie",
            })
        } else {
            setShow(false);
            setErrors()
            const temp = { ...actualOrg };
            temp.members.push(result.data.results[0])
            setActualOrg(temp)

            const result2 = await updateCrimeOrg(actualOrg._id, { members: actualOrg.members })
            console.log(result2);

        }
    }

    const handleUpdateDesc = async (e) => {
        const result = await updateCrimeOrg(actualOrg._id, { description: content })
        actualOrg.description = content
        console.log(result);
    }

    const handleChangeMember = (e) => {
        const { name, value } = e.target;
        console.log(newMemberForm);

        setNewMemberForm({
            ...newMemberForm,
            [name]: value,
        });
    }

    const removeMember = async (id) => {

        const updatedMembers = actualOrg.members.filter(member => member._id !== id);

        setActualOrg(prevState => ({
            ...prevState,
            members: updatedMembers
        }));

        const result = await updateCrimeOrg(actualOrg._id, { members: updatedMembers });

    }
    return (
        <>
            <Container fluid className="crimeContainer" >
                <Row style={{ "height": "50%" }}>
                    <Col className="crimeTile1" >
                        <img src={actualOrg?.photo} />
                        <p></p>
                        <h1><b>{actualOrg?.name}</b></h1>
                        {actualOrg ? (
                            <>
                                {drops.map((key) => (
                                    key <= actualOrg.dangerLevel ? (
                                        <i class="bi bi-droplet-fill" style={{ "color": "red" }}></i>
                                    ) : (<i class="bi bi-droplet-fill" style={{ "color": "grey" }}></i>
                                    )
                                ))}
                            </>
                        ) : ("")}

                    </Col>
                    <Col className="crimeTile2">
                        <Row style={{ "height": "10%" }}>
                            <Col>Teren organizacji</Col><Col>Powiązane sprawy</Col>
                        </Row>
                        <Row style={{ "height": "90%" }}>
                            <Col style={{ "height": "100%" }}>
                                <img src={actualOrg?.orgAreaPhoto} />
                            </Col>
                            <Col style={{ "height": "100%" }}>
                                <Row style={{ "height": "100%" }}>
                                    <Col className="crimeActualCasesTable">
                                        {related?.map((key) => (
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
                                    <Col lg={1}></Col>
                                </Row>
                                <Row className="crimePersonsTable">
                                    <Col style={{ "height": "100%" }}>
                                        {actualOrg?.members.map((key) => (
                                            <Row className="crimePersonsTableSingleRow">
                                                <Col className="crimePersonsTableSingle">{key.firstName}</Col>
                                                <Col className="crimePersonsTableSingle">{key.lastName}</Col>
                                                <Col className="crimePersonsTableSingle">Member</Col>
                                                <Col xs lg={1} className="crimePersonsTableSingle"><i className='bi bi-trash' onClick={() => { removeMember(key._id) }}></i></Col>
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
                                    <Button variant="dark" onClick={() => { setEditDesc(false); handleUpdateDesc() }}>Zapisz</Button>
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
                            {<p style={{ "color": "red" }}>{errors?.userId ? errors.userId : ""}</p>}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Zamknij
                        </Button>
                        <Button variant="warning" onClick={() => { handleAddMember() }}>
                            Dodaj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default SingleCrime;
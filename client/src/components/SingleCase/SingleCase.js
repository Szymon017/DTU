import React, { useEffect, useRef } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState, useMemo } from 'react';
import JoditEditor from "jodit-react";
import '../../style.css'
import { editCase } from "../../Services/CasesService";
import { getAllOfficers } from "../../Services/OfficerService";

const SingleCase = (props) => {

    const [actualCase, setActualCase] = useState();
    const [click, setClick] = useState(false);
    const editor = useRef(null);
    const [content, setContent] = useState();
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [officerForm, setOfficerForm] = useState();

    const handleChange = (con) => {
        setContent(con)
    }

    const handleChangeOfficer = (e) => {
        const { name, value } = e.target;

        setOfficerForm({
            ...officerForm,
            [name]: value
        })
    }

    const handleSubmitOfficer = async () => {
        const name = officerForm.name.split(' ')
        const firstName = name[0];
        const lastName = name[1];
        const result = await getAllOfficers({ firstName: firstName, lastName: lastName })
        if (result.data.results.length) {
            const temp = { ...actualCase };
            temp.officers.push(result.data.results[0])
            setActualCase(temp)
        }
    }

    const config = useMemo(() => ({
        readonly: false,
        theme: "dark",
        height: "29rem",
        maxHeight: "29rem",
        allowResizeX: false,
        allowResizeY: false,
        colorPickerDefaultTab: 'color',
    }), [])


    const handleClose = () => {
        setShow(false);
        setErrors()
    }
    const handleShow = () => setShow(true);

    const handleClick = () => {
        if (click) {
            setContent(content)
        }
        setClick(!click);
    }

    const handleSubmit = async () => {
        setClick(!click);
        const result = await editCase(actualCase._id, { description: content })
        console.log(result);
    }

    useEffect(() => {
        setContent(actualCase?.description)
    }, [actualCase])

    useEffect(() => {
        setActualCase(props.case)
    }, [])

    return (
        <>
            <Container className='singleCaseContainer'>
                <div>
                    <Row>
                        <Col><h1>{actualCase?.title}</h1></Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                actualCase?.officers.map((value) => (
                                    <label className='cops'>{value.firstName + " " + value.lastName}</label>
                                ))
                            }
                            <Button variant="dark" onClick={() => { handleShow() }}>+</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='caseMenu'><Button variant='dark'>Notatka</Button><Button variant='dark'>Dowody</Button><Button variant='dark'>Osoby powiązane</Button></Col>
                    </Row>
                </div>
                {click ? <><Button onClick={() => { handleClick() }} variant="secondary m-1">Podgląd</Button><Button onClick={() => { handleSubmit() }} variant="secondary m-1">Zapisz</Button></> : <Button variant="dark m-1" onClick={() => { handleClick() }}>Edytuj</Button>}
                <Row>
                    <Col style={{ border: "1px solid black", 'background-color': " #121621", 'height': '29rem', 'overflow-y': 'auto' }}>
                        {click ? (
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                onChange={newContent => setContent(newContent)} />
                        ) : <div dangerouslySetInnerHTML={{ __html: content }} />}
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} className="addNewCrimeMemberModal">
                    <Modal.Body><h5>Dodaj funkcjonariusza</h5>
                        <form>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChangeOfficer}
                            />
                            <p>Imię i nazwisko</p>
                            {<p style={{ "color": "red" }}>{errors?.userId ? errors.userId : ""}</p>}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Zamknij
                        </Button>
                        <Button variant="warning" onClick={() => { handleSubmitOfficer() }}>
                            Dodaj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default SingleCase;
import React, { useEffect } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SingleCase from "../SingleCase/SingleCase";
import { useState } from "react";
import cases from "../../testdata/cases.json"
import Button from "react-bootstrap/esm/Button";
import logo from '../../assets/images/logo.png'
import { getCurrentOfficer } from "../../Services/OfficerService";
import { addNewCase, getAllCases, deleteCase } from "../../Services/CasesService";
import { format } from 'date-fns'
import { editCase } from "../../Services/CasesService";


const MyCases = () => {
    const initialState = {
        title: "",
        date: Date.now()
    }

    const [allCases, setAllCases] = useState();
    const [actualCase, setActualCase] = useState();
    const [caseForm, setCaseForm] = useState(true);
    const [newCase, setNewCase] = useState(initialState)
    const [currentOfficer, setCurrentOfficer] = useState(getCurrentOfficer())

    const handleCaseTrigger = () => {
        setCaseForm(!caseForm);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCase({
            ...newCase,
            [name]: value,
        });
        console.log(newCase);

    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(newCase);
        const result = await addNewCase(newCase);
        setNewCase(null)
        setCaseForm(true)
        getCases();
    }

    const handleDelete = async (key) => {
        const updatedCases = allCases.filter(x => x._id !== key._id);

        setAllCases(updatedCases)
        const result = await editCase(key._id, {archived: true});
    }

    const getCases = async () => {
        const result = await getAllCases({archived: false});
        setAllCases(result.data.results)
    }

    useEffect(() => {
        getCases()
    }, []);

    useEffect(() => {
        setNewCase({
            ...newCase,
            ['officers']: currentOfficer._id
        })
    },[currentOfficer])

    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row style={{ "width": "100%" }}>
                    <Col lg={2} className='MyCasesList'>
                        <Button variant='dark' style={{ "margin-top": "1rem" }} onClick={() => { handleCaseTrigger() }}>{caseForm?"Nowa teczka":"Wróć"}</Button>
                        {allCases?.map((key) => (
                            <Row className="singleCase"><Col onClick={() => { setActualCase(key) }}> <label style={{ "width": "90%" }}>{key.title}</label>
                                <label style={{ "width": "10%" }}>
                                    <i class="bi bi-trash xdd" style={{ "cursor": "pointer" }} onClick={() => { handleDelete(key) }} ></i>
                                </label></Col></Row>
                        ))}
                    </Col>
                    {caseForm && actualCase ? (

                        <Col>
                            <SingleCase case={actualCase} />
                        </Col>
                    ) : (
                        <Col className="newCaseForm">

                            <Row style={{ "margin": "auto" }}>
                                <Col><img src={logo} width="200px" /></Col>
                            </Row>
                            <Row>
                                <Col><h2 style={{ "color": "black" }}>Detective Task Unit</h2></Col>
                            </Row>
                            <form>

                                <Row><Col>
                                    <input
                                        type="text"
                                        name="title"
                                        className="folderInput"
                                        placeholder="tytuł"
                                        required="true"
                                        onChange={handleChange} /></Col></Row>
                                <Row><Col>
                                    <input
                                        type='text'
                                        name="officers"
                                        className="folderInput"
                                        placeholder={currentOfficer.firstName + " " + currentOfficer.lastName}
                                        required="true"
                                        disabled={true}
                                        onChange={handleChange} /></Col></Row>
                                <Row><Col>
                                    <input
                                        type="text"
                                        name="date"
                                        className="folderInput"
                                        placeholder={format(Date.now(), "dd/MM/yyyy")}
                                        required="true"
                                        disabled={true}
                                        onChange={handleChange} />
                                </Col></Row>
                                <Row style={{ "margin-top": "4rem" }}><Col><Col /></Col><Col><input type='submit' className="folderInput" value={currentOfficer.firstName + " " + currentOfficer.lastName} onClick={(e) => { handleClick(e) }} /></Col></Row>
                            </form>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default MyCases;
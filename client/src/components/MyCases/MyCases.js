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


const MyCases = () => {
    const initialState = {
        title: "",
        officers: "6410e6ff02e0aee10cdb8403",
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

    const handleClick = async(e) => {
        e.preventDefault();
        const result = await addNewCase(newCase);
        console.log(result);
        setNewCase(null)
        setCaseForm(true)
        getCases();
    }

    const getCases = async() => {
        const result = await getAllCases();
        console.log(result);
        setAllCases(result.data.results)
    }

    useEffect(() => {
        getCases()
    }, []);

    
    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row style={{ "width": "100%" }}>
                    <Col lg={2} className='MyCasesList'>
                        <Button variant='dark' style={{ "margin-top": "1rem" }} onClick={() => { handleCaseTrigger() }}>Nowa teczka</Button>
                        {allCases?.map((key) => (
                            <Row  className="singleCase"><Col onClick={() => { setActualCase(key) }}>{key.title}</Col><Col lg={2}><i class="bi bi-trash" style={{"color":"grey"}} onClick={()=>{console.log("Deleted");}}></i>
                            </Col></Row>
                        ))}
                    </Col>
                    {caseForm ? (

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
                                        placeholder={format(Date.now(),"dd/mm/yyyy")}
                                        required="true"
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
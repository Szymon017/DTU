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


const MyCases = () => {
    const [actualCase, setActualCase] = useState();
    const [caseForm, setCaseForm] = useState(false);
    const [currentOfficer, setCurrentOfficer] = useState(getCurrentOfficer())
    const handleCaseTrigger = () => {
        setCaseForm(!caseForm);
    }

    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row style={{ "width": "100%" }}>
                    <Col lg={2} className='MyCasesList'>
                        <Button variant='dark' style={{ "margin-top": "1rem" }} onClick={() => { handleCaseTrigger() }}>Nowa teczka</Button>
                        {cases.map((key) => (
                            <Row><Col className="singleCase" onClick={() => { setActualCase(key) }}>{key.title}</Col></Row>
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

                            <Row><Col><input type='text' className="folderInput" placeholder="tytuł" required="true"/></Col></Row>
                            <Row><Col><input type='text' className="folderInput" placeholder="funkcjonariusz" required="true"/></Col></Row>
                            <Row><Col><input type='text' className="folderInput" placeholder="data" required="true"/></Col></Row>
                            <Row style={{ "margin-top": "4rem" }}><Col><Col /></Col><Col><input type='submit' className="folderInput" value={currentOfficer.firstName + " " + currentOfficer.lastName}/></Col></Row>
                            </form>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default MyCases;
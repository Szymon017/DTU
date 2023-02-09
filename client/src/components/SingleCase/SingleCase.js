import React, { useEffect, useRef } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import JoditEditor from 'jodit-react'
import { useState } from 'react';
import TextEditor from "../TextEditor/TextEditor";
const SingleCase = () => {


    return (
        <>
            <Container className='singleCaseContainer'>
                <Row>
                    <Col><h1>Morderstwo przy Little Seul</h1></Col>
                </Row>
                <Row>
                    <Col><label className='cops'>Joseph Lee</label><label className='cops'>Dwayne Smith</label><label className='cops'>Jayden Curtis</label><Button variant="warning">+</Button></Col>
                </Row>
                <Row>
                    <Col className='caseMenu'><Button variant='dark'>Opis</Button><Button variant='dark'>Dowody</Button><Button variant='dark'>TODO</Button><Button variant='dark'>Notatki</Button></Col>
                </Row>
                <Row>
                    <Col style={{ border: "1px solid black", 'background-color': " #121621", 'min-height': '29rem' }}>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SingleCase;
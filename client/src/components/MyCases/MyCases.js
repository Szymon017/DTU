import React, { useEffect } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SingleCase from "../SingleCase/SingleCase";
import { useState } from "react";
import cases from "../../testdata/cases.json"
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const MyCases = () => {
    const [actualCase, setActualCase] = useState();
    
    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row>
                    <Col lg={2} className='MyCasesList'>
                        
                      {cases.map((key)=>(
                        <Row><Col className="singleCase" onClick={()=>{setActualCase(key)}}>{key.title}</Col></Row>
                      ))}
                    </Col>
                    
                    <Col>
                        <SingleCase case={actualCase}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyCases;
import React from "react"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SingleCase from "../SingleCase/SingleCase";

const MyCases = () => {
    const cases = [{
        "id": 1,
        "title": "Morderstwo przy Little Seul"
    },{
        "id":2,
        "title": "Porwanie funkcjonariusza"
    }]
    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row>
                    <Col lg={2} className='MyCasesList'>
                        
                      {cases.map((key)=>(
                        <Row><Col className="singleCase">{key.title}</Col></Row>
                      ))}
                    </Col>
                    
                    <Col>
                        <SingleCase/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyCases;
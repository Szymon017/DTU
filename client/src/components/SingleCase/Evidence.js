import React from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { RModalImages } from 'react-modal-image';
const Evidence = (props) => {
    const actualCase = props.case;
    return(
  
            <Row className='evidenceContainer' fluid>
                <Col style={{"height": "100%", "width":"100%"}}>
                    {actualCase.evidences.map((key)=>(
                       <Row className="evidenceElement">
                       <Col className="evidenceDesc">{key.description}</Col><Col><img src={key.photo}/></Col>
                   </Row>
                       ))}
                    
                </Col>
            </Row>
           

 
    )
}

export default Evidence;
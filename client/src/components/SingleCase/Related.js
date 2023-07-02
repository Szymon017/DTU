import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
const Related = (props) => {
    const actualCase = props.case;

    const handleClick = (option) => {

    }

    useEffect(() => {
    }, [])
    return (

        <Row className='relatedTable' fluid>
            <Col style={{"borderRight":"3px solid #1f273a"}}>
                <Row>
                    <Col style={{"padding":"1rem",  "borderBottom":"3px solid #1f273a"}}>Osoby</Col>
                </Row>
                {actualCase.persons.map((key)=>(
                    <Row className='singleRelated'><Col>{key.firstName}</Col><Col>{key.lastName}</Col></Row>
                ))}
            </Col>
            <Col>
                <Row><Col style={{"padding":"1rem", "borderBottom":"3px solid #1f273a"}}>Organizacje</Col></Row>
                {actualCase.orgs.map((key)=>(
                    <Row className='singleRelated'><Col>{key.name}</Col></Row>
                ))}
            </Col>
        </Row>
    )
}

export default Related;
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CrimeData from '../../testdata/crime.json'
import SingleCrime from './SingleCrime';
const Crime = () => {
    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row>
                <Col lg={2} className='MyCasesList'>
                        {CrimeData.map((key)=>(
                          <Row><Col className="singleCase">{key.title}</Col></Row>
                        ))}
                      </Col>
                    <Col>
                    <SingleCrime actual={"Grove Street Families"}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Crime;
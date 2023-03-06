import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CrimeData from '../../testdata/crime.json'
import SingleCrime from './SingleCrime';
const Crime = () => {
    const [actualOrg, setActualOrg] = useState();

    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row>
                <Col lg={2} className='MyCasesList'>
                        {CrimeData.map((key)=>(
                          <Row><Col className="singleCase" onClick={()=>{setActualOrg(key.title)}}>{key.title}</Col></Row>
                        ))}
                      </Col>
                    <Col>
                    <SingleCrime actual={actualOrg}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Crime;
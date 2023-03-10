import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Persons from '../../testdata/persons.json'

const SingleCrime = (props) => {

    const actual = props.actual;
    const [option, setOption] = useState("general");

    const handleClick = ((value) => {
        console.log(value);
        setOption(value);
    })
    return (
        <>
            <Container>
                <Row>
                    <Col lg={3} style={{"padding":"2rem"}}>
                        <img src="https://images.ctfassets.net/wn7ipiv9ue5v/12DuxreGBglXo7rzMve1BO/a283c977b65de739f657002aa90cc6fe/GTAIV_DETAILSHOTS_0004_GTAIV_Tshirt_AngelsDeathBlk_Front_01.jpg" width={200}></img>
                    </Col>
                    <Col lg={9} style={{"text-align":"left", "padding-top":"2rem"}}>
                        <h1 style={{ 'font-size': '27px' }}><b>{actual}</b></h1>
                        <p>Stopień zagrożenia V</p>
                        <Row>
                            <Col lg={2}>Lider grupy</Col>
                            <Col>John Brown</Col>
                        </Row>
                        <Row>
                            <Col lg={2}>Kolorystyka</Col>
                            <Col>Czarny, Czerwony</Col>
                        </Row>
                        <Row>
                            <Col lg={2}>Kategoria</Col>
                            <Col>Narkotyki, porwania</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row>
                    <Col><Button variant="dark" onClick={() => { handleClick("members") }}>Członkowie</Button></Col>
                    <Col><Button variant="dark" onClick={() => { handleClick("vehicles") }}>Pojazdy</Button></Col>
                </Row>
                {option == 'members' ? (
                  <Row className='orgMembers'>
                        {Persons.map((key)=>(
                            <Row >
                                <Col style={{"margin":"20px", "font-size":"16px"}}><img src="https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png" width={150}></img> <p>{key.firstName + " " + key.lastName}</p></Col>   
                            </Row>
                            ))}
                          </Row>
                ):""}
                {option == 'vehicles' ? (
                    <Row className='orgMembers'>
                    {Persons.map((key)=>(
                        <Row >
                            <Col style={{"margin":"20px", "font-size":"16px"}}><img src="https://www.pngkey.com/png/detail/114-1149847_avatar-unknown-dp.png" width={150}></img> <p>{key.firstName + " " + key.lastName}</p></Col>   
                        </Row>
                        ))}
                      </Row>
                ):""}

            </Container>
        </>
    )
}

export default SingleCrime;
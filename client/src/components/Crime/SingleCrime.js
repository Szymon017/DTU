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
            <Container fluid className="crimeContainer" >
                <Row style={{ "height": "50%" }}>
                    <Col className="crimeTile1 crimeTiles">
                        <img src={actual?.photo} />
                        <p></p>
                        <h1><b>{actual?.name}</b></h1>
                        <i class="bi bi-droplet-fill" style={{ "color": "red" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "red" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "red" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "black" }}></i>
                        <i class="bi bi-droplet-fill" style={{ "color": "black" }}></i>

                    </Col>
                    <Col className="crimeTile2 crimeTiles">
                        <Row style={{ "height": "20%" }}>
                            <Col>
                                <Button variant='dark'>Członkowie</Button>
                                <Button variant='dark'>Pojazdy</Button>
                            </Col>
                        </Row>
                        <Row style={{ "height": "80%" }}>
                            <Col className="crimeMembersTable">
                                <Row style={{ "height": "100%" }}>
                                    <Col style={{ "height": "100%" }}>
                                        <Row className="crimeMembersTableHeader">
                                            <Col>Imię</Col>
                                            <Col>Nazwisko</Col>
                                            <Col>Pozycja</Col>
                                        </Row>
                                        <Row className="crimeMembers">
                                            <Col>
                                                {actual?.members.map((key) => (
                                                    <Row className="crimeMembersSinglePerson">
                                                        <Col>{key.firstName}</Col>
                                                        <Col>{key.lastName}</Col>
                                                        <Col>member</Col>
                                                    </Row>
                                                ))}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col style={{ "height": "100%" }}>
                                        <Row style={{ "height": "50%" }}>
                                            <Col><img src={actual?.photo} height="150px"></img></Col>
                                            <Col>1</Col>
                                        </Row>
                                        <Row style={{ "height": "50%" }}>
                                            <Col>1</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ "height": "50%" }}>
                    <Col className="crimeTile3 crimeTiles">
                        <Row style={{ "borderBottom": "dotted 3px white", "paddingBottom": "1.5rem" }}>
                            <Col><h1>Powiązane sprawy</h1></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        {actual?.cases.map((key) => (
                                            <Row className="crimeSingleCase "><Col>{key.title}</Col></Row>
                                        ))}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>

                    <Col className="crimeTile4 crimeTiles">
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SingleCrime;
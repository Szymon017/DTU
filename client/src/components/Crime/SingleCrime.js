import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
const SingleCrime = (props) => {

    const [option, setOption] = useState("general");

    const handleClick = ((value) => {
        console.log(value);
        setOption(value);
    })
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 style={{ 'font-size': '27px' }}><b>{props.actual}</b></h1>
                        <p>stopien zagrożenia V</p>
                    </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                    <Col><Button variant="dark" onClick={() => { handleClick("general") }}>Ogólne</Button></Col>
                    <Col><Button variant="dark" onClick={() => { handleClick("members") }}>Członkowie</Button></Col>
                    <Col><Button variant="dark" onClick={() => { handleClick("vehicles") }}>Pojazdy</Button></Col>
                </Row>
                {option == "general" ? (
                    <>

                        <Row>
                            <Col style={{ "border": "solid 1px white" }}>
                                Lider grupy
                            </Col>
                            <Col style={{ "border": "solid 1px white" }}>
                                twoj stary
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ "border": "solid 1px white" }}>Kolorystyka</Col>
                            <Col style={{ "border": "solid 1px white" }}>Fiolet</Col>
                        </Row>
                        <Row>
                            <Col style={{ "border": "solid 1px white" }}>Teren organizacji</Col>
                            <Col style={{ "border": "solid 1px white" }}><img src="https://media.discordapp.net/attachments/654742549411528704/1072659555022032946/218_20230207232238_1.png?width=1083&height=609" width={500}></img></Col>
                        </Row>
                    </>

                ) : ""}
                {option == 'members' ? (
                    <>
                        <h1>człokowie</h1>
                    </>
                ):""}
                {option == 'vehicles' ? (
                    <>
                        <h1>pojazdy</h1>
                    </>
                ):""}

            </Container>
        </>
    )
}

export default SingleCrime;
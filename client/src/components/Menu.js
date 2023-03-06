import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/avatar.png'
import Current from './Current/Current';
import Button from 'react-bootstrap/esm/Button';
const Menu = () => {

    const handleClick = (site) => {
        window.location.replace(`http://localhost:3000/${site}`);

    }
    return (
        <>
            <Container fluid>
                <Row className='HomeTopBar'>
                    <Col lg={2} xs={2} className='HomeTopBarItem'>
                        <Row>
                            <Col>
                                <img src={avatar} alt="Logo" width={100} />
                            </Col>
                            <Col>
                                <p>Joseph Lee</p>
                                <p>Detective I</p>
                                <p>46518</p>

                            </Col>
                        </Row>
                    </Col>
                    <Col lg={10} xs={10} className='HomeTopBarItem'>
                        <Row className='MenuItems'>
                        <Col className='MenuItem' onClick={() => {handleClick("home")}}>Ogłoszenia</Col>
                            <Col className='MenuItem' onClick={() => {handleClick("cases")}}>Aktualne sprawy</Col>
                            <Col className='MenuItem' onClick={() => {handleClick("crime")}}>Organizacje</Col>
                            <Col className='MenuItem' onClick={() => {handleClick("informants")}}>Informatorzy</Col>
                            <Col className='MenuItem' onClick={() => {handleClick("archives")}}>Archiwum</Col>
                            <Col className="MenuItem"><Button variant='warning'>Wyloguj</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Menu;
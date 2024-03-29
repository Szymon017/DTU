import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/avatar.png'
import Current from './Current/Current';
import Button from 'react-bootstrap/esm/Button';
import { getCurrentOfficer } from '../Services/OfficerService';

const Menu = () => {

    const [currentOfficer, setCurrentOfficer] = useState(getCurrentOfficer())
    const handleClick = (site) => {
        window.location.replace(`http://localhost:3000/${site}`);
    }

    const logout = () => {
        const token = localStorage.getItem('token');

        if(token){
            localStorage.removeItem('token');
            window.location.assign('/login');
        }else{
            console.log("error");
        }
    }
    return (
        <>
            <Container fluid>
                {currentOfficer ? (
                    <Row className='HomeTopBar'>
                        <Col lg={2} xs={2} className='HomeTopBarItem'>
                            <Row>
                                <Col>
                                    <img src={currentOfficer.avatar} alt="Logo" width={100} />
                                </Col>
                                <Col>
                                    <p>{currentOfficer?.firstName + " " + currentOfficer?.lastName}</p>
                                    <p>Detective {currentOfficer?.grade}</p>
                                    <p>{currentOfficer?.phone}</p>

                                </Col>
                            </Row>
                        </Col>
                        <Col lg={10} xs={10} className='HomeTopBarItem'>
                            <Row className='MenuItems'>
                                {currentOfficer &&<Col className='MenuItem' onClick={() => { handleClick("home") }}>Ogłoszenia</Col>}
                                {currentOfficer &&<Col className='MenuItem' onClick={() => { handleClick("cases") }}>Aktualne sprawy</Col>}
                                {currentOfficer &&<Col className='MenuItem' onClick={() => { handleClick("crime") }}>Organizacje</Col>}
                                {currentOfficer &&<Col className='MenuItem' onClick={() => { handleClick("persons") }}>Osoby</Col>}
                                {currentOfficer &&<Col className='MenuItem' onClick={() => { handleClick("archives") }}>Archiwum</Col>}
                                {currentOfficer && (currentOfficer.role ==2) &&<Col className='MenuItem' onClick={() => { handleClick("office") }}>Biuro</Col>}
                                <Col className="MenuItem"><Button variant='warning' onClick={logout}>Wyloguj</Button></Col>
                            </Row>
                        </Col>
                    </Row>
                ) : ""}
            </Container>
        </>
    )
}

export default Menu;
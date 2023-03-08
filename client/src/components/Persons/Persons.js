import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Button } from "react-bootstrap"
const Persons = () => {
    return (
        <>
            <Container className="defaultContainer" fluid>
                <Row className='informantsPanelRow'>
                    <Col className="informatsPanel">
                        <Row  className='search'>
                            <Col><input type="text"/></Col><Col><Button variant="dark">Wyszukaj</Button></Col><Col><Button variant="warning">Informatorzy</Button></Col>
                        </Row>
                        <Row style={{"height":"100%", "background":"black"}}> 
                            <Col className="browser">
                                <Row className="singlePerson">
                                    <Col>John</Col>
                                    <Col>Travolta</Col>
                                    <Col>Szczegóły</Col>
                                </Row><Row className="singlePerson" style={{"background-color":"purple"}}>
                                    <Col>John</Col>
                                    <Col>Travolta</Col>
                                    <Col>Szczegóły</Col>
                                </Row><Row className="singlePerson">
                                    <Col>John</Col>
                                    <Col>Travolta</Col>
                                    <Col>Szczegóły</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="informatsPanel">
                        <Row>
                            <Col style={{"background-color":"red", "minHeight":"100px"}}>
                                Photo
                            </Col><Col style={{"background-color":"green", "minHeight":"100px"}}>
                                Info
                            </Col>
                        </Row>
                        <Row>
                            <Col>hui wie co</Col>
                        </Row>
                    </Col>
          
                </Row>

            </Container>
        </>
    )
    /*
 
<Row className='singleInformantMenu'>
      <Col>Imie</Col>
      <Col>Nazwisko</Col>
      <Col>Numer</Col>
      <Col>E-mail</Col>
      <Col>Powiązane sprawy</Col>
      <Col>Numer dowodu</Col>
  </Row>
<Row className='informantsTable' style={{"overflow-y":"auto", "maxHeight":"620px"}}>
  <Col>
  
  <Row className='singleInformant'>
      <Col>John</Col>
      <Col>Brown</Col>
      <Col>12312</Col>
      <Col>johnbrown@gmail.com</Col>
      <Col><u>link</u></Col>
      <Col>XD-6969</Col>
  </Row>
  <Row className='singleInformant'>
      <Col>John</Col>
      <Col>Brown</Col>
      <Col>12312</Col>
      <Col>johnbrown@gmail.com</Col>
      <Col><u>link</u></Col>
      <Col>XD-6969</Col>
  </Row>
 
*/
}

export default Persons;
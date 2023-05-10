import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { addNewOfficer, getAllOfficers, deleteOfficer } from "../../Services/OfficerService";
import { Button } from 'react-bootstrap';

const Office = () => {
  const [newOfficer, setNewOfficer] = useState();
  const [allOfficers, setAllOfficers] = useState();
  const [actualOfficer, setActualOfficer] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOfficer({
      ...newOfficer,
      [name]: value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await addNewOfficer(newOfficer);
    console.log(result);
    setNewOfficer(null)
  }

  const handleDeleteOfficer = async(id) => {
    const result = await deleteOfficer(id)
    console.log(result);
  }

  const getOfficers = async () => {
    const result = await getAllOfficers();
    console.log(result);
    setAllOfficers(result.data.results)
  }

  const actualOfficerHandler = (officer) => {
    setActualOfficer(officer)

  }

  useEffect(() => {
    getOfficers()
  }, []);

  return (
    <>
      <Container className="defaultContainer" fluid>
        <Row>
          <Col style={{ padding: "1rem" }}>
            <h1>Biuro</h1>
          </Col>
        </Row>
        <Row style={{ "height": "100%" }}>
          <Col>
          Rejestracja nowego detektywa
            <Row style={{ "height":"80%" }}>
              <Col className="officeSinglePanel">
                 <form>
                  <p>Imię</p>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    required
                  />
                  <p>Nazwisko</p>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    required
                  />
                  <p>Login/email</p>
                  <input
                    type="email"
                    name="login"
                    onChange={handleChange}
                    required
                  />
                  <p>Hasło</p>
                  <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <p>Nr. telefonu</p>
                  <input type="text" name="phone" onChange={handleChange} />
                  <p>Zdjęcie</p>
                  <input type="text" name="avatar" onChange={handleChange} />
                  <p className="text-danger"></p>
                  <input type="submit" onClick={handleClick} value="Dodaj" />
                </form> 
              </Col>
              <Col className="officeSinglePanel">
                {actualOfficer?(
                  <Row>
                    <Col>
                  <Row><Col><img src={actualOfficer.avatar} width={"120px"} height={"120px"}/></Col></Row>
                  <Row><Col>{actualOfficer.firstName}</Col></Row>
                  <Row><Col>{actualOfficer.lastName}</Col></Row>
                  <Row><Col>{actualOfficer.phone}</Col></Row>
                  <Row><Col>Detective {actualOfficer.grade}</Col></Row>
                  <Row><Col><Button onClick={()=>{handleDeleteOfficer(actualOfficer._id)}} variant='danger'>Usuń funkcjonariusza</Button></Col></Row>
                    </Col>
                  </Row>
                  
                ):("s")}
              </Col>
            </Row>
          </Col>
          <Col style={{"height":"100%"}}>
            Spis detektywów
            <Row style={{"height":"80%" }}>
              <Col className="officeSinglePanel" style={{"overflowY":"scroll"}}>
                 {
                  allOfficers?.map((value) => (
                    <Row className="singleOfficer" onClick={()=>{actualOfficerHandler(value)}}>
                      <Col><img src={value.avatar} width={"90px"} /></Col>
                      <Col>{value.firstName}</Col>
                      <Col>{value.lastName}</Col>
                    </Row>
                  ))
                }
              </Col>

            </Row>
          </Col>
        </Row>

      </Container>
    </>
  );
};

export default Office;
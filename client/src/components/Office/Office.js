import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { addNewOfficer } from "../../Services/OfficerService";
const Office = () => {
  const [newOfficer, setNewOfficer] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOfficer({
      ...newOfficer,
      [name]: value,
    });
    console.log(newOfficer);
  };

  const handleClick = async(e) => {
    e.preventDefault();
    const result = await addNewOfficer(newOfficer);
    console.log(result);
    setNewOfficer(null)
  }

  return (
    <>
      <Container className="defaultContainer" fluid>
        <Row>
          <Col style={{ padding: "1rem" }}>
            <h1>Biuro</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            Rejestracja nowego detektywa
            <Row>
              <Col className="officerRegisterForm">
                {" "}
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
            </Row>
          </Col>
          <Col>Spis detektywów</Col>
        </Row>
      </Container>
    </>
  );
};

export default Office;

import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { addNewOfficer, getAllOfficers, deleteOfficer } from "../../Services/OfficerService";
import { Button } from 'react-bootstrap';
import ConfirmModal from "../Modal/Confirm";

const Office = () => {
  const [newOfficer, setNewOfficer] = useState();
  const [allOfficers, setAllOfficers] = useState();
  const [actualOfficer, setActualOfficer] = useState();
  const [showConfirm, setShowConfirm] = useState(false);

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

  const handleDeleteOfficer = async (id) => {
    setShowConfirm(true);
  }

  const getOfficers = async () => {
    const result = await getAllOfficers();
    console.log(result);
    setAllOfficers(result.data.results)
  }

  const actualOfficerHandler = (officer) => {
    setActualOfficer(officer)
  }

  const handleConfirm = async (x) => {
    if (x) {
      const updatedOfficers = allOfficers.filter(key => key._id !== actualOfficer._id)
      setAllOfficers(updatedOfficers)
      const result = await deleteOfficer(actualOfficer._id)
      setActualOfficer();

    }
    setShowConfirm(false);
  }

  const promote = async() => {
    let actualGrade = actualOfficer.grade;
    if(actualGrade < 4){
      const newGrade = parseInt(actualGrade) +1;
      const actualOfficerTemp = actualOfficer;
      actualOfficerTemp.grade = newGrade;
      setActualOfficer({...actualOfficerTemp})
    }
  }

  const degrade = async() => {
    let actualGrade = actualOfficer.grade;
    if(actualGrade > 0){
      const newGrade = parseInt(actualGrade) -1;
      const actualOfficerTemp = actualOfficer;
      actualOfficerTemp.grade = newGrade;
      console.log(actualOfficerTemp);
      setActualOfficer({...actualOfficerTemp})
    }

  }

  useEffect(() => {
    getOfficers()
  }, []);

  return (
    <>
      <Container className="defaultContainer" fluid>
        <Row style={{ "height": "10%" }}>
          <Col style={{ padding: "1rem" }}>
            <h1>Biuro</h1>
          </Col>
        </Row>
        <Row style={{ "height": "90%" }}>
          <Col >
            <Row style={{ "height": "10%", "padding-top": "1rem" }}>
              <Col>
                <h1>Rejestracja nowego detektywa</h1>
              </Col>
              <Col><h1>Szczegóły</h1></Col>
            </Row>
            <Row style={{ "height": "90%" }}>
              <Col className="officeSinglePanel">
                <form>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    required
                  /><p>Imię</p>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    required
                  /><p>Nazwisko</p>
                  <input
                    type="email"
                    name="login"
                    onChange={handleChange}
                    required
                  />
                  <p>e-mail</p>
                  <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <p>Hasło</p>
                  <input type="text" name="phone" onChange={handleChange} />
                  <p>Numer telefonu</p>
                  <input type="text" name="avatar" onChange={handleChange} />
                  <p>Zdjęcie</p>
                  <p className="text-danger"></p>
                  <input type="submit" onClick={handleClick} value="Dodaj" />
                </form>
              </Col>
              <Col className="officeSinglePanel">
                {actualOfficer ? (
                  <Row style={{ "height": "100%" }}>
                    <Col >
                      <Row className="singleOfficerPhoto"><Col style={{ height: "100%" }}><img src={actualOfficer.avatar} /></Col></Row>
                      <Row style={{ "height": "10%" }}><Col>{actualOfficer.firstName}</Col></Row>
                      <Row style={{ "height": "10%" }}><Col>{actualOfficer.lastName}</Col></Row>
                      <Row style={{ "height": "10%" }}><Col>{actualOfficer.phone}</Col></Row>
                      <Row style={{ "height": "10%" }}><Col><i onClick={degrade} class="bi bi-arrow-down-circle-fill gradeDown"></i>Detective {actualOfficer.grade}<i onClick={promote} class="bi bi-arrow-up-circle-fill gradeUp"></i>
                      </Col></Row>
                      <Row style={{ "height": "10%" }}><Col><Button onClick={() => { handleDeleteOfficer(actualOfficer._id) }} variant='danger'>Usuń funkcjonariusza</Button></Col></Row>
                    </Col>
                  </Row>

                ) : ("")}
              </Col>
            </Row>
          </Col>
          <Col style={{ "height": "100%" }}>
            <Row style={{ "height": "10%", "padding-top": "1rem" }}>
              <Col><h1>Spis detektywów</h1></Col>
            </Row>
            <Row style={{ "height": "90%" }}>
              <Col className="officeSinglePanel">
                {
                  allOfficers?.map((value) => (
                    <Row className="singleOfficer" onClick={() => { actualOfficerHandler(value) }}>
                      <Col style={{ height: "100%" }}><img src={value.avatar} /></Col>
                      <Col>{value.firstName}</Col>
                      <Col>{value.lastName}</Col>
                    </Row>
                  ))
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <ConfirmModal isShown={showConfirm} onConfirm={handleConfirm} />


      </Container>
    </>
  );
};

export default Office;

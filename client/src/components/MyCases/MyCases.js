import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SingleCase from "../SingleCase/SingleCase";
import { useState } from "react";
import cases from "../../testdata/cases.json";
import Button from "react-bootstrap/esm/Button";
import logo from "../../assets/images/logo.png";
import { getCurrentOfficer } from "../../Services/OfficerService";
import {
  addNewCase,
  getAllCases,
  deleteCase,
} from "../../Services/CasesService";
import { format } from "date-fns";
import { editCase } from "../../Services/CasesService";
import ConfirmModal from "../Modal/Confirm";

const MyCases = () => {
  const initialState = {
    title: "",
    date: Date.now(),
  };

  const [allCases, setAllCases] = useState();
  const [actualCase, setActualCase] = useState();
  const [caseForm, setCaseForm] = useState(true);
  const [newCase, setNewCase] = useState(initialState);
  const [currentOfficer, setCurrentOfficer] = useState(getCurrentOfficer());
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setId] = useState();

  const handleCaseTrigger = () => {
    setCaseForm(!caseForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCase({
      ...newCase,
      [name]: value,
    });
  };

  const handleCaseChange = (x) => {
    setActualCase(x)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await addNewCase(newCase);
    setNewCase(null);
    setCaseForm(true);
    getCases();
  };

  const handleConfirm = async (x) => {
    if (x) {
      const updatedCases = allCases.filter((x) => x._id !== id._id);
      setAllCases(updatedCases);
      const result = await editCase(id._id, { archived: true });
    } else {
    }
    setId();
    setShowConfirm(false);
  }

  const handleDelete = async (key) => {
    setShowConfirm(true);
    setId(key);
  };

  const getCases = async () => {
    const result = await getAllCases({ archived: false });
    setAllCases(result.data.results);
  };

  useEffect(() => {
    getCases();
  }, []);

  useEffect(() => {
    setNewCase({
      ...newCase,
      ["officers"]: currentOfficer._id,
    });
  }, [currentOfficer]);

  return (
    <Container className="defaultContainer2" fluid >
      <Row style={{ height: "100%" }}>
        <Col className="caseList">
          <Row style={{ height: "100%" }}>
            <Col className="MyCasesList">
              <Button
                variant="dark"
                style={{ "margin-top": "1rem" }}
                onClick={() => {
                  handleCaseTrigger();
                }}
              >
                {caseForm ? "Nowa teczka" : "Wróć"}
              </Button>
              {allCases?.map((key) => (
                <Row>
                  <Col
                    className="singleCase"
                    onClick={() => {
                      handleCaseChange(key);
                    }}
                  >

                    <label style={{ width: "90%" }}>{key.title}</label>
                    <label style={{ width: "10%" }}>
                      <i
                        class="bi bi-trash xdd"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDelete(key);
                        }}
                      ></i>
                    </label>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </Col>
        <Col className="caseBody" >
          {caseForm && actualCase ? (
            <Col style={{ height: "100%" }}>
              <SingleCase case={actualCase} />
            </Col>
          ) : (
            <Col className="newCaseForm">
              <Row style={{ margin: "auto" }}>
                <Col>
                  <img src={logo} width="200px" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2 style={{ color: "black" }}>Detective Task Unit</h2>
                </Col>
              </Row>
              <form>
                <Row>
                  <Col>
                    <input
                      type="text"
                      name="title"
                      className="folderInput"
                      placeholder="tytuł"
                      required="true"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      type="text"
                      name="officers"
                      className="folderInput"
                      placeholder={
                        currentOfficer.firstName + " " + currentOfficer.lastName
                      }
                      required="true"
                      disabled={true}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      type="text"
                      name="date"
                      className="folderInput"
                      placeholder={format(Date.now(), "dd/MM/yyyy")}
                      required="true"
                      disabled={true}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row style={{ "margin-top": "4rem" }}>
                  <Col>
                    <Col />
                  </Col>
                  <Col>
                    <input
                      type="submit"
                      className="folderInput"
                      value={
                        currentOfficer.firstName + " " + currentOfficer.lastName
                      }
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    />
                  </Col>
                </Row>
              </form>
            </Col>
          )}
        </Col>
      </Row>
      <ConfirmModal isShown={showConfirm} onConfirm={handleConfirm} />
    </Container>
  );
};

export default MyCases;

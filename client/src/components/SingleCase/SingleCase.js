import React, { useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Evidence from "./Evidence";
import Related from "./Related";
import { useState, useMemo } from "react";
import JoditEditor from "jodit-react";
import "../../style.css";
import { editCase } from "../../Services/CasesService";
import { getAllOfficers } from "../../Services/OfficerService";
import { getAllCrimeOrgs } from "../../Services/CrimesService";
import { getAllPersons } from "../../Services/PersonService";

const SingleCase = (props) => {
  const casex = props.case;
  const [actualCase, setActualCase] = useState();
  const [click, setClick] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState();
  const [show, setShow] = useState(false);
  const [showEvidenceForm, setShowEvidenceForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [officerForm, setOfficerForm] = useState();
  const [evidenceForm, setEvidenceForm] = useState();
  const [actualCard, setActualCard] = useState("Document");
  const [showRelatedForm, setShowRelatedForm] = useState(false);
  const [modalOption, setModalOption] = useState(0)

  const handleChange = (con) => {
    setContent(con);
  };

  const handleModalChange = (value) => {
    setModalOption(value)
  }

  const handleChangeOfficer = (e) => {
    const { name, value } = e.target;

    setOfficerForm({
      ...officerForm,
      [name]: value,
    });
  };

  const handleChangeEvidence = (e) => {
    const { name, value } = e.target;

    setEvidenceForm({
      ...evidenceForm,
      [name]: value
    })

    console.log(evidenceForm);
  }

  const deleteOfficer = async (id) => {
    const updatedOfficers = actualCase.officers.filter(
      (member) => member._id !== id
    );

    setActualCase((prevState) => ({
      ...prevState,
      officers: updatedOfficers,
    }));

    const result = await editCase(actualCase._id, {
      officers: updatedOfficers,
    });
  };

  const handleSubmitEvidence = async () => {
    const temp = { ...actualCase };
    temp.evidences.push(evidenceForm)
    setActualCase(temp)
    setEvidenceForm()
    const result = await editCase(actualCase._id, temp);
    console.log(result);
  };

  const handleSubmitOfficer = async () => {
    const name = officerForm.name.split(" ");
    const firstName = name[0];
    const lastName = name[1];
    const result = await getAllOfficers({
      firstName: firstName,
      lastName: lastName,
    });
    if (result.data.results.length > 0) {
      const temp = { ...actualCase };
      temp.officers.push(result.data.results[0]);
      setActualCase(temp);
      const result2 = await editCase(actualCase._id, temp);
      console.log(result2);
    } else {
      console.log("ne ma ");
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      theme: "dark",
      maxHeight: "100%",
      allowResizeX: false,
      allowResizeY: false,
      colorPickerDefaultTab: "color",
    }),
    []
  );

  const handleClose = () => {
    setShow(false);
    setShowEvidenceForm(false);
    setShowRelatedForm(false);
    setErrors();
  };
  const handleShow = () => setShow(true);
  const handleShowEvidence = () => {
    setShowEvidenceForm(true);
  };
  const handleShowRelated = () => {
    setShowRelatedForm(true);
  }

  const handleClick = () => {
    if (click) {
      setContent(content);
    }
    setClick(!click);
  };

  const handleSubmit = async () => {
    setClick(!click);
    const result = await editCase(actualCase._id, { description: content });
    console.log(result);
  };

  const handleSubmitOrg = async () => {
    console.log(evidenceForm);
    const resultOrg = await getAllCrimeOrgs(evidenceForm)
    console.log(resultOrg);
    if (resultOrg.data.results.length < 1) {
      console.log("nie ma takiej organizacji ");
    } else {
      const temp = { ...actualCase };
      temp.orgs.push(resultOrg.data.results[0])
      setActualCase(temp)
      const result = await editCase(actualCase._id, temp);
      setEvidenceForm();
    }
  }

  const handleSubmitPerson = async () => {
    console.log(evidenceForm);
    const resultPerson = await getAllPersons(evidenceForm)
    if(resultPerson.data.results.length < 1 ){
      console.log("Nie ma takiej osoby");
    }else{
      const temp = { ...actualCase };
      temp.persons.push(resultPerson.data.results[0])
      setActualCase(temp)
      const result = await editCase(actualCase._id, temp);
      setEvidenceForm();
    }
  }

  useEffect(() => {
    setContent(actualCase?.description);
  }, [actualCase]);

  useEffect(() => {
    setActualCase(props.case);
  }, [props]);

  const changeWindow = (value) => {
    setActualCard(value);
  };
  return (
    <Row className="singleCaseContainer" style={{ maxHeight: "100%" }}>
      <Col style={{ height: "100%" }}>
        <Row style={{ width: "100%" }}>
          <Col>
            <Row>
              <Col>
                <h1>{actualCase?.title}</h1>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="caseHeader">
          <Col>
            {actualCase?.officers.map((value) => (
              <label className="cops">
                {value.firstName + " " + value.lastName}{" "}
                <i
                  class="bi bi-x-circle"
                  onClick={() => {
                    deleteOfficer(value._id);
                  }}
                ></i>
              </label>
            ))}
            <Button
              variant="dark"
              onClick={() => {
                handleShow();
              }}
            >
              +
            </Button>
          </Col>
        </Row>
        <Row style={{ height: "12%" }}>
          <Col className="caseMenu">
            <Button
              variant="dark"
              onClick={() => {
                changeWindow("Document");
              }}
            >
              Dokument
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                changeWindow("Evidence");
              }}
            >
              Dowody
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                changeWindow("Related");
              }}
            >
              Powiązania
            </Button>
          </Col>
        </Row>
        <Row style={{ height: "78%" }}>
          {actualCard === "Document" && (
            <Col style={{ height: "100%" }}>
              <Row>
                {click ? (
                  <Col>
                    <Button
                      onClick={() => {
                        handleClick();
                      }}
                      variant="secondary m-1"
                    >
                      Podgląd
                    </Button>
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                      variant="secondary m-1"
                    >
                      Zapisz
                    </Button>
                  </Col>
                ) : (
                  <Col>
                    <Button
                      variant="dark m-1"
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      Edytuj
                    </Button>
                  </Col>
                )}
              </Row>
              <Row style={{ height: "100%" }}>
                <Col
                  style={{
                    border: "1px solid black",
                    "background-color": " #121621",
                    height: "90%",
                    "overflow-y": "scroll",
                  }}
                >
                  {click ? (
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      onChange={(newContent) => setContent(newContent)}
                    />
                  ) : (
                    <div style={{ "wordWrap": "break-word" }} dangerouslySetInnerHTML={{ __html: content }} />
                  )}
                </Col>
              </Row>
            </Col>
          )}
          {actualCard === "Evidence" && (
            <Col style={{ height: "90%" }}>
              <Button variant="dark" onClick={setShowEvidenceForm} style={{ "marginBottom": "1rem" }}>Dodaj</Button>
              <Evidence case={actualCase} />
            </Col>
          )}
          {actualCard === "Related" &&
            <Col style={{ height: "90%" }}>
              <Button variant="dark" onClick={setShowRelatedForm} style={{ "marginBottom": "1rem" }}>Dodaj</Button>
              <Related case={actualCase} />
            </Col>}
        </Row>

        <Modal
          show={show}
          onHide={handleClose}
          className="addNewCrimeMemberModal"
        >
          <Modal.Body>
            <h5>Dodaj funkcjonariusza</h5>
            <form>
              <input type="text" name="name" onChange={handleChangeOfficer} />
              <p>Imię i nazwisko</p>
              {
                <p style={{ color: "red" }}>
                  {actualCase?.userId ? errors.userId : ""}
                </p>
              }
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                handleSubmitOfficer();
              }}
            >
              Dodaj
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showEvidenceForm}
          onHide={handleClose}
          className="addNewCrimeMemberModal"
        >
          <Modal.Body>
            <h5>Dodaj dowód</h5>
            <form>
              <input
                type="text"
                name="description"
                onChange={handleChangeEvidence}
              />
              <p>opis</p>
              <input type="text" name="photo" onChange={handleChangeEvidence} />
              <p>link do zdjęcia</p>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                handleSubmitEvidence();
              }}
            >
              Dodaj
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showRelatedForm}
          onHide={handleClose}
          className="addNewCrimeMemberModal"
        >

          <Modal.Body>
            <h5>Dodaj </h5>
            <Button variant='dark' onClick={() => { handleModalChange(!modalOption) }}>{modalOption == 0 ? "Osoba" : "Organizacja"}</Button>
            {modalOption == 1 ? (
              <form>
                <input
                  type="text"
                  name="id"
                  onChange={handleChangeEvidence}
                />
                <p>Numer dowodu</p>
              </form>
            ) : (
              <form>
                <input
                  type="text"
                  name="name"
                  onChange={handleChangeEvidence}
                />
                <p>Nazwa organizacji</p>

              </form>)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Zamknij
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                { modalOption == 0 ? (handleSubmitOrg()) : (handleSubmitPerson()) }
              }}
            >
              Dodaj
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

export default SingleCase;

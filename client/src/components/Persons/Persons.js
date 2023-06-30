import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Button } from "react-bootstrap"
import { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import '../../style.css'
import { addNewPerson, getAllPersons, updatePerson } from "../../Services/PersonService.js"
import { getAllCases } from "../../Services/CasesService";
const Persons = () => {
    const [register, setRegister] = useState(false)
    const [personActive, setPersonActive] = useState(false)
    const [desc, setDesc] = useState(true)
    const [cases, setCases] = useState(false)
    const [editPersonData, setEditPersonData] = useState(false)
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [newPersonForm, setNewPersonForm] = useState(false)
    const [newPerson, setNewPerson] = useState()
    const [allPersons, setAllPersons] = useState();
    const [actualPerson, setActalPerson] = useState();
    const [related, setRelated] = useState();

    const handleChange = (con) => {
        setContent(con)
    }

    const handleSetDesc = () => {
        console.log("working");
        setDesc(true);
        setCases(false);
        setEditPersonData(false);
    }

    const handleSetCases = () => {
        setCases(true);
        setDesc(false);
        setEditPersonData(false);
    }

    const handleSetEditPersonData = () => {
        setEditPersonData(true);
        setCases(false);
        setDesc(false);
    }

    const handleSetRegister = () => {
        setRegister(!register);
    }

    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setNewPerson({
            ...newPerson,
            [name]: value,
        });
        console.log(newPerson);
    }

    const handleSubmit = async (e) => {
        //e.preventDefault()
        const result = await addNewPerson(newPerson)
        console.log(result);
    }

    const config = useMemo(() => ({
        readonly: false,
        theme: "dark",
        height: "29rem",
        allowResizeX: false,
        allowResizeY: false,
        colorPickerDefaultTab: 'color',
    }), [])

    const getPersons = async () => {
        const result = await getAllPersons();
        setAllPersons(result.data.results)
    }

    const handleUpdate = async () => {
        console.log(content);
        const result = await updatePerson(actualPerson._id, { description: content })
        console.log(result);
    }

    useEffect(() => {
        getPersons()
    }, []);

    const getRelated = async () => {
        const result = await getAllCases({ persons: actualPerson._id })
        setRelated(result.data.results);
    }

    useEffect(() => {
        if (actualPerson) {
            setContent(actualPerson.description);
            getRelated();
        }
    }, [actualPerson])

    return (
        <>
            <Container className="defaultContainer" fluid>
                <Row style={{ height: "100%" }}>
                    <Col className="personsList">
                        <Row className="personsListHeader">
                            <Col><Button onClick={() => { handleSetRegister(); }}>Dodaj</Button></Col>
                        </Row>
                        {!register ? (

                            <Row className="personsListTable">
                                <Col style={{ maxHeight: "100%" }}>
                                    <Row className="personsListTableHeader">
                                        <Col>Imię</Col><Col>Nazwisko</Col>
                                    </Row>
                                    <Row className="personsListTableBody">
                                        <Col>
                                            {
                                                allPersons?.map((value) => (
                                                    <>
                                                        <Row className="singlePerson" onClick={() => { setActalPerson(value) }}><Col>{value.firstName}</Col><Col>{value.lastName}</Col></Row>

                                                    </>
                                                ))
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        ) : (
                            <Row className="personsListTable">
                                <Col className="newPersonForm">
                                    <form>
                                        <input
                                            type="text"
                                            name="firstName"
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <p>Imię</p>
                                        <input
                                            type="text"
                                            name="lastName"
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <p>Nazwisko</p>
                                        <input
                                            type="text"
                                            name="id"
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <p>Numer dowodu</p>
                                        <input
                                            type="text"
                                            name="phone"
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <p>Numer telefonu</p>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <p>Adres email</p>
                                        <input
                                            type="text"
                                            name="avatar"
                                            onChange={handleChangeForm}
                                            required
                                        />
                                        <p>Zdjęcie</p>
                                        <p className="text-danger"></p>
                                        <input type="submit" onClick={()=>{handleSubmit();handleSetRegister()}} value="Dodaj" />
                                    </form>
                                </Col>
                            </Row>
                        )}
                    </Col>
                    <Col className="personsDetails">
                        <Row className="personDetailsData">
                            <Col style={{height:"100%"}}>
                                <Row className="personDetailsImg">
                                    <img src={actualPerson?.avatar}/>
                                </Row>
                            </Col>
                            <Col style={{ "max-height": "100%" }}>
                                <Row>
                                    <Col>Imie</Col><Col>{actualPerson?.firstName}</Col>
                                </Row>
                                <Row>
                                    <Col>Nazwisko</Col><Col>{actualPerson?.lastName}</Col>
                                </Row>
                                <Row>
                                    <Col>Numer dowodu</Col><Col>{actualPerson?.id}</Col>
                                </Row>
                                <Row>
                                    <Col>Numer telefonu</Col><Col>{actualPerson?.phone}</Col>
                                </Row>
                                <Row>
                                    <Col>E-mail</Col><Col>{actualPerson?.email}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="personDesc">
                            <div className="personMenu">
                                {cases && (
                                    <>
                                        <Row><Col><Button variant="dark" onClick={() => { handleSetDesc() }}>Opis</Button></Col></Row>
                                        <Row><Col><Button variant="dark" onClick={() => { handleSetCases() }}>Powiązania</Button></Col></Row>
                                    </>
                                )}
                                {desc && (
                                    <>
                                        <Row><Col><Button variant="dark" onClick={() => { handleSetEditPersonData() }}>Edytuj</Button></Col></Row>
                                        <Row><Col><Button variant="dark" onClick={() => { handleSetCases() }}>Powiązania</Button></Col></Row>
                                    </>
                                )}
                                {editPersonData && (
                                    <>
                                        <Row><Col><Button variant="dark" onClick={() => { handleSetDesc(); handleUpdate(); }}>Zapisz</Button></Col></Row>
                                        <Row><Col><Button variant="dark" onClick={() => { handleSetDesc() }}>Anuluj</Button></Col></Row>
                                        <Row><Col><Button variant="dark" onClick={() => { handleSetCases() }}>Powiązania</Button></Col></Row>
                                    </>
                                )}
                            </div>
                            <div className="personContent">
                                {desc ? (
                                    <Row>
                                        <Col>
                                            <div dangerouslySetInnerHTML={{ __html: content }} />
                                        </Col>
                                    </Row>
                                ) : (
                                    related?.map((key) => (
                                        <>
                                            <Row className="personRelated">
                                                <Col>{key.title}
                                                </Col>
                                            </Row>
                                        </>
                                    ))

                                )}
                                {editPersonData ? (
                                    <>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            onBlur={newContent => setContent(newContent)} />
                                    </>
                                ) : ""}
                            </div>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </>
    )


}

export default Persons;
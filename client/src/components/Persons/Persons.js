import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Button } from "react-bootstrap"
import { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import '../../style.css'
import { addNewPerson, getAllPersons } from "../../Services/PersonService.js"
const Persons = () => {
    const [register, setRegister] = useState(false)
    const [personActive, setPersonActive] = useState(false)
    const [desc, setDesc] = useState(false)
    const [cases, setCases] = useState(false)
    const [vehicles, setVehicles] = useState(false)
    const [editPersonData, setEditPersonData] = useState(false)
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [savedContent, setSavedContent] = useState('')
    const [newPersonForm, setNewPersonForm] = useState(false)
    const [newPerson, setNewPerson] = useState()
    const [allPersons, setAllPersons] = useState();
    const [actualPeson, setActalPerson] = useState();

    const handleChange = (con) => {
        setContent(con)
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
        e.preventDefault()
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
        console.log(result);
        setAllPersons(result.data.results)
    }

    useEffect(() => {
        getPersons()
    }, []);

    return (
        <>
            <Container className="defaultContainer" fluid>
                <Row className='informantsPanelRow'>
                    <Col style={{ "height": "100%", "borderRight": "1px solid white" }}>
                        <Row style={{ "padding": "0.5rem", "borderBottom": "1px solid white" }}><Col><input type="text" /></Col><Col><Button variant="dark">Wyszukaj</Button></Col><Col><Button variant="warning">Informatorzy</Button></Col><Col><Button variant="warning" onClick={() => { setNewPersonForm(!newPersonForm) }}>Dodaj</Button></Col></Row>
                        <Row style={{ "height": "90%", "overflow-y": "auto" }}>
                            <Col>
                                {newPersonForm ? (
                                    <Row className="newPersonForm">
                                        <Col className="officeSinglePanel">
                                            <form>
                                                <p>Imię</p>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    onChange={handleChangeForm}
                                                    required
                                                />
                                                <p>Nazwisko</p>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    onChange={handleChangeForm}
                                                    required
                                                />
                                                <p>Numer dowodu</p>
                                                <input
                                                    type="text"
                                                    name="id"
                                                    onChange={handleChangeForm}
                                                    required
                                                />
                                                <p>Numer telefonu</p>
                                                <input
                                                    type="text"
                                                    name="number"
                                                    onChange={handleChangeForm}
                                                    required
                                                />
                                                <p>Adres email</p>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    onChange={handleChangeForm}
                                                    required
                                                />
                                                <p className="text-danger"></p>
                                                <input type="submit" onClick={handleSubmit} value="Dodaj" />
                                            </form>
                                        </Col>
                                    </Row>
                                ) : (

                                    <Row>
                                        <Col>
                                            {
                                                allPersons?.map((value) => (
                                                    <Row className="singlePerson" onClick={()=>{setActalPerson(value)}}><Col>{value.firstName}</Col><Col>{value.lastName}</Col></Row>
                                                ))
                                            }
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    </Col>
                    <Col style={{ "minHeight": "100%", "background-color": "#171d2a" }}>
                        {register ? (
                            <Row>
                                <Col>Dodaj nową osobę</Col>
                            </Row>
                        ) : ""}
                        {!personActive ? (
                            <Row style={{ "height": "100%" }}>
                                <Col style={{ "height": "100%" }}>
                                    <Row>
                                        <Col style={{ "padding": "0.5rem ", "background-color": "black" }}><img src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg" width="200px" /></Col>
                                        <Col style={{ 'textAlign': 'left', "padding": "0.5rem", "background-color": "black" }}>
                                            
                                            <Row>
                                                <Col>Imie</Col><Col>{actualPeson?.firstName}</Col>
                                            </Row><Row>
                                                <Col>Nazwisko</Col><Col>{actualPeson?.lastName}</Col>
                                            </Row><Row>
                                                <Col>Numer dowodu</Col><Col>{actualPeson?.id}</Col>
                                            </Row><Row>
                                                <Col>Numer telefonu</Col><Col>{actualPeson?.phone}</Col>
                                            </Row>
                                            <Row>
                                                <Col>Adres e-mail</Col><Col>{actualPeson?.email}</Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                    <Row style={{ "margin": "0.5rem", "height": "100%" }}>
                                        <Col className="personsMiniMenu">
                                            {(!desc && !editPersonData) ? (

                                                <>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setDesc(!desc) }}>Opis</Col></Row>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setCases(!cases) }}>Powiązane sprawy</Col></Row>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setVehicles(!vehicles) }}>Pojazdy</Col></Row>
                                                </>
                                            ) : ""
                                            }{desc ? (
                                                <>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setEditPersonData(true); setCases(false); setVehicles(false); setDesc(false) }}>Edytuj opis</Col></Row>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setCases(!cases); setDesc(false) }}>Powiązane sprawy</Col></Row>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setVehicles(!vehicles); setDesc(false) }}>Pojazdy</Col></Row>
                                                </>
                                            ) : ""
                                            }{editPersonData ? (
                                                <>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setEditPersonData(false); setCases(true); setVehicles(true); setDesc(true) }}>Zapisz</Col></Row>
                                                    <Row><Col className="personsMiniMenuItem" onClick={() => { setEditPersonData(false); setCases(true); setVehicles(true); setDesc(true) }}>Anuluj</Col></Row>
                                                </>
                                            ) : ("")

                                            }
                                        </Col>
                                        <Col>
                                            <Row style={{ "height": "75%" }}>
                                                <Col className="personDescription">
                                                    {editPersonData ? (
                                                        <>
                                                            <JoditEditor
                                                                ref={editor}
                                                                value={content}
                                                                config={config}
                                                                onChange={newContent => setContent(newContent)} />
                                                        </>
                                                    ) : (<>
                                                        {
                                                            desc ? (<div dangerouslySetInnerHTML={{ __html: content }} />) : ""
                                                        }
                                                    </>)}

                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>

                                </Col>
                            </Row>


                        ) : ""}
                    </Col>
                </Row>

            </Container>
        </>
    )


}

export default Persons;
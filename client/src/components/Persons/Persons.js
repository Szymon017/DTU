import React from "react";
import Container from "react-bootstrap/esm/Container";
import { Row, Col, Button } from "react-bootstrap"
import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import '../../style.css'
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

    const handleChange = (con) => {
        setContent(con)
    }
    const config = useMemo(() => ({
        readonly: false,
        theme: "dark",
        height: "29rem",
        allowResizeX: false,
        allowResizeY: false,
        colorPickerDefaultTab: 'color',
    }), [])


    return (
        <>
            <Container className="defaultContainer" fluid>
                <Row className='informantsPanelRow'>
                    <Col style={{ "height": "100%", "borderRight": "1px solid white" }}>
                        <Row style={{ "padding": "0.5rem", "borderBottom": "1px solid white" }}><Col><input type="text" /></Col><Col><Button variant="dark">Wyszukaj</Button></Col><Col><Button variant="warning">Informatorzy</Button></Col></Row>
                        <Row style={{ "height": "90%", "overflow-y": "auto" }}>
                            <Col>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>
                                <Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row><Row>
                                    <Col>John</Col><Col>Brown</Col><Col><u>Szczegóły</u></Col>
                                </Row>

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
                                                <Col>Imie</Col><Col>John</Col>
                                            </Row><Row>
                                                <Col>Nazwisko</Col><Col>Brown</Col>
                                            </Row><Row>
                                                <Col>Numer dowodu</Col><Col>XD-0000</Col>
                                            </Row><Row>
                                                <Col>Numer telefonu</Col><Col>12345</Col>
                                            </Row>
                                            <Row>
                                                <Col>Adres e-mail</Col><Col>j.brown@gmail.com</Col>
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
                                                            desc?(<div dangerouslySetInnerHTML={{ __html: content }} />):""
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
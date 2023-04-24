import React, { useEffect, useRef } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import { useState, useMemo } from 'react';
import JoditEditor from "jodit-react";
import '../../style.css'
import { editCase } from "../../Services/CasesService";

const SingleCase = (props) => {

    const actualCase = props.case;
    const [click, setClick] = useState(false);
    const editor = useRef(null);
    const [content, setContent] = useState();
    const [addOfficer, setAddOfficer ] = useState(false);
    
    const handleChange = (con) => {
        setContent(con)
    }

    const config = useMemo(() => ({
        readonly: false,
        theme: "dark",
        height: "29rem",
        maxHeight: "29rem",
        allowResizeX: false,
        allowResizeY: false,
        colorPickerDefaultTab: 'color',
    }), [])

    const handleClick = () => {
        if (click) {
            setContent(content)
        }
        setClick(!click);
    }

    const handleSubmit = async () => {
        setClick(!click);
        const result = await editCase(actualCase._id, { description: content })
        console.log(result);
    }

    useEffect(() => {
        setContent(actualCase?.description)

    }, [actualCase])

    return (
        <>
            <Container className='singleCaseContainer'>

                <div>
                    <Row>
                        <Col><h1>{actualCase?.title}</h1></Col>
                    </Row>
                    <Row>
                        <Col>{
                            actualCase?.officers.map((value) => (

                                <label className='cops'>{value.firstName + " " + value.lastName}</label>
                            ))
                        }
                            
                            {addOfficer?(
                                <Row>
                                    <Col>
                                    <input type="text" style={{"margin":"1rem"}}></input>
                                    <Button variant="dark" onClick={()=>{setAddOfficer(!addOfficer)}}>+</Button>
                                    </Col>
                                </Row>
                            ):(<Button variant="dark" onClick={()=>{setAddOfficer(!addOfficer)}}>+</Button>)}
                        </Col>
                    </Row>

                    <Row>
                        <Col className='caseMenu'><Button variant='dark'>Notatka</Button><Button variant='dark'>Dowody</Button><Button variant='dark'>Osoby powiązane</Button></Col>
                    </Row>
                </div>
                {click ? <><Button onClick={() => { handleClick() }} variant="secondary m-1">Podgląd</Button><Button onClick={() => { handleSubmit() }} variant="secondary m-1">Zapisz</Button></> : <Button variant="dark m-1" onClick={() => { handleClick() }}>Edytuj</Button>}

                <Row>

                    <Col style={{ border: "1px solid black", 'background-color': " #121621", 'height': '29rem', 'overflow-y': 'auto' }}>

                        {click ? (

                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={config}
                                onChange={newContent => setContent(newContent)} />
                        ) : <div dangerouslySetInnerHTML={{ __html: content }} />}
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default SingleCase;
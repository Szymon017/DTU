import React, { useEffect, useRef } from "react"
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from 'react-bootstrap/Button';
import { useState, useMemo } from 'react';
import JoditEditor from "jodit-react";
import '../../style.css'
const SingleCase = (props) => {
    const actualCase = props.case;
    const [click, setClick] = useState(false);


    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [savedContent, setSavedContent] = useState('asdasdas')

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
        if(click){
            setSavedContent(content)
        }
        setClick(!click);
    }


    return (
        <>
            <Container className='singleCaseContainer'>
                
                    <div>
                        <Row>
                            <Col><h1>{actualCase?.title}</h1></Col>
                        </Row>
                        <Row>
                            <Col><label className='cops'>Joseph Lee</label><label className='cops'>Dwayne Smith</label><label className='cops'>Jayden Curtis</label><Button variant="warning">+</Button></Col>
                        </Row>

                        <Row>
                            <Col className='caseMenu'><Button variant='dark'>Opis</Button><Button variant='dark'>Dowody</Button><Button variant='dark'>TODO</Button><Button variant='dark'>Notatki</Button></Col>
                        </Row>
                    </div>
                    {click?<><Button onClick={() => { handleClick() }} variant="secondary m-1">Podgląd</Button><Button onClick={() => { handleClick() }} variant="secondary m-1">Zapisz</Button></>:<Button variant="dark m-1" onClick={() => { handleClick() }}>Edytuj</Button>}

                <Row>

                    <Col style={{ border: "1px solid black", 'background-color': " #121621", 'height': '29rem', 'overflow-y':'auto'}}>

                        {click ? (

                            <JoditEditor
                                ref={editor}
                                value={savedContent}
                                config={config}
                                onChange={newContent => setContent(newContent)} />
                        ) : <div dangerouslySetInnerHTML={{ __html: savedContent }} />}
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default SingleCase;
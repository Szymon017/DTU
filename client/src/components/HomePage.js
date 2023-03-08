import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import avatar from '../assets/images/avatar.png'
import Menu from '../components/Menu.js'
import Current from './Current/Current';
import Ann from '../testdata/annoucements.json'
import { Note } from './Note';
import { Ball } from './Ball';
import { Button } from 'react-bootstrap';

const HomePage = () => {
    let xPos, yPos;
    let moving = false
    const [actualNote, setActualNote] = useState("");

    const move = (e) => {
        xPos = e.clientX
        yPos = e.clientY
        const note = document.getElementById(actualNote)
        console.log(note);
        note.style.position = 'absolute'
        note.style.top = `${yPos-200}`+'px'
        note.style.left = `${xPos-200}`+'px'
        let x = document.getElementById("pinBoard");
        x.addEventListener("mousemove", move)
    }

    const disableMouse = (e) => {
        console.log("Mouse disabled");
        moving = false
        let x = document.getElementById("pinBoard");
        setActualNote("")
        x.removeEventListener("mousemove", move)

       
    }

    const enableMouse = (e) => {
        if(actualNote){
            console.log("Mouse enabled");
            moving = true 
            move(e)
        }
    }

    const newNote = () => {

    }
    return(
        <>
        <Container className="defaultContainer" fluid>
            <div id="pinBoard" onMouseDown = {enableMouse} onMouseUp={disableMouse}>
            <Button variant='dark' onClick={()=>{newNote()}}>Dodaj notatke</Button>
                {Ann.map((key)=>(
                    <div className="note" id={key.id} onClick={()=>{setActualNote(key.id)}}>
                        <h1>{key.title}</h1>
                        <p>{key.desc}</p>
                    </div>
                ))}
               
            </div>
        </Container>
        </>
    )
}

export default HomePage;
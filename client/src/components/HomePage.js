import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import avatar from '../assets/images/avatar.png'
import Menu from '../components/Menu.js'
import Current from './Current/Current';
import Ann from '../testdata/annoucements.json'
import { Note } from './Note';
import { Ball } from './Ball';
const HomePage = () => {
    let xPos, yPos;
    let moving = false

    const move = (e) => {
        xPos = e.clientX
        yPos = e.clientY
        const note = document.getElementById("note")
        note.style.position = 'absolute'
        note.style.top = `${yPos-200}`+'px'
        note.style.left = `${xPos-200}`+'px'
        let x = document.getElementById("pinBoard");
        x.addEventListener("mousemove", move)
        console.log(xPos + " " + yPos);

    }

    const disableMouse = (e) => {
        console.log("Mouse disabled");
        moving = false
        let x = document.getElementById("pinBoard");
        x.removeEventListener("mousemove", move)

       
    }

    const enableMouse = (e) => {
        console.log("Mouse enabled");
        moving = true 
        move(e)
        

    }
    return(
        <>
        <Container className="defaultContainer" fluid>
            <div id="pinBoard" onMouseDown = {enableMouse} onMouseUp={disableMouse}style={{"background-color":"black","height":"72%","width":"98%","overflow":"auto", "position":"absolute"}}>
                <div id="note">
                    <h1>Ogłoszenie dla nowych detektywów</h1>
                    <p>Uwaga, w dniu 15 marca odbędzie się szkolenie dla nowych rekrutów. Obecność obowiązkowa!</p>
                </div>
            </div>
        </Container>
        </>
    )
}

export default HomePage;
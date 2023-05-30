import React, { useEffect, useState } from 'react';
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
import Modal from 'react-bootstrap/Modal';
import { getAllAnnoucements, addNewAnnoucement, deleteAnAnnoucement, updateAnnoucement } from '../Services/AnnoucementService';


const HomePage = () => {

    //Modal settings
    const [show, setShow] = useState(false);
    const [newNoteForm, setNewNoteForm] = useState();

    const handleClose = () => {
        setShow(false);
        const handleShow = () => setShow(true);
    }

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(newNoteForm);

        setNewNoteForm({
            ...newNoteForm,
            [name]: value,
        });
    }


    //note settings
    let xPos, yPos;
    let moving = false
    const [actualNote, setActualNote] = useState("");
    const [addNote, setAddNote] = useState("");

    const move = (e) => {
        xPos = e.clientX
        yPos = e.clientY
        const note = document.getElementById(actualNote)
        console.log(note);
        note.style.position = 'absolute'
        note.style.top = `${yPos - 200}` + 'px'
        note.style.left = `${xPos - 200}` + 'px'
        let x = document.getElementById("pinBoard");
        x.addEventListener("mousemove", move)
        updatePos({posY: yPos, posX: xPos, _id: note.id})
    }

    const updatePos = async(x) => {
        const data = x
        console.log(data);
        const result = await updateAnnoucement(data)
        console.log(result);
    }

    const disableMouse = (e) => {
        console.log("Mouse disabled");
        moving = false
        let x = document.getElementById("pinBoard");
        setActualNote("")
        x.removeEventListener("mousemove", move)
    }

    const enableMouse = (e) => {
        if (actualNote) {
            console.log("Mouse enabled");
            moving = true
            move(e)
        }
    }

    const handleAddNote = async () => {
        try {
            const result = await addNewAnnoucement(newNoteForm)
            annoucements.push(result.data.results);
            console.log(result);
        } catch (error) {
        }
    }

    const handleDeleteNote = async (e) => {
        console.log(e);
        try{
            const result = await deleteAnAnnoucement(e);
            const updatedAnnoucements = annoucements.filter(ann => ann._id !== e)
            console.log(updatedAnnoucements);
            setAnnoucements(updatedAnnoucements)
        }catch(error){
            console.log(error);
        }
    }

    //annoucements settings
    const [annoucements, setAnnoucements] = useState();

    const getAnnoucements = async () => {
        try {
            const result = await getAllAnnoucements();
            setAnnoucements(result.data.results)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAnnoucements();
    }, [])

    return (
        <>
            <Container className="defaultContainer" fluid>
                <div id="pinBoard" onMouseDown={enableMouse} onMouseUp={disableMouse}>
                    <Button variant='dark' onClick={() => { handleShow() }}>Dodaj notatke</Button>
                    {annoucements?.map((key) => (
                        <div className={`note ${key.color}`} id={key._id} style={{ "top": key.posY - 200 + "px", "left": key.posX - 200 + "px", "position": "absolute" }} onClick={() => { setActualNote(key._id) }}>
                            <div>
                                <h1>{key.title}</h1>
                                <p>{key.description}</p>
                            </div>
                            <div>
                                <p><i style={{ maxWidth: "10%"}}className='bi bi-trash' onClick={()=>{handleDeleteNote(key._id)}}></i></p>
                            </div>
                        </div>
                    ))}

                </div>
                <Modal show={show} onHide={handleClose} className="addNewNote">
                    <Modal.Body><h5>Dodaj notatke</h5>
                        <form>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange} />
                            <p>Nagłówek</p>
                            <textarea
                                className='contentNote'
                                
                                name="description"
                                onChange={handleChange} />
                            <p>Treść</p>
                            <select name="color" id="color" onChange={handleChange}>
                                <option value='white'>biały</option>
                                <option value='yellow'>żółty</option>
                                <option value='green'>zielony</option>
                                <option value='black'>czarny</option>
                            </select>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Zamknij
                        </Button>
                        <Button variant="warning" onClick={() => { handleAddNote() }}>
                            Dodaj
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    )
}

export default HomePage;
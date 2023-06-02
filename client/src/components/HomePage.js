import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import avatar from '../assets/images/avatar.png'
import Menu from '../components/Menu.js'
import Current from './Current/Current';
import Ann from '../testdata/annoucements.json'
import { Note } from './Note';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { getAllAnnoucements, addNewAnnoucement, deleteAnAnnoucement, updateAnnoucement } from '../Services/AnnoucementService';
import ConfirmModal from './Modal/Confirm';

const HomePage = () => {

    //Modal settings
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [newNoteForm, setNewNoteForm] = useState();
    const [actualId, setActualId] = useState();

    const handleClose = () => {
        setShow(false);
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

    const handleConfirm = async (confirm) => {
        setShowConfirm(false);
        console.log(actualId);
        if (confirm) {
            try {
                const result = await deleteAnAnnoucement(actualId);
                const updatedAnnoucements = annoucements.filter(ann => ann._id !== actualId)
                console.log(updatedAnnoucements);
                setAnnoucements(updatedAnnoucements);
                setActualNote();
            } catch (error) {
                console.log(error);
            }
        }
        setActualId("");
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

        note.style.position = 'absolute'
        note.style.top = `${yPos - 250}` + 'px'
        note.style.left = `${xPos - 200}` + 'px'
        let x = document.getElementById("pinBoard");
        x.addEventListener("mousemove", move)
        console.log(note.style.top + " " + note.style.left);
        const ann = annoucements;
        const index = ann.findIndex(el => el._id === note.id)
        console.log(ann[index]);
        ann[index].posY = note.style.top;
        ann[index].posX = note.style.left;
        setAnnoucements(ann);
        console.log(annoucements);

        
    }

    const updatePos = async (x) => {
        const index = annoucements.findIndex(el => el._id === x)
        const posX = annoucements[index].posX.slice(0, -2)
        const posY = annoucements[index].posY.slice(0, -2)
        console.log(posX);
        try{
            const result = await updateAnnoucement({posX: Number(posX), posY: Number(posY), _id: x});
            console.log(result);
        }catch(err){

            console.log(err);
        }
        setActualNote();
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
            console.log(result);
            annoucements.push(result.data.results);
            console.log(annoucements);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteNote = async (e) => {
        setShowConfirm(true);
        setActualId(e);
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
                        <div className={`note ${key.color}`} id={key._id} style={{ "top": key.posY + "px", "left": key.posX + "px", "position": "absolute" }} onClick={() => { setActualNote(key._id) }}>
                            <div>
                                <h1>{key.title}</h1>
                                <p>{key.description}</p>
                            </div>
                            <div style={{ float: "left", width: "10%" }}>
                                <i style={{ maxWidth: "10%" }} className='bi bi-trash' onClick={() => { handleDeleteNote(key._id) }}></i>
                            </div>
                            <div>
                                <i style={{ maxWidth: "10%",float: "left", marginLeft: "0.5rem" }} class="bi bi-pin" onClick={()=>{updatePos(key._id)}}></i>
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
                <ConfirmModal isShown={showConfirm} onConfirm={handleConfirm}></ConfirmModal>
            </Container>
        </>
    )
}

export default HomePage;
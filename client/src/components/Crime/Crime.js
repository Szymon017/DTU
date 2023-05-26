import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CrimeData from '../../testdata/crime.json'
import SingleCrime from './SingleCrime';
import { Button } from 'react-bootstrap';
import Colors from '../../assets/Colors';
import { addNewCrimeOrg, archiveOrg, getAllCrimeOrgs, updateCrimeOrg } from '../../Services/CrimesService';
const Crime = () => {
    const [actualOrg, setActualOrg] = useState();
    const [orgForm, setOrgForm] = useState(false)
    const [newCrimeOrg, setNewCrimeOrg] = useState();
    const [crimeOrgs, setCrimeOrgs] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCrimeOrg({
            ...newCrimeOrg,
            [name]: value,
        });
        console.log(newCrimeOrg);
    }

    const getCrimeOrgs = async () => {
        const result = await getAllCrimeOrgs();
        console.log(result);
        setCrimeOrgs(result.data.results)
        result.data.results.map((key)=>(
            key.archived&(setActualOrg(key)
        )))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const result = await addNewCrimeOrg(newCrimeOrg)
        setCrimeOrgs([...crimeOrgs, result.data.object])
        setNewCrimeOrg()
        setOrgForm(false)
    }

    const handleDelete = async (data) => {
        const updatedCrimes = crimeOrgs.filter(org => org._id !== data._id)
        setCrimeOrgs(updatedCrimes)

        const result = await updateCrimeOrg(data._id, { archived: true })
        console.log(result);
    }

    useEffect(() => {
        getCrimeOrgs()
    }, [])

    return (
        <>
            <Container className="defaultContainer" fluid >
                <Row style={{ "height": "100%" }}>
                    <Col lg={2} className='MyCasesList'>
                        <Button variant='warning' style={{ "margin": "1rem" }} onClick={() => { setOrgForm(!orgForm) }}>Dodaj</Button>
                        {crimeOrgs?.map((key) => (
                            !key?.archived && (

                                <Row style={{ "width": "100%" }}>
                                <Col className="singleCase" onClick={() => { setActualOrg(key) }}>
                                <label style={{ "width": "90%" }}>{key.name}</label>
                                <label style={{ "width": "10%" }}><i class="bi bi-trash xdd" style={{ "cursor": "pointer" }} onClick={() => { handleDelete(key) }}></i></label>
                                </Col>
                                </Row>
                                )

                        ))}
                    </Col>

                    {orgForm ? (
                        <Col >
                            <Row className="newPersonForm">
                                <Col className="officeSinglePanel">
                                    <h1>Rejestracja nowej organizacji przestępczej</h1>
                                    <form style={{ "margin": "2rem" }}>
                                        <input
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            required
                                        /><p>Nazwa</p>
                                        <input
                                            type="text"
                                            name="color"
                                            onChange={handleChange}
                                            required
                                        />
                                        <p>Kolorystyka</p>
                                        <input
                                            type="text"
                                            name="dangerLevel"
                                            onChange={handleChange}
                                            required
                                            placeholder='1-5'
                                        /><p>Poziom zagrożenia</p>

                                        <input
                                            type="text"
                                            name="photo"
                                            onChange={handleChange}
                                        /><p>Zdjęcie</p>
                                        <p className="text-danger"></p>
                                        <input
                                            type="text"
                                            name="orgAreaPhoto"
                                            onChange={handleChange}
                                        /><p>Teren organizacji</p>
                                        <p className="text-danger"></p>
                                        <input type="submit" onClick={handleClick} value="Dodaj" />
                                    </form>
                                </Col>
                            </Row>
                        </Col>
                    ) : (
                        <Col style={{ "maxHeight": "100%" }}>
                            <SingleCrime actual={actualOrg} />
                        </Col>
                    )}

                </Row >
            </Container >
        </>
    )
}

export default Crime;
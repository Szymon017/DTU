import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CrimeData from '../../testdata/crime.json'
import SingleCrime from './SingleCrime';
import { Button } from 'react-bootstrap';
import Colors from '../../assets/Colors';
import { addNewCrimeOrg, getAllCrimeOrgs } from '../../Services/CrimesService';
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
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const result = await addNewCrimeOrg(newCrimeOrg)
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
                            <Row><Col className="singleCase" onClick={() => { setActualOrg(key) }}>{key.name}</Col></Row>
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

                </Row>
            </Container>
        </>
    )
}

export default Crime;
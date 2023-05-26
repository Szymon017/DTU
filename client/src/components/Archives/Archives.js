import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap";
import { getAllCases } from "../../Services/CasesService";
import { getAllCrimeOrgs } from "../../Services/CrimesService";
const Archives = () => {

    const [archivedCases, setArchivedCases] = useState();
    const [archivedOrgs, setArchivedOrgs] = useState();
    const [actualArchive, setActualArchive] = useState();

    const setCases = async () => {
        const result = await getAllCases({ archived: true })
        console.log(result);
        setArchivedCases(result.data.results)
    }

    const setCrimes = async () => {
        const result = await getAllCrimeOrgs({ archived: true })
        setArchivedOrgs(result.data.results)
        console.log(result);
    }

    const handleSetActualArchive = () => {

    }

    useEffect(() => {
        setCases();
        setCrimes();
    }, [])
    return (
        <>
            <Container className="defaultContainer" fluid>
                <Row className="archiveTable">
                    <Col>
                        <Row style={{ "height": "100%" }}>
                            <Col style={{ "border": "1px solid white", "height": "100%" }}>
                                <Row style={{"height":"100%"}}>
                                    <Col style={{"borderRight":"3px solid white", "minHeight":"100%"}}>
                                        <Row><Col className="archiveTableHeader">Śledztwa</Col></Row>

                                        {archivedCases?.map((key) => (
                                            <Row className="archiveTableSingle">
                                                <Col>{key.title}</Col>
                                            </Row>
                                        ))}
                                    </Col>
                                    <Col>
                                        <Row><Col className="archiveTableHeader">Organizacje</Col></Row>
                                        {archivedOrgs?.map((key) => (
                                            <Row className="archiveTableSingle">
                                                <Col>{key.name}</Col>
                                            </Row>
                                        ))}
                                    </Col>
                                </Row>
                            </Col>
                            <Col style={{ "border": "1px solid white" }}>x
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Archives;
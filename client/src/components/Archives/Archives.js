import React, { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllCases } from "../../Services/CasesService";
import { getAllCrimeOrgs } from "../../Services/CrimesService";

const Archives = () => {

    const [archivedCases, setArchivedCases] = useState();
    const [archivedOrgs, setArchivedOrgs] = useState();
    const [actualArchive, setActualArchive] = useState();
    const [viewType, setViewType] = useState();
    const setCases = async () => {
        const result = await getAllCases({ archived: true })
        setArchivedCases(result.data.results)
    }

  
    const setCrimes = async () => {
        const result = await getAllCrimeOrgs({ archived: true })
        setArchivedOrgs(result.data.results)
    }

    const handleSetActualArchive = (element) => {
        setActualArchive(element)
    }

    const handleSetViewType = (type) => {
        setViewType(type);
    }

    useEffect(() => {
        setCases();
        setCrimes();
    }, [])
    return (
        <>
            <Container className="defaultContainer" fluid>
                <Row className="archiveTable">
                    <Col style={{ "height": "100%" }}>
                        <Row style={{ "height": "100%" }}>
                            <Col style={{ "border": "3px solid #1c2130", "height": "100%" }}>
                                <Row style={{ "height": "100%" }}>
                                    <Col style={{ "height": "100%" }}>
                                        <Row><Col className="archiveTableHeader">Śledztwa</Col></Row>
                                        <Row style={{ "height": "100%" }}>
                                            <Col className="achiveTableBody">
                                                {archivedCases?.map((key) => (
                                                    <Row className="archiveTableSingle">
                                                        <Col onClick={() => { setViewType("case"); handleSetActualArchive(key) }}>{key.title}</Col>
                                                    </Row>
                                                ))}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col style={{ "height": "100%" }}>
                                        <Row><Col className="archiveTableHeader">Organizacje</Col></Row>
                                        <Row style={{ "height": "100%" }}>
                                            <Col className="achiveTableBody">

                                                {archivedOrgs?.map((key) => (
                                                    <Row className="archiveTableSingle">
                                                        <Col onClick={() => { setViewType("org"); handleSetActualArchive(key) }}>{key.name}</Col>
                                                    </Row>
                                                ))}
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Archives;
import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
const ConfirmModal = ({isShown, onConfirm}) => {
    
    const handleConfirm = () => {
        onConfirm(true);
    }

    const handleRefuse = () => {
        onConfirm(false);
    }
    return(
        <Modal show={isShown} className="addNewNote">
                    <Modal.Body>
                        <h5>Czy na pewno chcesz usunąć?</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleRefuse}>
                            Anuluj
                        </Button>
                        <Button variant="warning" onClick={handleConfirm}>
                            Potwierdź
                        </Button>
                    </Modal.Footer>
                </Modal>
    )
}

export default ConfirmModal;
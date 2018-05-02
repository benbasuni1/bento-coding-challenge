import React from 'react';
import { Image, Modal } from 'react-bootstrap';

const CatModal = props => (
    <Modal className="modal-background" show={props.show} onHide={() => props.closeModal()}>
        <Modal.Body>
            <Image className="cat-image-modal" width="70%" src={props.image} circle />
        </Modal.Body>
        <Modal.Footer>
            <Modal.Title align="center">{props.description}</Modal.Title>
        </Modal.Footer>
    </Modal>
)

export default CatModal;

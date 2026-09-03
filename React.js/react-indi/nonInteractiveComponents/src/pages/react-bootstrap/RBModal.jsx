import React, { useState } from "react";
import { Button, CloseButton, Form, InputGroup, Modal } from "react-bootstrap";
import { Envelope, Mailbox } from "react-bootstrap-icons";
// import { Form } from "react-router-dom";

const RBModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <h1>Exercise of Modal</h1>
      <br />

      <Button variant="primary" onClick={handleShow}>
        <Envelope/> Subscribe
      </Button>

      <Modal show={show} onHide={handleClose} centered>

        <Modal.Body>
          <Modal.Title>
            <div className="d-flex justify-content-between">
                <span>Don't miss out </span>
            <CloseButton onClick={handleClose} style={{ width: "10px", height: "10px" }}/>
            </div>
            </Modal.Title>
            <hr />
            Signup for our newsletter to stay update.
            <br />
            <br />
            <InputGroup>
                <Form.Control
                type="email"
                placeholder="Enter your email address"
                />
                <Button variant="outline-secondary">Subscribe</Button>
            </InputGroup>
        </Modal.Body>

      </Modal>
    </div>
  );
};

export default RBModal;
import React from "react";
import { Modal } from "react-bootstrap";

export default function ModalComponent({
  show,
  setShow,
  title,
  children,
  action,
}) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>{action}</Modal.Footer>
      </Modal>
    </>
  );
}

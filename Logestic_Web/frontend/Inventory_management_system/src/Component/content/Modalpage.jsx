import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
import { useState } from "react";

/**
 * ModalPage component provides a form in a modal for adding new inventory items.
 * It captures user input for item details and submits them to the server.
 * 
 * @param {Object} props - Properties passed to the component include:
 *   - show: Boolean to control the visibility of the modal.
 *   - handleClose: Function to close the modal.
 *   - loadMessages: Function to reload the item list after successful submission.
 */
function ModalPage(props) {
    // State hooks to manage form inputs
    const [itemName, setItemName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [threshold, setThreshold] = useState('')

    // Function to reset form fields
    function initialize() {
        setItemName('')
        setDescription('')
        setCategory('')
        setThreshold('')
    }

    // Function to handle form submission
    async function handleCommit() {
        const res = await fetch("http://localhost:8080/add-item", {
            "method": "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemName: itemName,
                description: description,
                category: category,
                threshold: parseInt(threshold, 10)
            })
        })
        if (res.status === 200) {
            alert("Commit Successfully!!")
            props.loadMessages()
            props.handleClose()
            initialize()
        }
        else {
            alert("There is something wrong with the commit, try again later!")
            return
        }
    }

    // Render the component
    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Threshold</Form.Label>
                            <Form.Control
                                type="number"
                                value={threshold}
                                onChange={(e) => setThreshold(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCommit}>Submit</Button>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )

}
export default ModalPage // Export the component for use in other parts of the application.
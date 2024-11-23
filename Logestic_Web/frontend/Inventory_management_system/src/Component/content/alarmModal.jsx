import { Modal, Button, Form } from "react-bootstrap";
import React from "react";
import { useState } from "react";

/**
 * AlarmModalPage is a React component that displays a modal dialog to set a threshold value for an alarm.
 * It uses the 'react-bootstrap' library to provide a user-friendly interface with form controls.
 * The component accepts props for controlling its visibility and handling interactions.
 *
 * @param {Object} props - Contains properties passed down from the parent component, including:
 *   - showalarmModal: Boolean to control the visibility of the modal.
 *   - handleClose: Function to call when the modal needs to be closed.
 *   - handleAlarmChange: Function to handle changes to the alarm threshold value.
 */

function AlarmModalPage(props) {
    // State variable 'alarm' to hold the threshold value for the alarm.
    const [alarm, setalarm] = useState()

    // Function 'handleCommit' to process the submission of the threshold value.
    function handlecommit() {
        props.handleAlarmChange(alarm) // Pass the new alarm threshold value to the parent component.
        props.handleClose() // Close the modal dialog.

    }

    // Render the component
    return (
        <div>
            <Modal
                show={props.showalarmModal}  // Control visibility of the modal based on prop.
                onHide={props.handleClose}  // Function to call when hiding the modal.
                backdrop="static"  // Disable clicking on the backdrop to close the modal.
                keyboard={false}  // Disable closing the modal with the keyboard.

            >
                <Modal.Header closeButton>
                    <Modal.Title>Set Lower Threshold Alarm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Set the threshold trigger the alarm</Form.Label>
                            <Form.Control
                                type="number" // Input type set to 'number' for numeric values.
                                value={alarm}  // Controlled component with state.
                                onChange={(e) => setalarm(e.target.value)}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handlecommit}>Submit</Button>
                    <Button variant="secondary" onClick={props.handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )

}
export default AlarmModalPage
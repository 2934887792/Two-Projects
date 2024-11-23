import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import MessageForm from "./messageForm"; // Component for displaying messages
import ModalPage from "./Modalpage";    // Modal component for adding items
import AlarmModalPage from "./alarmModal";  // Modal component for setting alarm thresholds

// Functional component for displaying stock details and managing visibility of those details.
export default function StockDetails(props) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // States for controlling the visibility of different attributes of stock items
    const [showCategory, setShowCategory] = useState(true);
    const [showDescription, setShowDescription] = useState(true);
    const [showId, setShowId] = useState(true);
    const [showThreshold, setShowThreshold] = useState(true)

    // States for modal visibility control
    const [show, setShow] = useState(false)
    const [showalarmModal, setShowAlarmModal] = useState(false)
    const [alarm, setalarm] = useState('')
    const [search, setSearch] = useState('')
    const alarmnumber = JSON.parse(sessionStorage.getItem('alarmThreshold'))

    // Function to fetch stock items from a server
    const loadMessages = () => {
        fetch("http://localhost:8080/get-all-items", {
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(json => {
                setMessages(json);
                setIsLoading(false);
                console.log(json)

            })
            .catch(error => {
                console.error("Error loading messages:", error);
                setIsLoading(false);
            });
    };

    // Function to close modals
    function handleClose() {
        setShow(false)
        setShowAlarmModal(false)
    }

    // Function to update the alarm threshold
    function handleAlarmChange(newAlarm) {
        setalarm(newAlarm)
        sessionStorage.setItem('alarmThreshold', newAlarm)
    }

    // useEffect hook to load messages on component mount
    useEffect(() => {
        loadMessages();
    }, []);

    // Component rendering
    return (
        <Container>
            <h1>Stock Details</h1>
            <h2>Adjust visibility of stock details:</h2>

            <Form>
                <div key={`inline-checkbox`} className="mb-3">
                    {/* Checkbox inputs to toggle visibility of stock item details */}
                    <Form.Check
                        inline
                        label="Show Category"
                        type="checkbox"
                        id={`inline-checkbox-1`}
                        checked={showCategory}
                        onChange={(e) => setShowCategory(e.target.checked)}
                    />
                    <Form.Check
                        inline
                        label="Show Description"
                        type="checkbox"
                        id={`inline-checkbox-2`}
                        checked={showDescription}
                        onChange={(e) => setShowDescription(e.target.checked)}
                    />
                    <Form.Check
                        inline
                        label="Show ID"
                        type="checkbox"
                        id={`inline-checkbox-3`}
                        checked={showId}
                        onChange={(e) => setShowId(e.target.checked)}
                    />
                    <Form.Check
                        inline
                        label="Show threshold"
                        type="checkbox"
                        id={`inline-checkbox-3`}
                        checked={showThreshold}
                        onChange={(e) => setShowThreshold(e.target.checked)}
                    />
                </div>
            </Form>
            <hr />
            {/* Buttons to show modals for adding items and setting alarms */}
            <Button variant="success" onClick={() => setShow(true)}>Add Item</Button>
            <Button style={{ marginLeft: 20 }} variant="primary" onClick={() => setShowAlarmModal(true)}>Set lower threshold alarm</Button>
            <span style={{ marginLeft: 20, verticalAlign: 'middle' }}>
                {`The alarm threshold is: ${alarmnumber}`}
            </span>
            <div style={{ display: 'flex' }}>
                <Form.Control
                    style={{ marginTop: 15, width: '40%' }}
                    placeholder="search by itemId/itemName/threshold"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Modal components for adding items and setting alarms */}
            <ModalPage
                show={show}
                handleClose={handleClose}
                loadMessages={loadMessages}

            />
            <AlarmModalPage
                showalarmModal={showalarmModal}
                handleClose={handleClose}
                handleAlarmChange={handleAlarmChange}
            />
            <hr />
            {/* Conditional rendering based on loading status and content availability */}
            {isLoading ? (
                <p>Loading messages...</p>
            ) : (
                messages && messages.length > 0 ? (
                    <div>
                        {/* Component to display messages with visibility toggles */}
                        <MessageForm
                            messages={messages}
                            showCategory={showCategory}
                            showDescription={showDescription}
                            showId={showId}
                            showThreshold={showThreshold}
                            loadMessages={loadMessages}
                            alarmnumber={alarmnumber}
                            search={search}
                        />

                    </div>

                ) : (
                    <p>Nothing content on this page.</p>
                )
            )}

        </Container>
    );
}

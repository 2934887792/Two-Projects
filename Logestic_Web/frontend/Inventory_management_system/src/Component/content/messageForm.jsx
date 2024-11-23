import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";

/**
 * MessageForm component displays a table of messages (inventory items) with the ability to delete items.
 * It allows users to filter messages based on a search query and manage items if logged in.
 * @param {Object} props - Contains properties and functions passed down from the parent component:
 *  - messages: Array of message objects to display.
 *  - loadMessages: Function to reload messages after an operation.
 *  - search: Search term used to filter messages.
 *  - showId, showCategory, showDescription, showThreshold: Boolean flags to control visibility of columns.
 *  - alarmnumber: Threshold number to flag items with low quantity.
 */
function MessageForm(props) {
    const isLoggedIn = JSON.parse(sessionStorage.getItem('islogin'));
    const messages = props.messages

    // Function to handle deletion of an item by its ID.
    async function handleDelete(itemID) {
        const res = await fetch("http://localhost:8080/delete-item/by-id", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemId: itemID
            })
        })
        if (res.status === 200) {
            alert("Delete Successfully!!!")
            props.loadMessages()
        }
        else {
            alert("There is something wrong with the delete!")
            return
        }


    }

    /**
   * filterMessages filters the messages based on the search term.
   * @param {Array} messages - The original list of messages.
   * @returns Array of messages that match the search criteria.
   */
    const filterMessages = (messages) => {
        if (!props.search.trim()) return messages;
        const searchLower = props.search.toLowerCase();

        return messages.filter((message) => {

            return (
                message.itemName.toLowerCase().includes(searchLower) ||
                message.itemId.toString().toLowerCase().includes(searchLower) ||
                (message.threshold && message.threshold.toString().toLowerCase().includes(searchLower))
            );
        });
    };
    const filterMessage = filterMessages(messages) // Apply the search filter.
    // Render the component as a table with conditional columns and actions.
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {props.showId && <th>ID</th>}
                    <th>Item name</th>
                    {props.showCategory && <th>Category</th>}
                    {props.showDescription && <th>Description</th>}
                    {props.showThreshold && <th>Threshold</th>}
                    {isLoggedIn && <th>Actions</th>}
                    {<th>Low quantity flag</th>}
                </tr>
            </thead>
            <tbody>
                {filterMessage.map((message) => (

                    <tr key={message.itemId}>
                        {props.showId && <td>{message.itemId}</td>}
                        <td>{message.itemName}</td>
                        {props.showCategory && <td>{message.category}</td>}
                        {props.showDescription && <td>{message.description}</td>}
                        {props.showThreshold && <td>{message.threshold}</td>}

                        {isLoggedIn && (
                            <td>
                                <Button variant="primary" style={{ marginRight: '10px' }}>Modify</Button>
                                <Button variant="danger" onClick={() => handleDelete(message.itemId)}>Delete</Button>
                            </td>
                        )}
                        {message.threshold < props.alarmnumber ? <td>*</td> : ''}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default MessageForm;

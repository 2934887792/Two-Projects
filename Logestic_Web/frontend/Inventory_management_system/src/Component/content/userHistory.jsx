// Importing necessary hooks from React, components from React-Bootstrap, and other utilities.
import React, { useContext, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import StatusContext from "../contexts/StatusContext";
import squirrel from "../../assets/squirrel.png";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// UserHistory functional component accepts props
export default function UserHistory(props) {
    // Using context to track and set login status
    const [loginStatus, setLoginStatus] = useContext(StatusContext);

    // Style object for clickable items
    const clickableStyle = {
        backgroundColor: 'lightblue',
        cursor: 'pointer'
    };

    // State for user information and login status
    const [user, setUser] = useState({ username: 'sprint3', id: '113114' });

    // State for managing date range for history querying
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    // State to toggle visibility of the date picker
    const [showDatePicker, setShowDatePicker] = useState(false);

    // State for storing and displaying history entries
    const [historyEntries, setHistoryEntries] = useState({
        today: [],
        lastWeek: [],
        thisMonth: [],
        past90Days: []
    });

    // State for currently selected filter
    const [selectedFilter, setSelectedFilter] = useState('today'); // State for currently selected filter

    // Date calculations for filtering history entries
    const today = new Date();
    const lastWeek = new Date(new Date().setDate(today.getDate() - 7));
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const past90Days = new Date(new Date().setDate(today.getDate() - 90));

    // Effect hook to fetch history data from a server on component mount
    useEffect(() => {
        async function fetchHistory() {
            const response = await fetch("http://localhost:8080/audit/get-all", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data[0].timestamp)
            processHistoryData(data);
        }
        fetchHistory();
    }, []);

    // Function to process raw history data into categorized data based on time filters
    function processHistoryData(data) {
        const formattedData = {
            today: [],
            lastWeek: [],
            thisMonth: [],
            past90Days: []
        };

        data.forEach(item => {
            const entryDate = new Date(item.timestamp.split('T')[0]); // Get only the date part
            if (entryDate >= today) {
                formattedData.today.push(item);
            }
            if (entryDate >= lastWeek && entryDate < today) {
                formattedData.lastWeek.push(item);
            }
            if (entryDate >= thisMonthStart && entryDate < today) {
                formattedData.thisMonth.push(item);
            }
            if (entryDate >= past90Days && entryDate < today) {
                formattedData.past90Days.push(item);
            }
        });

        setHistoryEntries(formattedData);
    }

    // Function to set selected filter
    const filterHistory = (filter) => {
        setSelectedFilter(filter);
    };

    // Toggle date picker visibility
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    // Selecting the display entries based on selected filter
    const displayEntries = historyEntries[selectedFilter] || [];

    // Component rendering
    return (
        <div className="user-history-layout">
            <>
                <style type="text/css">
                    {`
                        .user-history-layout {
                            display: flex;
                            align-items: start;
                        }
                        .profile-sidebar {
                            flex: 0 0 18rem; 
                            margin-right: 2rem; 
                        }
                        .history-content {
                            flex-grow: 1; /* takes the remaining width */
                        }
                        @media (max-width: 768px) {
                            .user-history-layout {
                                flex-direction: column;
                            }
                            .profile-sidebar, .history-content {
                                flex: none;
                                margin-right: 0;
                            }
                        }
                    `}
                </style>
                <aside className="profile-sidebar">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={squirrel} />
                        <Card.Body>
                            <Card.Title>User name: {user.username}</Card.Title>
                            <Card.Text>User id: {user.id}</Card.Text>
                        </Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Filters:</ListGroup.Item>
                            <ListGroup.Item style={clickableStyle} onClick={() => filterHistory('today')}>Today</ListGroup.Item>
                            <ListGroup.Item style={clickableStyle} onClick={() => filterHistory('lastWeek')}>Last Week</ListGroup.Item>
                            <ListGroup.Item style={clickableStyle} onClick={() => filterHistory('thisMonth')}>This Month</ListGroup.Item>
                            <ListGroup.Item style={clickableStyle} onClick={() => filterHistory('past90Days')}>Past 90 Days</ListGroup.Item>
                            <ListGroup.Item style={clickableStyle} onClick={toggleDatePicker}>Select Specific Range</ListGroup.Item>
                            {showDatePicker && (
                                <DatePicker
                                    selected={startDate}
                                    onChange={(update) => setDateRange(update)}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    isClearable={true}
                                    className="form-control"
                                />
                            )}
                        </ListGroup>
                    </Card>
                </aside>
                <main className="history-content">
                    <h1>User History</h1>
                    <h2>
                        {selectedFilter === 'today' ? 'Today' :
                            selectedFilter === 'thisMonth' ? 'This Month' :
                                selectedFilter === 'lastWeek' ? 'Last Week' :
                                    'Past 90 Days'}
                    </h2>
                    {displayEntries.map(entry => (
                        <section key={entry.userId}>
                            <p>userId:{entry.user.userId} {entry.actionType} at {new Date(entry.timestamp).toLocaleString()}</p>
                        </section>
                    ))}
                </main>
            </>
        </div>
    );
}

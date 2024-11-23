import React, { useState, useEffect } from 'react';
import { Form, Button, FormControl, InputGroup, DropdownButton, Dropdown, Table } from 'react-bootstrap';

// Functional component to track shipment details.
function TrackShipment() {
    // State hooks to manage various aspects of the shipment tracking.
    const [shipmentDetail, setShipmentDetail] = useState([]); // Holds the list of all shipments.
    const [filterShipmentDetail, setFilterShipmentDetail] = useState([]); // Holds the filtered list of shipments.
    const [searchTerm, setSearchTerm] = useState(''); // Holds the current search term.
    const [selectedType, setSelectedType] = useState(''); // Holds the selected shipment type filter.
    const [filtersEnabled, setFiltersEnabled] = useState(true);  // Controls the availability of filter inputs.
    const [removeid, setRemoveid] = useState() // Holds the ID for a shipment to be removed.

    // Fetches shipment details from a local server.
    async function getShipmentDetail() {
        const res = await fetch("http://localhost:8080/shipment/get-all", {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setShipmentDetail(data);
        setFilterShipmentDetail(data);
    }

    // Effect hook to load shipment details on component mount.
    useEffect(() => {
        getShipmentDetail();
    }, []);

    function handleSearch() {
        const filteredData = shipmentDetail.filter(shipment =>
            (shipment.shipmentId.toString().includes(searchTerm)) &&
            (selectedType ? shipment.shipmentType === selectedType : true)
        );
        setFilterShipmentDetail(filteredData);
    }

    // Updates the search term state and filters based on the input.
    function handleSearchTermChange(event) {
        const value = event.target.value;
        setSearchTerm(value);
        setFiltersEnabled(value.length === 0);
    }

    // Updates the selected shipment type for filtering.
    function handleTypeChange(type) {
        setSelectedType(type);
    }

    // Clears all filters and resets the filtered data to all shipments.
    function handleClearFilters() {
        setSearchTerm('');
        setSelectedType('');
        setFilterShipmentDetail(shipmentDetail);
        setFiltersEnabled(true);
    }

    // Handles the removal of a shipment by ID.
    async function handleRemove() {
        const res = await fetch("http://localhost:8080/shipment/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shipmentId: removeid
            })

        })
        if (res.status === 200) {
            alert("Remove Successfully!")
        } else {
            alert("Unable to remove, try again later.")
            return
        }
        getShipmentDetail() // Refresh the shipment details after removal.
    }

    // Render the component UI using forms, input groups, and tables from React-Bootstrap.
    return (
        <div>
            <Form style={{ marginTop: 15, marginLeft: 10 }}>
                <InputGroup className="mb-3">
                    <div style={{ width: '40%' }}>
                        <FormControl
                            placeholder="Search by Shipment ID"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />

                    </div>

                    <DropdownButton
                        as={InputGroup.Append}
                        variant="outline-secondary"
                        title="Shipment Type"
                        id="input-group-dropdown-1"
                        disabled={!filtersEnabled}
                    >
                        <Dropdown.Item onClick={() => handleTypeChange('INGOING')}>INGOING</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleTypeChange('OUTGOING')}>OUTGOING</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="outline-secondary" onClick={handleSearch}>
                        Search
                    </Button>

                </InputGroup>
            </Form>
            <hr />
            <Button variant="outline-danger" onClick={handleClearFilters} style={{ marginLeft: '10px' }}>
                Clear Filters
            </Button>
            <hr />
            <Form>
                <InputGroup>
                    <Form.Control
                        placeholder='remove by shipment id'
                        value={removeid}
                        onChange={e => setRemoveid(e.target.value)}

                    />
                    <Button
                        variant='outline-danger'
                        onClick={handleRemove}

                    >
                        Remove
                    </Button>

                </InputGroup>
            </Form>
            <Table striped bordered hover size="sm" className="mt-4">
                <thead>
                    <tr>
                        <th>Shipment ID</th>
                        <th>Shipment Type</th>
                        <th>Destination</th>
                        <th>Ship Date</th>
                        <th>Arrival Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filterShipmentDetail.map((shipment, index) => (
                        <tr key={index}>
                            <td>{shipment.shipmentId}</td>
                            <td>{shipment.shipmentType}</td>
                            <td>{shipment.sourceFacility?.address?.country || 'N/A'}</td>
                            <td>{shipment.shipDate}</td>
                            <td>{shipment.arrivalDate || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TrackShipment;

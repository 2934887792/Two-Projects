import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Outlet } from 'react-router-dom'
import squirrel from "../../assets/squirrel.png"
import StatusContext from '../contexts/StatusContext';
import { useState } from 'react';

/**
 * Layout component serves as the main layout wrapper for the app, providing a consistent navigation bar
 * across different pages and managing login state with contextual links.
 */
function Layout() {
    // Determine initial login status from sessionStorage or default to false.
    const Status = JSON.parse(sessionStorage.getItem('islogin')) || false
    const [loginStatus, setloginStatus] = useState(Status)

    /**
    * Renders navigation links based on the login status.
    * @param {Event} e - The event object, if provided, to prevent the default action.
    */
    function changeStatus(e) {
        e?.preventDefault // Ensure default action is not taken if event is provided.

        // Conditional rendering based on login status.
        if (loginStatus === false) {
            return (
                <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
            )
        } else {
            return (

                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>


            )
        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="Inventory Logo"
                            src={squirrel}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Inventory Management System
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {changeStatus()}

                        <NavDropdown title="Functions">
                            {
                                <>
                                    <NavDropdown.Item as={Link} to='/shipment' >Shipment Tracking</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/details'>Stock Detail</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to='/history'>User History</NavDropdown.Item>
                                </>
                            }
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div>
                {/* Context provider to manage login status throughout the app */}
                <StatusContext.Provider value={[loginStatus, setloginStatus]}>
                    <Outlet />
                </StatusContext.Provider>

            </div>


        </div>

    );
}

export default Layout
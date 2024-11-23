import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importing all the necessary components for different routes.
import Layout from "./Layout";
import Login from "../auth/login";
import HomePage from "../content/homePage";
import Register from "../auth/register";
import TrackShipment from "../content/TrackShipment";
import Logout from "../auth/logout";
import StockDetails from "../content/stockDetails";
import UserHistory from "../content/userHistory";

/**
 * AppRoute sets up the router for the application using BrowserRouter and Routes.
 * It defines the layout and navigation structure for various paths.
 */
function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route configuration with Layout as the wrapper component for nested routes. */}
                <Route path="/" element={<Layout />}>
                    {/* Default route or 'index' that renders HomePage component. */}
                    <Route index element={<HomePage />} />
                    {/* Route for login page */}
                    <Route path="/login" element={<Login />} />
                    {/* Route for registration page */}
                    <Route path="/register" element={<Register />} />
                    {/* Route for tracking shipments */}
                    <Route path="/shipment" element={<TrackShipment />} />
                    {/* Route for logout functionality */}
                    <Route path="/logout" element={<Logout />} />
                    {/* Route for stock details view */}
                    <Route path="/details" element={<StockDetails />} />
                    {/* Route for user history page */}
                    <Route path="/history" element={<UserHistory />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoute;

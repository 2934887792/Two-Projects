import React, { memo } from "react";

/**
 * HomePage is a functional React component that renders the landing page of the Inventory Management System.
 * It is wrapped with React.memo to optimize performance by memorizing the component output and 
 * avoiding unnecessary re-renders if props and state have not changed.
 * This page provides introductory information about the system and usage guidelines.
 */


function HomePage() {
    // Render the homepage content

    return (
        <div className="content_padding">
            <h1>Welcome to Inventory Management System!</h1>
            <p>It is a very powerful tool to manage your inventory.</p>
            <p>Please be mindful that you cannot modify information unless you logged in.</p>
            <p>Click on a link to get started.</p>

        </div>
    )

}

export default memo(HomePage)  // Export the HomePage component with React.memo for performance optimization
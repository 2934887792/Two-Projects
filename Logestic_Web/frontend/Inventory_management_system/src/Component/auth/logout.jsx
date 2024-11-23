/**
 * This function is the logout the webpage
 * through change the login status state variable.
 */

// Import necessary hooks and context from React.
import { React, useContext, useEffect } from "react"
import StatusContext from "../contexts/StatusContext"  // Import the context to manage login status.
function Logout() {   // Destructure and retrieve the current login status and the function to set login status
    // from the StatusContext using the useContext hook.
    const [loginStatus, setLoginStatus] = useContext(StatusContext)
    // useEffect hook to perform side effects. In this case, it handles the logout logic.
    useEffect(() => {
        setLoginStatus(false)
        sessionStorage.setItem('islogin', false) // Update session storage to reflect the logout status.
    }, [])

    // Render the Logout component displaying a message.
    return (
        <div className="content_padding">
            <h1>Logout</h1>
            <p>You have been successfully logged out.</p>
        </div>
    )

}

export default Logout
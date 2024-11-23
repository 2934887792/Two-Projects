import { React, useRef, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import StatusContext from "../contexts/StatusContext"
import { useNavigate } from "react-router-dom"

/**
 * This function is basically get 
 * the username and password as user input
 * then it will sent to the API to process the
 * the authentication. If the user input can pass
 * the authentication, user can login to the website 
 * successfully.
 * 
 */

function Login() {
    // References for the username and password input fields
    const UsernameRef = useRef()
    const PasswordRef = useRef()
    // Context for accessing and updating the login status
    const [loginStatus, setloginStatus] = useContext(StatusContext)
    // Hook to navigate to different routes
    const navigate = useNavigate()
    // Handler for the login form submission
    function handleLogin(e) {
        e?.preventDefault() // Prevents the default form submission behavior
        // Check for empty inputs and alert if either field is empty
        if (!UsernameRef.current.value || !PasswordRef.current.value) {
            alert("You must provide both a username and password!")
        }

        // Send a POST request to the authentication endpoint with username and password
        fetch('http://localhost:8080/authenticate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: UsernameRef.current.value,
                password: PasswordRef.current.value
            })
        })
            .then(res => {
                if (res.status === 200) {
                    // Update session storage and context state on successful login
                    sessionStorage.setItem('islogin', true)
                    setloginStatus(true)
                    navigate("/")// Navigate to the homepage
                }
                else {
                    alert("Your input is invalid!") // Alert on unsuccessful login
                }
            })
    }

    // Render the login form
    return (
        <div className="content_padding">
            <h1>Login</h1>
            <Form className="short_input">
                <Form.Label htmlFor="UsernameInput">Username</Form.Label>
                <Form.Control id="UsernameInput" type="username" ref={UsernameRef}></Form.Control>
                <Form.Label htmlFor="PasswordInput">Password</Form.Label>
                <Form.Control id="PasswordInput" type="password" ref={PasswordRef}></Form.Control>
                <br />
                <Button type="submit" onClick={handleLogin}>Login</Button>
            </Form>

        </div>
    )

}
export default Login
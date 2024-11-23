import { React, useRef, useContext } from "react"
import { Button, Form } from "react-bootstrap"
import StatusContext from "../contexts/StatusContext"
import { useNavigate } from "react-router-dom"

/** 
 * The register function is get the username, password and email as input
 * then the code will do a post request to the API, after the API got the
 * user input and see the post API, the API should store the user input into the 
 * database automatically.
 * 
 * After the API got the user input data, it should send a sign back(the sign should be a number
 *  such as 200 means the operation is successfully, 400 means there is something wrong with the 
 *  processing the data. etc.)
 * after frontend got the sign send back from the API, We can decide whether the user has successfully
 * registered an account and let the user login to the web page.
*/


function Register() {
    // References for form inputs
    const emailRef = useRef()
    const userNameRef = useRef()
    const passwordRef = useRef()
    const repeatPassRef = useRef()

    // Context for managing login status
    const [loginStatus, setloginStatus] = useContext(StatusContext)

    // Hook for navigating programmatically
    const navigate = useNavigate()

    // Handler for form submission
    function handleRegiser(e) {

        e?.preventDefault()
        // Validate necessary fields
        if (!userNameRef.current.value || !passwordRef.current.value) {
            alert("You must provide both a username and password!")
            return
        }
        // Check if passwords match
        if (passwordRef.current.value !== repeatPassRef.current.value) {
            alert("Your passwords do not match!")
            return
        }
        // Send POST request to server with form data
        fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                confirmPassword: repeatPassRef.current.value
            })


        })
            .then(res => {
                if (res.status === 200) {
                    alert("register successfully")
                    sessionStorage.setItem('islogin', true)// Update session storage
                    setloginStatus(true)

                    navigate('/')// Navigate to homepage
                    res.json()
                }
                else {
                    alert("That username has already been taken or email are invalid!")

                }

            })


    }
    // Render the registration form
    return (
        <div className="content_padding">
            <h1>Register</h1>
            <Form className="short_input">
                <Form.Label htmlFor="emailinput">E-mail</Form.Label>
                <Form.Control id="emailinput" ref={emailRef}></Form.Control>
                <Form.Label htmlFor='UsernameInput'>Username</Form.Label>
                <Form.Control id='UsernameInput' ref={userNameRef}></Form.Control>
                <Form.Label htmlFor='PasswordInput'>Password</Form.Label>
                <Form.Control id='PasswordInput' type='password' ref={passwordRef}></Form.Control>
                <Form.Label htmlFor='PasswordRepeat'>Repeat Password</Form.Label>
                <Form.Control id='PasswordRepeat' type='password' ref={repeatPassRef}></Form.Control>
                <br />
                <Button onClick={handleRegiser}>Register</Button>



            </Form>


        </div>
    )
}

export default Register
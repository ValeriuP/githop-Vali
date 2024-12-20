// import { useState } from 'react'
import Login from "../login/Login";
import Register from "../register/Register";

function Auth() {
	return (
		<>
			{/* <h1>Login</h1> */}
			<Login></Login>
			<h1>Register</h1>
			<Register></Register>
			{/* <Homepage></Homepage> */}
		</>
	);
}

export default Auth;

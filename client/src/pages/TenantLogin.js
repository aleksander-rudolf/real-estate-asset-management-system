import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";

function TenantLogin() {
	const [sin, setSin] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const login = () => {
		Axios.post("http://localhost:3001/api/tenant-login", {
			sin: sin,
			password: password,
		}).then((response) => {
			if (response.data.message) {
				setLoginStatus(false);
				setStatusMessage("Invalid login credentials");
			} else {
				console.log(response.data);
				setLoginStatus(true);
				setStatusMessage("Login Successful");
			}
		});
	};

	if(loginStatus){
		return <Navigate to={`/tenant/home/${sin}`} />
	}

	return(
		<div className="tenantLogin">
			<div 
				className="Login"
				style={{
					margin: "auto",
					padding: "15px",
					maxWidth: "400px",
					alignContent: "center",
					}}>
				<h1>Tenant Login</h1>
				<label>SIN</label>
				<input
					type="text"
					onChange={(e) => {
						setSin(e.target.value);
					}}
				></input>
				<label>Password</label>
				<input

					type="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				></input>
				<button class="btn dash-btn-login" onClick={login}>Login</button>
				<h3>{statusMessage}</h3>
			</div>
		</div>
	);
}

export default TenantLogin;

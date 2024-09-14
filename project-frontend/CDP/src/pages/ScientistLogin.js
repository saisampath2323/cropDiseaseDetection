// src/pages/ScientistLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling
import Cookies from 'js-cookie'
const ScientistLogin = ({ setUserType }) => {
  
 

  
    let tokenscientist=null;
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const  data={
            
      email:`${email}`,
      password:`${password}`
     }
     console.log(JSON.stringify(data));
     const res = await fetch("http://localhost:3002/scientist/login", {
method: "POST",
body: JSON.stringify(data),
headers: {
  "Content-Type": "application/json",
}
});

if (res.ok) {
const responseData = await res.json();
tokenscientist = responseData.token;
console.log(tokenscientist);
Cookies.set("tokenscientist", responseData.token);
  
console.log(Cookies.get("tokenscientist"));

navigate('/sd');

} else {
console.error("Error:", res.status, res.statusText);
}
    
    
  };
  

  return (
    <div className="login-container">
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleLogin}>
              <h2>Scientist Login</h2>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
                <label>Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              
              <button type="submit">Log In</button>
              <div className="register">
                <p>Don't have an account? <a href="#">Sign Up</a></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScientistLogin;

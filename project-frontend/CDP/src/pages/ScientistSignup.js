import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styling
const ScientistSignup = ({ setUserType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [qualification, setQualification] = useState('');
    const [department, setDepartment] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        // Replace with your login API for scientists
        const response = await axios.post('/api/scientist-login', {
          email,
          password,
          name,
          qualification,
          department,
          phoneNumber,
        });
  
        if (response.data.success) {
          setUserType('scientist');
          navigate('/upload-research'); // Adjust the path if needed
        }
      } catch (error) {
        console.error('Error during login', error);
      }
    };
  
    return (
      <div className="login-container">
        <section>
          <div className="form-box">
            <div className="form-value">
              <form onSubmit={handleLogin}>
                <h2> Scientist Sign Up</h2>
                {/* Name Input */}
                <div  className="inputbox">
                  <ion-icon name="person-outline"></ion-icon>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label>Name</label>
                </div>
  
                {/* Qualification Input */}
                <div className="inputbox">
                  <ion-icon name="school-outline"></ion-icon>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required
                  />
                  <label>Qualification</label>
                </div>
  
                {/* Department Input */}
                <div className="inputbox">
                  <ion-icon name="business-outline"></ion-icon>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  />
                  <label>Department</label>
                </div>
  
                {/* Phone Number Input */}
                <div className="inputbox">
                  <ion-icon name="call-outline"></ion-icon>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <label>Phone Number</label>
                </div>
  
                {/* Email Input */}
                <div className="inputbox">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label>Email</label>
                </div>
  
                {/* Password Input */}
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
                 <br/>
                <button type="submit">Sign Up</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default ScientistSignup;
  
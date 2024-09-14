import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styling

const FarmerSignup = ({ setUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [landArea, setLandArea] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Replace with your login API for farmers
      const response = await axios.post('/api/farmer-login', {
        email,
        password,
        name,
        locality,
        landArea,
        phoneNumber,
      });
      if (response.data.success) {
        setUserType('farmer');
        navigate('/upload-image'); // Adjust the path if needed
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
              <h2>Farmer Sign Up</h2>

              {/* Name Input */}
              <div className="inputbox">
                <ion-icon name="person-outline"></ion-icon>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Name</label>
              </div>

              {/* Locality Input */}
              <div className="inputbox">
                <ion-icon name="location-outline"></ion-icon>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  required
                />
                <label>Locality</label>
              </div>

              {/* Land Area Input */}
              <div className="inputbox">
                <ion-icon name="analytics-outline"></ion-icon>
                <input
                  type="number"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  required
                />
                <label>Land Area (in acres)</label>
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

export default FarmerSignup;

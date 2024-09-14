import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import dashboardImage from '../assets/false-smut-in-rice.jpg'; // Background image
const FarmerDashboard = () => {
  const [diseaseDetected, setDiseaseDetected] = useState(false); // Example state
  const navigate = useNavigate();

  const handleDetectDisease = () => {
    navigate('/ui');
  };

  const handleViewTickets = () => {
    navigate('/tk');
  };
  const handleDiag = () => {
    navigate('/dd');
  };
  const handleLogout = () => {
    // Handle logout logic here (e.g., clear user data, redirect to login page)
    Cookies.remove('token');
    navigate('/'); // Example redirect to a login page
  };
 
  
  return (
    <div
      style={{
        backgroundImage: `url(${require('../assets/adrian.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Ensure that the container is positioned relatively
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '20px',
          width:'100px',
          right: '10px',
          fontFamily: 'Arial',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          padding: '0px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', // Optional shadow for better visibility
        }}
      >
        Log Out
      </button>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '40px',
          borderRadius: '10px',
          width: '400px',
          textAlign: 'center',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1 style={{ fontFamily: 'Arial', fontSize: '28px', marginBottom: '20px' }}>
          Farmer Dashboard
        </h1>
        <button
          onClick={handleDetectDisease}
          style={{
            fontFamily: 'Arial',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            marginTop: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Detect Disease
        </button>

        {!diseaseDetected && (
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleViewTickets}
              style={{
                fontFamily: 'Arial',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                marginTop: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              View Tickets
            </button>
            <button
              onClick={handleDiag}
              style={{
                fontFamily: 'Arial',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                marginTop: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
               Raise Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;

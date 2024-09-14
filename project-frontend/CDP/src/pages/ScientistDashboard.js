import React from 'react';
import { Button, Typography } from 'antd';
import dashboardImage from '../assets/false-smut-in-rice.jpg'; // Background image
import Cookies from 'js-cookie';
const { Title } = Typography;

const ScientistDashboard = () => {
  return (
    <div style={styles.container}>
      <div style={styles.textContainer}>
        <Title level={2}>Scientist Dashboard</Title>
        <Button type="primary" href="/vot" style={styles.button}>
          View Open Tickets
        </Button>
        {/* <Button onClick={Cookies.remove("tokenscientist")}>logout</Button> */}
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundImage: `url(${dashboardImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '40px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column', // Ensure buttons are stacked vertically
    alignItems: 'center', // Center align items horizontally
  },
  button: {
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
};

export default ScientistDashboard;

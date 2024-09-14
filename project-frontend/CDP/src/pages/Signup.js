import React from 'react';
import { Button } from 'antd';
import homeImage from '../assets/leaf.jpg';


  const styles = {
    pageContainer: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'url(${homeImage}) no-repeat center center',
      backgroundSize: 'cover',
    },
    formBox: {
      position: 'relative',
      width: '450px',
      height: '300px',
      background: 'rgba(255, 255, 255, 0.5)',
      border: 'none',
      borderRadius: '20px',
      backdropFilter: 'blur(15px) brightness(80%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    title: {
      fontSize: '3em',
      color: 'Black',
      textAlign: 'center',
      marginBottom: '30px',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    button: {
      width: '100%',
      height: '50px',
      margin: '10px 0',
      borderRadius: '40px',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      fontSize: '1.8em',
      fontWeight: '600',
      display: 'block', 
      textAlign: 'center',
      lineHeight: '35px',
    },
    responsiveFormBox: {
      width: '100%',
      height: 'auto',
      padding: '20px',
      borderRadius: '0',
    },
    responsiveTitle: {
      fontSize: '2em',
    },
  };
  const Signup = () => {
  return (
    <div style={styles.pageContainer}>
      <section>
        <div style={styles.formBox}>
          <div>
            <h1 style={styles.title}>Welcome to Crop Disease Detection System</h1>
            <Button
              type="default"
              href="/FSG"
              style={styles.button}
            >
              Farmer Sign Up
            </Button>
            <Button
              type="default"
              href="/SSG"
              style={styles.button}
            >
              Scientist Sign Up
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;

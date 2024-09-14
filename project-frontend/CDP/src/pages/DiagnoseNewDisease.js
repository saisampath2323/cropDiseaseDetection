import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/hole.jpg'; // Path to your image

const DiagnoseNewDisease = () => {
  const [farmerId, setFarmerId] = useState('');  // Add Farmer ID field
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null); // Single image as per API requirement

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Only a single file is uploaded
  };

  const handleTicketSubmission = async (event) => {
    event.preventDefault();
    
    // Form data to handle file upload
    const formData = new FormData();
    formData.append('farmerId', farmerId);
    formData.append('description', description);
    formData.append('status', 'pending'); // Hardcoded status as 'pending'
    formData.append('solved_by', ''); // Hardcoded solved_by as null (empty string in form)
    formData.append('image', image);

    try {
      const response = await axios.post(
        'http://localhost:3002/create/genrate_ticket', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Ticket created successfully!');
    } catch (error) {
      console.error('Error creating ticket:', error);
      setMessage('Error creating ticket');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1>Create New Ticket</h1>
        <form onSubmit={handleTicketSubmission} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Farmer ID"
            value={farmerId}
            onChange={(e) => setFarmerId(e.target.value)}
            required
          />
          <br />
          <br />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <input
            type="file"
            onChange={handleImageChange}
            required
          />
          {image && (
            <div style={styles.previewContainer}>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={styles.previewImage}
              />
            </div>
          )}
          <br />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
  },
  previewContainer: {
    marginTop: '10px',
  },
  previewImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginTop: '10px',
  },
};

export default DiagnoseNewDisease;

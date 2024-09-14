// src/pages/UploadImage.js
import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/downy.jpg'; // Adjust path as necessary

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('/api/upload', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading image');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    
    // Set a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1>Upload Image</h1>
        <form onSubmit={handleImageUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {preview && <img src={preview} alt="Preview" style={styles.imagePreview} />}
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'relative',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: '8px',
    textAlign: 'center',
  },
  imagePreview: {
    marginTop: '10px',
    width: '300px',
    height: '300px',
    objectFit: 'cover',
  },
};

export default UploadImage;

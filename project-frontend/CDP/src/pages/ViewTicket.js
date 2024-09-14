import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ViewTicket.css'
const ViewTicket = () => {
  const { scientistId, Ticket_id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    diseaseName: '',
    percentageOfDisease: '',
    solution: '',
    cropName: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { diseaseName, percentageOfDisease, solution, cropName } = formData;

    if (!diseaseName || !percentageOfDisease || !solution || !cropName) {
      setErrorMessage('All fields are required');
      return;
    }

    try {                       
      const token = Cookies.get('tokenscientist');
      console.log(token);
      //console.log(Cookies.get('token'));
      const response = await fetch('http://localhost:3002/scientist/uploadSolution', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({
          diseaseName,
          percentageOfDisease,
          solution,
          cropName,
          TicketId: Ticket_id,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage('Solution uploaded successfully!');
        console.log(responseData);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to upload solution');
      }
    } catch (error) {
      setErrorMessage('An error occurred while uploading the solution');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Upload Solution for Ticket {Ticket_id}</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Disease Name:</label>
          <input
            type="text"
            name="diseaseName"
            value={formData.diseaseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Percentage of Disease:</label>
          <input
            type="text"
            name="percentageOfDisease"
            value={formData.percentageOfDisease}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Solution:</label>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Crop Name:</label>
          <input
            type="text"
            name="cropName"
            value={formData.cropName}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Upload Solution</button>
      </form>
    </div>
  );
};

export default ViewTicket;

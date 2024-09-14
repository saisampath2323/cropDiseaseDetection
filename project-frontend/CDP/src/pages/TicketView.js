import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Ticketview.css'; // Ensure your CSS is correctly linked
import Cookies from 'js-cookie';

const TicketView = () => {
  const navigate = useNavigate();
  const { Ticket_id } = useParams(); // Ticket_id from URL params
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ticket and solutions data by ticketId
    const fetchTicketDetails = async () => {
      try {
        const token = Cookies.get('token'); // Correctly get the token from cookies
        
        const response = await axios.post(
          'http://localhost:3002/farmer/Viewticket',
          { ticketId: Ticket_id },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        setTicket(response.data.ticket); // Set the ticket data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching ticket');
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [Ticket_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ticket-view-container">
      <h1>Ticket Details</h1>
      {ticket && (
        <div className="ticket-details">
          <h2>Description: {ticket.description}</h2>
          <p>Status: {ticket.status}</p>
          <div className="ticket-image">
            {ticket.image.data && (
              <img src={ticket.image.data} alt="Ticket" />
            )}
          </div>
          <h3>Solutions:</h3>
          {ticket.solutions.length > 0 ? (
            <ul>
              {ticket.solutions.map((solution, index) => (
                <li key={index} className="solution-item">
                  <p>Disease Name: {solution.diseaseName}</p>
                  <p>Percentage of Disease: {solution.percentageOfDisease}</p>
                  <p>Solution: {solution.solution}</p>
                  <p>Crop Name: {solution.cropName}</p>
                  <p>Scientist ID: {solution.scientistId}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No solutions available for this ticket.</p>
          )}
        </div>
      )}
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default TicketView;

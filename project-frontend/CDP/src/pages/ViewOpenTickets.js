import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './tickets.css'; // Assuming you have styles in this file

const ScientistTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch pending tickets for scientists
   
    const fetchTickets = async () => {
      try {
        const token = Cookies.get('tokenscientist'); // Retrieve scientist's token from cookies
        const response = await axios.post(
          'http://localhost:3002/scientist/getAlltickets',
          {},
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setTickets(response.data.tickets);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }
  const clickHandler=(tickettId)=>{
    navigate(`/viewTicket/abc/${tickettId}`);
  }

  return (
    <div className="ticket-history-container">
      <h2>Pending Tickets</h2>
      {tickets.length ? (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="ticket-card" onClick={() => clickHandler(ticket._id)}>
              <h3 className="ticket-id">Ticket ID: {ticket._id}</h3>
              <p className="ticket-description">
                <strong>Description:</strong> {ticket.description}
              </p>
              <p className="ticket-status">
                <strong>Status:</strong> {ticket.status}
              </p>
              <p className="ticket-uploaded-by">
                <strong>Uploaded By:</strong> {ticket.uploadedBy}
              </p>
              <div className="ticket-image-container">
                <img
                  src={ticket.image.data}
                  alt="Ticket"
                  className="ticket-image"
                />
              </div>
              {ticket.Solved_by && (
                <p className="solved-by">
                  <strong>Solved By:</strong> {ticket.Solved_by}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-tickets">No tickets found.</p>
      )}
    </div>
  );
};

export default ScientistTickets;

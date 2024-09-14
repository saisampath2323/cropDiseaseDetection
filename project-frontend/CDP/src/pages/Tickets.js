import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ticket.css'
const TicketHistory = () => {
  const navigate=useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const clickHandler=(ticketId)=>{
           navigate(`/TicketView/${ticketId}`);
  }
  useEffect(() => {
    // Fetch ticket data
    const fetchTickets = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve JWT from cookies
        const response = await axios.post(
          'http://localhost:3002/farmer/get_history',
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

  return (
    <div className="ticket-history-container">
      <h2>Ticket History</h2>
      {tickets.length ? (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="ticket-card" onClick={()=>{
              clickHandler(ticket._id);
            }}>
              <h3 className="ticket-id">Ticket ID: {ticket._id}</h3>
              <p className="ticket-description">
                <strong>Description:</strong> {ticket.description}
              </p>
              <p className="ticket-status">
                <strong>Status:</strong> {ticket.status}
              </p>
              <div className="ticket-image-container">
                <img
                  src={ticket.image.data}
                  alt="Ticket"
                  className="ticket-image"
                />
              </div>
              {ticket.solvedBy && (
                <p className="solved-by">
                  <strong>Solved By:</strong> {ticket.solvedBy}
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

export default TicketHistory;

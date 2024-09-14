import React, { useState } from 'react';
import './ContactUs.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactUs = () => {
  // States for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form data (e.g., send it to the backend or show alert)
    alert('Message sent!');
    // Clear form after submission
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="container">
      <main className="row">
        <section className="col left">
          <div className="contactTitle">
            <h2>Get In Touch</h2>
          </div>

          <div className="contactInfo">
            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="details">
                <span>Phone</span>
                <span>+91 8919704123</span>
              </div>
            </div>

            <div className="iconGroup">
              <div className="icon">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="details">
                <span>Email</span>
                <span>1602-22-737-070@vce.ac.in</span>
              </div>
            </div>
          </div>

          <div className="socialMedia">
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
        </section>

        <section className="col right">
          <form className="messageForm" onSubmit={handleSubmit}>
            <div className="inputGroup halfWidth">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Your Name</label>
            </div>

            <div className="inputGroup halfWidth">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <div className="inputGroup fullWidth">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <label>Subject</label>
            </div>

            <div className="inputGroup fullWidth">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <label>Say Something</label>
            </div>

            <div className="inputGroup fullWidth">
              <button type="submit">Send Message</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;

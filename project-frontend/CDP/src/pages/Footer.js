// src/components/Footer.js
import React from 'react';
import { FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css'; // Create and style as needed

const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>Quick Links</h3>
          <a href="#home"><FaChevronRight />Home</a>
          <a href="#services"><FaChevronRight />Services</a>
          <a href="#about"><FaChevronRight />About</a>
          <a href="#experts"><FaChevronRight />Experts</a>
          <a href="#review"><FaChevronRight />Review</a>
        </div>
        <div className="box">
          <h3>Our Services</h3>
          <a href="#"><FaChevronRight />Remote Sensing</a>
          <a href="#"><FaChevronRight />Machine Learning</a>
          <a href="#"><FaChevronRight />Sensor Technologies</a>
          <a href="#"><FaChevronRight />Advisory Services</a>
          <a href="#"><FaChevronRight />Precision Agriculture</a>
        </div>
        <div className="box">
          <h3>Contact</h3>
          <a href="#"><FaPhone />+91</a>
          <a href="#"><FaPhone />+939-080-514</a>
          <a href="#"><FaEnvelope />Detection</a>
          <a href="#"><FaEnvelope />Supply of Pests</a>
          <a href="#"><FaMapMarkerAlt />Hyderabad, India-400104</a>
        </div>
        <div className="box">
          <h3>Follow Us</h3>
          <a href="#"><FaChevronRight />Facebook</a>
          <a href="#"><FaChevronRight />Twitter</a>
          <a href="#"><FaChevronRight />Instagram</a>
          <a href="#"><FaChevronRight />LinkedIn</a>
        </div>
      </div>
      <div className="credit">Created by <span>Techno Divers</span> | All rights reserved</div>
    </section>
  );
};

export default Footer;

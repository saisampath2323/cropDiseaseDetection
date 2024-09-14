// src/components/Services.js
import React from 'react';
import { FaSatellite, FaMobile, FaSeedling } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import './Services.css'; // Create and style as needed

const Services = () => {
  return (
    <section className="services" id="services">
      <h1 className="heading">our<span>services</span></h1>
      <div className="box-container">
        <div className="box">
          <FaSatellite className="service-icon" />
          <h3>Remote Sensing:</h3>
          <p><strong>Satellite Imaging:</strong></p>
          <p>Utilizes satellite data to monitor crop health and detect diseases from a distance.</p>
          <p><strong>Drone Imagery:</strong></p>
          <p>Drones equipped with cameras or sensors provide high-resolution images for precise disease detection.</p>
          <a href="/learnmore.html" className="btn">Learn More <FaChevronRight /></a>
        </div>
        <div className="box">
          <FaMobile className="service-icon" />
          <h3>Smartphone Apps:</h3>
          <p><strong>Visual Diagnosis Apps:</strong></p>
          <p>Farmers can use smartphone apps to take pictures of crop issues, and the app analyzes the images to identify diseases.</p>
          <p><strong>Data Collection Apps:</strong></p>
          <p>Apps for collecting and managing data related to crop health and disease.</p>
          <a href="/learnmore.html" className="btn">Learn More <FaChevronRight /></a>
        </div>
        <div className="box">
          <FaSeedling className="service-icon" />
          <h3>Precision Agriculture Platforms:</h3>
          <p><strong>Climate Monitoring:</strong></p>
          <p>Monitoring weather conditions helps in understanding the spread of diseases.</p>
          <p>Adapting the application of inputs (water, fertilizers, pesticides) based on real-time data.</p>
          <a href="/learnmore.html" className="btn">Learn More <FaChevronRight /></a>
        </div>
      </div>
    </section>
  );
};

export default Services;

// src/components/IconsContainer.js
import React from 'react';
import { FaCamera, FaExclamation, FaChartLine, FaMicroscope } from 'react-icons/fa';
import './IconsContainer.css'; // Create and style as needed

const IconsContainer = () => {
  return (
    <section className="icons-container">
      <div className="icons">
        <FaCamera className="icon" />
        <h3>Camera</h3>
        <p>Technology for detecting diseases.</p>
      </div>
      <div className="icons">
        <FaExclamation className="icon" />
        <h3>Alert</h3>
        <p>Healthy and diseased crops.</p>
      </div>
      <div className="icons">
        <FaChartLine className="icon" />
        <h3>Graph</h3>
        <p>A data analytics or processing container.</p>
      </div>
      <div className="icons">
        <FaMicroscope className="icon" />
        <h3>Lens</h3>
        <p>Scientific aspect of disease detection.</p>
      </div>
    </section>
  );
};

export default IconsContainer;

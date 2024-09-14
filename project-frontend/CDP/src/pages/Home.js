// src/components/Home.js
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './Home.css'; // Create and style as needed

const Home = () => {
  return (
    <section className="home" id="home">
      <div className="image">
        <img src="https://cdn.britannica.com/89/126689-004-D622CD2F/Potato-leaf-blight.jpg" alt="Crop Detection" />
      </div>
      <div className="content">
        <h3>Crop Diseases Detection</h3>
        <p>
          Use visually appealing graphics and images to create an engaging interface.
          Include a brief overview of the importance of detecting and managing crop diseases.
        </p>
        <a href="/ContactUs" className="btn">CONTACT US <FaChevronRight /></a>
      </div>
    </section>
  );
};

export default Home;

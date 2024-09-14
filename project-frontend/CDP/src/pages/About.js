// src/components/About.js
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './About.css'; // Create and style as needed

const About = () => {
  return (
    <section className="about" id="about">
      <h1 className="heading"><span>about</span>us</h1>
      <div className="row">
        <div className="image">
          <img src="https://academicmatters.med.jax.ufl.edu/files/2019/01/Informatics-600x400.jpg" alt="About Us" />
        </div>
        <div className="content">
          <h3>Explore Crop Diseases Detection</h3>
          <p>
            Plant Pathology Websites: Explore dedicated platforms offering articles, research, and educational materials.<br />
            AgTech Platforms: Visit agricultural technology sites for tools and services related to crop disease management.<br />
            Government Agriculture Departments: Check official websites of agriculture departments for regional-specific information on crop diseases.<br />
            Online Agricultural Communities: Join forums and social media groups discussing crop diseases and detection methods.<br />
            Agribusiness Publications: Look into magazines and online publications focusing on agribusiness for articles on crop health.
          </p>
          <a href="#" className="btn">Learn More <FaChevronRight /></a>
        </div>
      </div>
    </section>
  );
};

export default About;

// src/components/Header.js
import React, { useState } from 'react';
import { FaLeaf, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css'; // Create and style as needed

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <a href="#" className="logo"><FaLeaf />SAFE LEAF</a>
      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <a href="/Home" onClick={() => setMenuOpen(false)}>HOME</a>
        <a href="/SS" onClick={() => setMenuOpen(false)}>SERVICES</a>
        <a href="/about" onClick={() => setMenuOpen(false)}>ABOUT</a>
        <a href="/ContactUS" onClick={() => setMenuOpen(false)}>Contact US</a>
        <a href="/HomePage" onClick={() => setMenuOpen(false)}>LOGIN</a>
        <a href="/Su" onClick={() => setMenuOpen(false)}>SIGNUP</a>
      </nav>
      <div className="menu-btn" onClick={handleMenuToggle}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;

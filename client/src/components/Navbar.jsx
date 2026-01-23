import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Trophy } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/lessons', label: 'Live Lesson' },
    { path: '/rates', label: 'Rates/Packages' },
    { path: '/ranking', label: 'Student Ranking' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Trophy size={32} color="#10b981" />
          <span>Tennis with Daniil</span>
        </Link>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              Log In
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
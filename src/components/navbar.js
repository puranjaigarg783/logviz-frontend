import React, { useState } from 'react';
import '../css/NavBar.css';

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can add logic to switch your app's theme (CSS styles) here.
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="left">
        <span>Dashboard</span>
      </div>

    </nav>
  );
};

export default NavBar;

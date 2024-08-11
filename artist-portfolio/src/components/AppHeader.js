import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons"; // Import the home icon
import "../assets/AppHeader.css";

function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="app-header">
      <div className="app-header-container">
        <h1 className="app-header-title">Artist Portfolio</h1>
        <nav className={`app-header-nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="app-header-link" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faHome} /> {/* Add the home icon */}
          </Link>
        </nav>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;

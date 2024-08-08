import React from "react";
import { Link } from "react-router-dom";
import "../assets/AppHeader.css";

function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header-container">
        <h1 className="app-header-title">Artist Portfolio</h1>
        <nav>
          <Link to="/" className="app-header-link">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;

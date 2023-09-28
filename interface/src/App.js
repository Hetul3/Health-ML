import React from "react";
import "./App.css";

function App() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/hd" className="nav-link">
            Heart Disease
          </a>
        </li>
        <li className="nav-item">
          <a href="/ob" className="nav-link">
            Obesity Level
          </a>
        </li>
        <li className="nav-item">
          <a href="/bc" className="nav-link">
            Breast Cancer Recurrence
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default App;

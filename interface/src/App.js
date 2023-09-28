import React from "react";
import "./index.css";

function App() {
  return (
    <nav className="top-navbar"> 
      <ul className="nav-list">
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/hd.html" className="nav-link">
            Heart Disease
          </a>
        </li>
        <li className="nav-item">
          <a href="/ob.html" className="nav-link">
            Obesity Level
          </a>
        </li>
        <li className="nav-item">
          <a href="/bc.html" className="nav-link">
            Breast Cancer Recurrence
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default App;

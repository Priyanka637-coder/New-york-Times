import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

function LeftSidebar() {
  const location = useLocation(); // Get the current location using useLocation

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-white p-3 min-vh-100 sidebarStyle">
      <ul className="nav flex-column">
        <li
          className={`nav-item text-white p-2 ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <Link
            to="/"
            className="nav-link text-white fs-5 d-flex flex-column align-items-center"
          >
            <i className="bi bi-bar-chart-line-fill"></i>
          </Link>
          <div className="horizontal-line"></div>
        </li>
        <li
          className={`nav-item text-white p-2 ${
            location.pathname === "/favourites" ? "active" : ""
          }`}
        >
          <Link
            to="/favourites"
            className="nav-link text-white fs-5 d-flex flex-column align-items-center"
          >
            <i className="bi bi-heart"></i>
          </Link>
          <div className="horizontal-line"></div>
        </li>
        <li
          className={`nav-item text-white p-2 ${
            location.pathname === "/settings" ? "active" : ""
          }`}
        >
          <Link
            to="/settings"
            className="nav-link text-white fs-5 d-flex flex-column align-items-center"
          >
            <i className="bi bi-gear"></i>
          </Link>
          <div className="horizontal-line"></div>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;

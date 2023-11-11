import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  return (
    <nav className="custom-brand navbar p-0" style={{ height: "74px" }}>
      <a className="navbar-brand h-100 d-flex align-items-center p-0" href="#">
        <div
          className="text-light d-flex align-items-center justify-content-center h-100 me-3"
          style={{ width: "80px", background: "#93B4BC" }}
        >
          <img src="src/assets/Bitmap.png" alt="Logo" />
        </div>
        RAD<span className="brand-title">ICAL</span>
      </a>
    </nav>
  );
}

export default Navbar;

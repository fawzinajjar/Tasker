import React from "react";
import { Link } from "react-router-dom";
import logo from "./whitelogo.png";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">
        <img height="65px" width="150px" alt="Tasker Logo" src={logo} />
      </Link>
      <ul>
        <li>
          <Link to="/About">
            <button className="btn">About Us</button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <button className="btn">Logout</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

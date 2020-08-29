import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./whitelogo.png";

export default function Navbar() {
  return (
    <nav>
      <h1 className="navTitle">TASKER</h1>
      <ul>
        <li>
          <Link to="/About">
            <button name="About Us" className="btn fnfn">
              About Us
            </button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <button className="btn fnfn">Logout</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

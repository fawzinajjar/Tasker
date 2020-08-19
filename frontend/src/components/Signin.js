import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="form-space">
      <form>
        <h2 className="hl">Log in to Tasker </h2>
        <input className="input-box" placeholder="Email" />
        <br />
        <input className="input-box" placeholder="Password" />
        <br />
        <Link to="/Todolist">
          <button className="btn w">Login</button>
        </Link>
        <Link to="/Signup">
          <button className="btn w">SignUp</button>
        </Link>
      </form>
    </div>
  );
}

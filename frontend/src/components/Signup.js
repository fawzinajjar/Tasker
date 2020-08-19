import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="form-space">
      <form>
        <h3 className="hl">Sign Up</h3>
        <Link to="/">
          <button>X</button>
        </Link>
        <br />
        <input className="input-box" placeholder="Name" />
        <br />
        <input className="input-box" placeholder="Email" />
        <br />
        <input
          className="input-box"
          placeholder="Passowrd 6~64 Characters"
          minLength="6"
          maxLength="64"
        />
        <br />
        <input className="input-box" placeholder="Confirm Password" />
        <br />
        <label className="hl">
          <input checked="on" type="checkbox" />
          User Agreement
        </label>
        <br />
        <button className="btn w">SignUp</button>
        <br />
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // Event Handler Function
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-space">
      <form onSubmit={(e) => onSubmit(e)}>
        <h2 className="hl fnfn">Sign In</h2>
        <input
          type="text"
          className="input-box hla2 fnfn"
          placeholder="Email"
          required="on"
        />
        <br />
        <input
          required
          type="password"
          className="input-box hla2 fnfn "
          placeholder="Password"
        />
        <br />
        <Link to="/Todolist">
          <button type="submit" onChange={onChange} className="btn w fnfn">
            Login
          </button>
        </Link>
        <Link to="/Signup">
          <button className="btn w fnfn">SignUp</button>
        </Link>
      </form>
    </div>
  );
}

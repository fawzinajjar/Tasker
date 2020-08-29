import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import { register } from "../actions/auth";

const Signup = ({ setAlert, register }) => {
  // user input State with use state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  // Event Handler Function
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  // React component Setup
  return (
    <Fragment>
      <div className="form-space">
        <h3 className="hl sd md fnfn">Sign Up</h3>
        <Link to="/">
          <a className="sd mr">
            <i className="fas fa-window-close fsize" />
          </a>
        </Link>
        <br />
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => onChange(e)}
            name="name"
            value={name}
            type="text"
            className="input-box hla2 fnfn"
            placeholder="Name : John Smith"
          />
          <br />
          <input
            onChange={(e) => onChange(e)}
            name="email"
            value={email}
            type="email"
            className="input-box hla2 fnfn"
            placeholder="Email : john@example.com"
          />
          <br />
          <input
            onChange={(e) => onChange(e)}
            name="password"
            value={password}
            type="password"
            className="input-box hla2 fnfn"
            placeholder="Passowrd 6~64 Characters"
          />
          <br />
          <input
            onChange={(e) => onChange(e)}
            name="password2"
            type="password"
            value={password2}
            className="input-box hla2 fnfn"
            placeholder="Confirm Password"
          />
          <br />
          <label className="hla2">
            <input className="check1 hla2" required type="checkbox" />
            <a className="fnfn">User Agreement</a>
          </label>
          <br />
          <button type="submit" className="btn w fnfn">
            SignUp
          </button>
        </form>
      </div>
    </Fragment>
  );
};

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Signup);

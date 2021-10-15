import React, { Fragment, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../actions/alert";
import axios from "axios";
import PropTypes from "prop-types";
import { registerSuccess, registerFail } from "../actions/auth";

const Signup = (props) => {
  // user input State with use state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    check_box: false,
  });

  // Event Handler Function
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirm_password, check_box } = formData;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = { name, email, password, confirm_password, check_box };
    try {
      const res = await axios.post(
        "http://localhost:5000/register/",
        body,
        config
      );
      if (res.status === 200) {
        props.registerSuccess(res.data);
        props.setAlert("user register successfully");
      }
    } catch (error) {
      try {
        const errors = error.response.data.errors;
        if (errors) {
          errors.forEach((errors) => props.setAlert(errors.msg));
        }
      } catch (error) {}
      props.registerFail();
    }
  };
  // React component Setup
  // Redirect
  if (props.isAuthenticated.isAuthenticated) {
    return <Redirect to="/todolist" />;
  }
  return (
    <Fragment>
      <div className="form-space">
        <h3 className="hl sd md fnfn">Sign Up</h3>
        <Link to="/">
          <a className="sd mr" />
        </Link>
        <br />
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            onChange={(e) => onChange(e)}
            name="name"
            value={formData.name}
            type="text"
            className="input-box hla2 fnfn"
            placeholder="Name : John Smith"
          />
          <br />
          <input
            onChange={(e) => onChange(e)}
            name="email"
            value={formData.email}
            type="text"
            className="input-box hla2 fnfn"
            placeholder="Email : john@example.com"
          />
          <br />
          <input
            onChange={(e) => onChange(e)}
            name="password"
            value={formData.password}
            type="password"
            className="input-box hla2 fnfn"
            placeholder="Passowrd 6~64 Characters"
          />
          <br />
          <input
            onChange={(e) => onChange(e)}
            name="confirm_password"
            value={formData.confirm_password}
            type="password"
            className="input-box hla2 fnfn"
            placeholder="Confirm Password"
          />
          <br />

          <label className="hla2">
            <input
              onClick={() => setFormData({ ...formData, check_box: true })}
              className="check1 hla2"
              type="checkbox"
            />
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
  registerSuccess: PropTypes.func.isRequired,
  registerFail: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return { state: state.alert, isAuthenticated: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerSuccess: (payload) => dispatch(registerSuccess(payload)),
    registerFail: () => dispatch(registerFail()),
    setAlert: (payload) => dispatch(setAlert(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

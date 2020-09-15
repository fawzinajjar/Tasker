import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import { authenticationFail, authenticationSuccess } from "../actions/auth";

const Signin = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Event Handler Function
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    const { email, password } = formData;
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      email,
      password,
    };
    try {
      const res = await axios.post("http://localhost:5000/login", body, config);
      if (res.status === 200) {
        props.authenticationSuccess(res.data);
        props.setAlert("Signed in successfully");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((errors) => props.setAlert(errors.msg));
        props.authenticationFail();
      }
    }
  };
  // Redirect
  if (props.isAuthenticated.isAuthenticated) {
    return <Redirect to="/todolist" />;
  }

  return (
    <div className="form-space">
      <form onSubmit={(e) => onSubmit(e)}>
        <h2 className="hl fnfn">Sign In</h2>
        <input
          onChange={(e) => onChange(e)}
          name="email"
          type="text"
          className="input-box hla2 fnfn"
          placeholder="Email"
        />
        <br />
        <input
          onChange={(e) => onChange(e)}
          name="password"
          type="password"
          className="input-box hla2 fnfn "
          placeholder="Password"
        />
        <br />

        <button type="submit" className="btn w fnfn">
          Login
        </button>

        <Link to="/Signup">
          <button className="btn w fnfn">SignUp</button>
        </Link>
      </form>
    </div>
  );
};

Signin.propTypes = {
  setAlert: PropTypes.func,
  registerSuccess: PropTypes.func,
  registerFail: PropTypes.func,
  isAuthenticated: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    alerts: {
      state: state.alert,
    },
    isAuthenticated: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticationSuccess: (payload) =>
      dispatch(authenticationSuccess(payload)),
    authenticationFail: (payload) => dispatch(authenticationFail(payload)),
    setAlert: (payload) => dispatch(setAlert(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <li>
      <Link to="/">
        <button onClick={logout} className="btn fnfn">
          Logout
        </button>
      </Link>
    </li>
  );
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
        {!loading && <Fragment>{isAuthenticated ? authLinks : null}</Fragment>}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (payload) => dispatch(logout(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

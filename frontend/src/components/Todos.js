import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Todos = ({ tasks }) => {
  return;
};

Todos.propTypes = {
  tasks: PropTypes.object,
};

const mapStateToProps = (state) => {
  return { tasks: state.auth };
};
export default connect(mapStateToProps)(Todos);

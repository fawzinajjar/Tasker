import React, { useState } from "react";
import Todos from "./Todos";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../actions/alert";
import PropTypes from "prop-types";
import { addTaskFail, addTaskSuccess } from "../actions/todolist";
import { Redirect } from "react-router-dom";

const Todolist = (props) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeText = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ text: inputValue });
    try {
      const res = await axios.post(
        "http://localhost:5000/dashboard",
        body,
        config
      );
      if (res.status === 200) {
        props.setAlert("Task Added");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((errors) => props.setAlert(errors.msg));
      }
      props.addTaskFail();
    }
  };
  if (!props.isAuthenticated.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Todos />
      <div className="div">
        <span className="span">
          <input
            autoComplete="off"
            className="input"
            placeholder="... What to do next ?"
            name="text"
            onChange={(e) => onChangeText(e)}
            value={inputValue}
          />
        </span>
        <span>
          <button className="button" onClick={(e) => onSubmit(e)}>
            <i className="fas fa-plus-circle"></i> Save
          </button>
        </span>
      </div>
      <style jsx="true">
        {`
          .div {
            margin: 4px 4% 4px 4%;
          }
          .span {
            margin: 0 1% 0 0;
          }
          .input {
            color: white;
            width: 80%;
            border-width: 0px;
            border-radius: 20px;
            padding: 0px 0px 5px 20px;
            font-size: 30px;
            background-color: #66ccff;
            font-family: "Chango", cursive;
          }
          .input::placeholder {
            color: white;
            font-family: "Chango", cursive;
          }
          .button {
            width: 19%;
            font-size: 30px;
            border-radius: 20px;
            padding: 0px 0px 5px 0px;
            background-color: #e9e9e9;
            border-width: 0px;
            border-color: #66ccff;
            color: white;
            font-family: "Chango", cursive;
            margin: 0px 0px 0px 0px;
          }
        `}
      </style>
    </>
  );
};
Todolist.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addTaskSuccess: PropTypes.func.isRequired,
  addTaskFail: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return { state: state.alert, isAuthenticated: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTaskSuccess: (payload) => dispatch(addTaskSuccess(payload)),
    addTaskFail: (payload) => dispatch(addTaskFail(payload)),
    setAlert: (payload) => dispatch(setAlert(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);

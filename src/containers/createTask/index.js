import React, { useState } from "react";
import { listPiority } from "./mokup";
import actionTask from "../../redux-store/action/task";
import { connect } from "react-redux";
import Select from "../select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
function App(props) {
  const { item } = props;
  const [state, _setState] = useState({
    dueDate: (item?.dueDate && new Date(item?.dueDate)) || new Date(),
    piority: item?.piority || 20,
    title: item?.title || "",
    description: item?.description || "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      [key]: value,
    });
  };
  const handleSubmit = () => {
    if (!state.title) {
      setState({
        checkValidate: true,
      });
      return;
    }
    setState({
      checkValidate: false,
    });
    let payload = {
      ...state,
      dueDate: state.dueDate && state.dueDate.toLocaleDateString("en-US"),
    };
    if (item && item.id) payload = { ...payload, id: item.id };
    props.createOrEdit(payload).then((s) => {
      props.setCurrentItem && props.setCurrentItem();
    });
    setState({
      dueDate: new Date(),
      piority: 20,
      title: "",
      description: "",
    });
  };
  return (
    <div className="create-task">
      <div className="title">New Task</div>
      <div className="Form">
        <div className="form-item">
          <input
            placeholder="Add new task"
            className="item-input"
            value={state.title}
            onInput={onChange("title")}
          />
          {state.checkValidate && !state.title && (
            <span className="error">Task title is required</span>
          )}
        </div>
        <div className="form-item">
          <label>Description</label>
          <textarea
            className="item-input"
            value={state.description}
            onInput={onChange("description")}
          />
        </div>
        <div className="form-item-box">
          <div className="form-item">
            <label>Due Date</label>
            <DatePicker
              selected={state.dueDate}
              onChange={onChange("dueDate")}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="form-item">
            <label>Piority</label>
            <Select
              onChange={onChange("piority")}
              data={listPiority}
              className="item-input"
              value={state.piority}
            />
          </div>
        </div>
        <button className="action" onClick={handleSubmit}>
          {(item && item.id && "Update") || "Add"}
        </button>
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {};
  },
  {
    updateData: actionTask.updateData,
    createOrEdit: actionTask.createOrEdit,
  }
)(App);

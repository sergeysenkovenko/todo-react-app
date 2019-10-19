import React, { Component } from "react";
import "./item-add-form.css";

export default class ItemAddForm extends Component {
  state = {
    value: "",
    valid: true
  };

  inputChange = e => {
    const value = e.target.value;
    if (value) {
      this.setState({
        value,
        valid: true
      });
    } else {
      this.setState({
        value,
        valid: false
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    const { onItemAdd } = this.props;
    if (value) {
      onItemAdd(value);
      this.setState({
        value: "",
        valid: true
      });
    } else {
      this.setState({
        valid: false
      });
    }
  };

  onBlur = () => {
    this.setState({
      valid: true
    });
  };

  render() {
    const classes = this.state.valid ? "" : "invalid-input";
    return (
      <form
        className="top-panel d-flex"
        onSubmit={this.onSubmit}
        onBlur={this.onBlur}
      >
        <input
          type="text"
          className={`form-control search-input ${classes}`}
          placeholder="Add task to the list"
          value={this.state.value}
          onChange={this.inputChange}
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    );
  }
}

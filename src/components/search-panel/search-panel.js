import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    seacrh: ""
  };

  inputChange = e => {
    const search = e.target.value;
    this.setState({
      search
    });
    const { onSearchItem } = this.props;

    onSearchItem(search);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={this.state.value}
        onChange={this.inputChange}
      />
    );
  }
}

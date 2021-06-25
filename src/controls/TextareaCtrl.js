import React, { Component } from "react";
import { Controller } from "react-hook-form";

export default class TextareaCtrl extends Component {
  render() {
    let name = this.props.name;
    let rules = {
      required: this.props.required,
      pattern: {
        value: /[A-Za-z0-9]{1,20}/,
        message: "Field can't be empty!",
      },
    };

    return (
      <div className="controller-outer">
        <Controller
          render={({ onChange, onBlur, value }) => (
            <textarea
              onBlur={onBlur}
              name={this.props.name}
              onChange={onChange}
              value={value}
              placeholder={this.props.placeholder}
              className={this.props.className}
              disabled={this.props.disabled}
              rows={this.props.rows}
            />
          )}
          name={this.props.name}
          control={this.props.control}
          rules={rules}
        />
        {this.props.showError(name)}
      </div>
    );
  }
}

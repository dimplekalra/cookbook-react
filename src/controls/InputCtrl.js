import React, { Component } from "react";
import { Controller } from "react-hook-form";

export default class InputCtrl extends Component {
  render() {
    let name = this.props.name;
    let rules = {
      required: this.props.required,
      pattern: {
        value: /[A-Za-z0-9]{1,20}/,
        message: "Field can't be empty!",
      },
      maxLength: { value: 30, message: "Can use max be 30 chars" },
      minLength: { value: 3, message: "Must be 3 chars long" },
    };

    if (this.props.componentName === "login") {
      rules.minLength.value = 4;
      rules.minLength.message = "Must be 4 chars long";
    } else if (this.props.type === "text") {
      delete rules.maxLength;
    }

    if (this.props.type === "email") {
      // MinLength
      rules.minLength.value = 4;
      rules.minLength.message = "Must be 4 chars long";
      //
      // Pattern Check
      rules.pattern.value = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      rules.pattern.message = "Invalid email address";
      //
    }

    if (this.props.type === "date" || this.props.type === "number") {
      delete rules.minLength;
      delete rules.maxLength;
    }

    return (
      <div className="controller-outer">
        <Controller
          render={({ onChange, onBlur, value }) => (
            <input
              onBlur={onBlur}
              name={this.props.name}
              onChange={onChange}
              value={value}
              type={this.props.type}
              placeholder={this.props.placeholder}
              className={this.props.className}
              disabled={this.props.disabled}
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

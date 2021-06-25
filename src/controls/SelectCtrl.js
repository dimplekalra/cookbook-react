import React, { Component } from "react";
import { Controller } from "react-hook-form";

export default class SelectCtrl extends Component {
  render() {
    let name = this.props.name;
    let rules = {
      required: this.props.required,
      pattern: {
        value: /[A-Za-z0-9]{1,20}/,
        message: "Please select an option!",
      },
    };

    if (this.props.componentName !== undefined) {
      if (this.props.componentName === "login") {
        rules.minLength.value = 4;
        rules.minLength.message = "Must be 4 chars long";
      }
    }

    return (
      <div className="controller-outer">
        <Controller
          render={({ onChange, onBlur, value }) => (
            <>
              <select
                onChange={onChange}
                value={value}
                disabled={this.props.disabled}
              >
                <option value="" selected hidden>
                  {this.props.placeholder}
                </option>
                {this.props.options.map((option, idx) => {
                  return (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </>
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

import React from "react";

const AddChip = (props) => {
  const { onAdd, placeholder, value, onChange, name } = props;

  const handleClick = (e) => {
    e.preventDefault();

    onAdd(name);
  };

  return (
    <form className="form-inline">
      <input
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        className="form-control"
        placeholder={placeholder}
      />
      <button onClick={handleClick} className="btn btn-default addButton">
        + Add {name}
      </button>
    </form>
  );
};

export default AddChip;

import React from "react";

const ChipList = (props) => {
  let { Items, onDelete, name } = props;

  Items =
    Items && Items.length >= 1
      ? Items.map((item, index) => {
          return (
            <li className="list-group-item " key={index}>
              <div>
                {item}
                <button
                  type="button"
                  className="close"
                  onClick={(e) => onDelete(name, item)}
                >
                  &times;
                </button>
              </div>
            </li>
          );
        })
      : null;

  return <ul className="list-group"> {Items} </ul>;
};

export default ChipList;

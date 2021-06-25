import React from "react";
import AddChip from "./AddChip";
import ChipList from "./ChipList";

const Chips = (props) => {
  return (
    <React.Fragment>
      <AddChip {...props} />
      <ChipList {...props} />
    </React.Fragment>
  );
};

export default Chips;

import React, { useState } from "react";
import "./Styles.scss";

const InplaceConfirm = (props) => {
  const [ViewConfirm, SetViewConfirm] = useState(false);
  const Toggle = () => {
    SetViewConfirm(!ViewConfirm);
  };
  return (
    <div className="inplace-confirm">
      {ViewConfirm ? (
        <div className="main-body">
          <div>Are you sure?</div>
          <div>
            <button
              onClick={() => {
                Toggle();
                props.Action();
              }}
            >
              Yes
            </button>
            <button onClick={Toggle}>No</button>
          </div>
        </div>
      ) : null}
      <div onClick={Toggle}>{props.HTMLComponent}</div>
    </div>
  );
};

export default InplaceConfirm;

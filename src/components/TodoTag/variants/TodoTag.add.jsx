import React from "react";

import { GrFormAdd } from "react-icons/gr";

function TodoTagAdd({ done }) {
  const actionColor = done ? "#1abc9c" : "#CECECE";

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: actionColor,
        paddingTop: 3,
        paddingLeft: 6,
        paddingBottom: 3,
        paddingRight: 6,
        borderRadius: 3,
        margin: 3,
      }}
    >
      <text style={{ fontSize: 12, color: "#ffffff" }}>Add tag </text>
      <GrFormAdd
        size={13}
        style={{ alignSelf: "center" }}
        color="#ffffff"
        onClick={() => {}}
      />
    </div>
  ); 
}

export default TodoTagAdd;

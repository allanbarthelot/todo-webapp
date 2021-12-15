import { useState } from "react";
import { ImCross, ImCheckmark, ImCheckboxChecked } from "react-icons/im";

import { Input } from "antd";

function TodoItem({
  todo,
  removeTodo,
  toggleTodo,
  syncing,
  updateTodo,
  updateTodoStatus,
  tags,
}) {
  const [editMode, setEditMode] = useState(false);
  const [label, setLabel] = useState("");

  const updateTodoLabel = () => {
    const updatedTodo = { ...todo, label: label };
    updateTodo(updatedTodo);
  };

  const actionColor = todo.done ? "#1abc9c" : "#CECECE";

  return (
    <div
      style={{
        opacity: syncing ? 0.5 : 1,
        width: 500,
        border: "3px",
        borderColor: actionColor,
        backgroundColor: "#fafafa",
        marginTop: 30,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{ padding: 20, display: "flex", alignItems: "center" }}
          onClick={() => {
            //   setDone(!done);
            const updatedTodo = { ...todo, done: !todo.done };
            updateTodoStatus(updatedTodo);
          }}
        >
          <ImCheckboxChecked size={20} color={actionColor}></ImCheckboxChecked>
        </div>
        <div
          style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}
          onDoubleClick={() => {
            setLabel(todo.label);
            setEditMode(true);
          }}
        >
          {editMode ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Input
                size="large"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditMode(false);
                    updateTodoLabel();
                  }

                  if (e.key === "Escape") {
                    setEditMode(false);
                  }
                }}
              ></Input>

              <ImCross
                size={10}
                style={{ marginLeft: 10, alignSelf: "center" }}
                onClick={() => {
                  setEditMode(false);
                }}
              />
              <ImCheckmark
                size={13}
                style={{ alignSelf: "center", marginLeft: 10 }}
                onClick={() => {
                  setEditMode(false);
                  updateTodoLabel();
                }}
              />
            </div>
          ) : (
            <text>{todo.label}</text>
          )}
        </div>
        <div
          style={{
            padding: 20,
            width: 13,
            display: "flex",
            alignItems: "center",
          }}
        >
          {!syncing && !editMode && (
            <ImCross
              size={10}
              style={{ alignSelf: "center" }}
              onClick={() => {
                removeTodo(todo);
              }}
            />
          )}
        </div>
      </div>
      <div style={{ display: "flex", margin: 3, justifyContent: "flex-end" }}>
        {(tags || []).map((tag) => {
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
              <text style={{ fontSize: 12, color: "#ffffff" }}>{tag} </text>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoItem;

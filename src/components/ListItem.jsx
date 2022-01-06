import { TextField } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { ImCross, ImCheckmark, ImCheckboxChecked } from "react-icons/im";

function ListItem({
  listItem,
  updateList,
  addList,
  deleteList,
  selected,
  setSelectedList,
  setAddMode,
}) {
  const [editing, setEditing] = useState(listItem ? false : true);

  const [listName, setListName] = useState("");

  return (
    <div
      style={{ padding: 20, backgroundColor: selected ? "#fbfbfb" : "#ececec" }}
      onClick={() => {
        if (listItem) setSelectedList(listItem._id);
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          {editing ? (
            <TextField
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (listItem) {
                    updateList({ ...listItem, name: listName });
                  } else {
                    addList({ name: listName });
                    setAddMode(false);
                  }
                  setEditing(false);
                }
                if (e.key === "Escape") {
                  if (listItem) {
                    setEditing(false);
                  } else {
                    setAddMode(false);
                  }
                }
              }}
              onChange={(e) => setListName(e.target.value)}
              value={listName}
            />
          ) : (
            <div
              style={{
                fontWeight: selected ? "bold" : "normal",
                textAlign: "center",
                marginLeft: !selected ? 0 : 30,
              }}
              onDoubleClick={() => {
                setListName(listItem ? listItem.name : "");
                setEditing(true);
              }}
            >
              {listItem ? listItem.name : ""}
            </div>
          )}
        </div>

        {selected && (
          <ImCross
            size={10}
            style={{ marginLeft: 20, alignSelf: "center" }}
            onClick={() => {
              if (listItem) {
                if (
                  window.confirm(
                    "You will loose all notes in this list. Are you sure you want to delete it?"
                  )
                ) {
                  deleteList(listItem._id);
                }
              } else {
                setAddMode(false);
              }
            }}
          />
        )}
      </div>

      {selected && (
        <div
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <BsFillPersonFill size={13} />
          <div style={{ fontSize: 13 }}>
            {moment(listItem.createdAt).calendar()}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItem;

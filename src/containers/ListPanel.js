import ListItem from "../components/ListItem";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import {
  addList,
  deleteList,
  getLists,
  setSelectedList,
  updateList,
} from "../redux/list/actions";

import { Button } from "@mui/material";

function ListPanel({
  getLists,
  updateList,
  lists,
  user,
  deleteList,
  addList,
  selectedList,
  setSelectedList,
}) {
  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    getLists();
  }, [getLists, user]);

  console.log("lists", lists);

  return (
    <div
      style={{
        backgroundColor: "#ececec",
        width: 400,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {(lists || []).map((listItem) => {
        return (
          <ListItem
            listItem={listItem}
            deleteList={deleteList}
            updateList={updateList}
            selected={selectedList === listItem._id}
            setSelectedList={setSelectedList}
          />
        );
      })}

      {addMode ? (
        <ListItem
          deleteList={deleteList}
          updateList={updateList}
          addList={addList}
          setAddMode={setAddMode}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ marginLeft: 5, marginTop: 14 }}
            variant="contained"
            onClick={() => setAddMode(true)}
            size="small"
          >
            New List
          </Button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists.lists,
    listsLoading: state.lists.listsLoading,
    selectedList: state.lists.selectedList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLists: () => dispatch(getLists()),
    addList: (list) => dispatch(addList(list)),
    deleteList: (listId) => dispatch(deleteList(listId)),
    updateList: (list) => dispatch(updateList(list)),
    setSelectedList: (listId) => dispatch(setSelectedList(listId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPanel);

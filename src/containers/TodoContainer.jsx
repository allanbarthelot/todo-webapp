import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  getTodos,
  updateTodo,
  updateTodoStatus,
} from "../redux/todo/actions";

import { BiRefresh } from "react-icons/bi";

import ListPanel from "./ListPanel";

import TodoList from "../components/TodoList";
import TodoAddBar from "../components/TodoAddBar";

function TodoContainer({
  todoList,
  todoListSyncing,
  addTodo,
  getTodos,
  todoListLoading,
  todoAddLoading,
  todoRemoveLoading,
  user,
  selectedList,

  deleteTodo,
  updateTodo,
  toggleTodo,
  updateTodoStatus,
}) {
  const [todo, setTodo] = useState("");
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  const loading = () => todoListLoading || todoAddLoading || todoRemoveLoading;

  useEffect(() => {
    if (selectedList !== "") getTodos(selectedList);

    setActiveTags([]);
  }, [getTodos, user, selectedList]);

  useEffect(() => {
    let processedTodo = "";
    for (let tag in activeTags) {
      processedTodo = todo.replaceAll(activeTags[tag], "").trim();
    }

    setTodo(processedTodo);
  }, [tags, activeTags]);

  useEffect(() => {
    let tags = new Map();
    todoList.forEach((todo) => {
      todo.tags.forEach((tag) => {
        tags.set(tag, true);
      });
    });

    const tagArray = Array.from(tags.keys());

    setTags(tagArray);
  }, [todoList]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexFlow: "column",
          height: "100%",
        }}
      >
        <TodoAddBar
          addTodo={addTodo}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
          selectedList={selectedList}
          tags={tags}
          todo={todo}
          setTodo={setTodo}
        />
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          <ListPanel user={user} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <BiRefresh
                style={{ alignSelf: "left", opacity: loading() ? 0.5 : 1 }}
                color="#000000"
                size="23"
                onClick={() => getTodos()}
              />
            </div>

            {selectedList !== "" && (
              <TodoList
                activeTags={activeTags}
                todoList={todoList}
                loading={loading}
                todoListSyncing={todoListSyncing}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
                updateTodoStatus={updateTodoStatus}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList.todoList,
    todoListSyncing: state.todoList.todoListSyncing,
    todoListLoading: state.todoList.todoListLoading,
    todoAddLoading: state.todoList.todoAddLoading,
    todoRemoveLoading: state.todoList.todoRemoveLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)),
    deleteTodo: (todo) => dispatch(deleteTodo(todo)),
    toggleTodo: (todoId) => dispatch(toggleTodo(todoId)),
    updateTodo: (todo) => dispatch(updateTodo(todo)),
    updateTodoStatus: (todo) => dispatch(updateTodoStatus(todo)),
    getTodos: (list) => dispatch(getTodos(list)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);

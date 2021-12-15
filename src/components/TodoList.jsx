import React from "react";
import TodoItem from "./TodoItem";

function TodoList({
  todoList,
  todoListSyncing,
  activeTags,
  deleteTodo,
  toggleTodo,
  updateTodo,
  updateTodoStatus,
  loading,
}) {
  return (
    <>
      <div
        style={{
          alignSelf: "center",
          justifySelf: "center",
          paddingTop: 50,
          marginRight: 150,
        }}
      >
        {todoList && todoList.length > 0
          ? todoList
              .filter((todo) => {
                if ((activeTags || []).length === 0) {
                  return true;
                }

                let tagExists = false;
                activeTags.forEach((activeTag) => {
                  if (todo && todo.tags.includes(activeTag)) {
                    if (!tagExists) tagExists = true;
                  }
                });
                return tagExists;
              })
              .map((todo) => {
                return (
                  <TodoItem
                    todo={todo}
                    syncing={todoListSyncing.includes(todo._id) || !todo._id}
                    removeTodo={deleteTodo}
                    toggleTodo={toggleTodo}
                    updateTodo={updateTodo}
                    updateTodoStatus={updateTodoStatus}
                    tags={todo.tags}
                  />
                );
              })
          : !loading() && <>¯\_(ツ)_/¯</>}
      </div>
    </>
  );
}

export default TodoList;

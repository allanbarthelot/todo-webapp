import React from "react";
import TodoItem from "./TodoItem";

function TodoList({
                      activeTags,
                      todoListSyncing,
                      filteredTodos,
                      deleteTodo,
                      toggleTodo,
                      updateTodo,
                      updateTodoStatus,
                      loading,
                  }) {

    console.log("activeTags", activeTags)

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
                {filteredTodos && filteredTodos.length > 0
                    ? filteredTodos
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

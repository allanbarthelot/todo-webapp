import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {
    addTodo,
    deleteTodo,
    toggleTodo,
    getTodos,
    updateTodo,
    updateTodoStatus, updateTodosStatus,
} from "../redux/todo/actions";

import {BiRefresh} from "react-icons/bi";
import {RiCheckboxMultipleFill, RiCheckboxMultipleBlankFill} from "react-icons/ri";

import ListPanel from "./ListPanel";

import TodoList from "../components/TodoList";
import TodoAddBar from "../components/TodoAddBar";

function TodoContainer({
                           todoLists,
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
                           updateTodosStatus,
                       }) {
    const [todo, setTodo] = useState("");
    const [tags, setTags] = useState([]);
    const [activeTags, setActiveTags] = useState([]);

    const loading = () => todoListLoading || todoAddLoading || todoRemoveLoading;

    const getFilteredTodos = () => {
        return (todoLists[selectedList] || [])
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
    }

    const groupUpdateTodoStatus = (status) => {
        const todoIds = getFilteredTodos().map(todo => {
            return todo._id
        })

        updateTodosStatus(todoIds, status, selectedList)
    }

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
        (todoLists[selectedList] || []).forEach((todo) => {
            todo.tags.forEach((tag) => {
                tags.set(tag, true);
            });
        });

        const tagArray = Array.from(tags.keys());

        setTags(tagArray);
    }, [todoLists, selectedList]);

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
                <div style={{display: "flex", flexDirection: "row", height: "100%"}}>
                    <ListPanel user={user}/>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            <RiCheckboxMultipleFill
                                style={{alignSelf: "left", opacity: loading() ? 0.5 : 1}}
                                color="#000000"
                                size="23"
                                onClick={() => groupUpdateTodoStatus(true)}
                            />

                            <RiCheckboxMultipleBlankFill
                                style={{alignSelf: "left", opacity: loading() ? 0.5 : 1}}
                                color="#000000"
                                size="23"
                                onClick={() => groupUpdateTodoStatus(false)}
                            />

                            <BiRefresh
                                style={{alignSelf: "left", opacity: loading() ? 0.5 : 1}}
                                color="#000000"
                                size="23"
                                onClick={() => getTodos(selectedList)}
                            />


                        </div>

                        {selectedList !== "" && (
                            <TodoList
                                filteredTodos={getFilteredTodos()}
                                activeTags={activeTags}
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
        todoLists: state.todoList.todoLists,
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
        updateTodosStatus: (todos, status, listId) =>
            dispatch(updateTodosStatus(todos, status, listId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);

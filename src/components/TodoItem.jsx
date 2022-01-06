import {useState} from "react";
import {ImCross, ImCheckmark, ImCheckboxChecked} from "react-icons/im";
import {TextField, Button} from "@mui/material";

import TodoTagItem from "./TodoTag/variants/TodoTag.item";
import TodoTagAdd from "./TodoTag/variants/TodoTag.add";

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
    const [editedTags, setEditedTags] = useState([]);

    const updateTodoLabel = () => {
        const updatedTodo = {...todo, label: label, tags: tags};
        updateTodo(updatedTodo);
    };

    const updateTodoTags = (oldTag, newTag) => {

        const newTags = tags.map(tag => {
            if (tag === oldTag) return newTag
            return tag
        })

        const updatedTodo = {...todo, tags: newTags};
        updateTodo(updatedTodo);
    };

    const actionColor = todo.done ? "#1abc9c" : "#CECECE";

    const deleteTodoWithConfirm = () => {
        if (window.confirm("Are you sure you want to do delete this todo?")) {
            removeTodo(todo);
        }
    };

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
            <div style={{display: "flex", flexDirection: "row"}}>
                <div
                    style={{padding: 20, display: "flex", alignItems: "center"}}
                    onClick={() => {
                        //   setDone(!done);
                        const updatedTodo = {...todo, done: !todo.done};
                        updateTodoStatus(updatedTodo);
                    }}
                >
                    <ImCheckboxChecked size={20} color={actionColor}></ImCheckboxChecked>
                </div>
                <div
                    style={{flex: 1, paddingTop: 20, paddingBottom: 20}}
                    onDoubleClick={() => {
                        setLabel(todo.label);
                        setEditedTags(todo.tags);
                        setEditMode(true);
                    }}
                >
                    {editMode ? (
                        <div style={{display: "flex"}}>
                            <TextField
                                size="small"
                                id="standard-basic"
                                variant="standard"
                                color={"white"}
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
                            />

                            <ImCross
                                size={10}
                                style={{marginLeft: 10, alignSelf: "center"}}
                                onClick={() => {
                                    setEditMode(false);
                                }}
                            />
                            <ImCheckmark
                                size={13}
                                style={{alignSelf: "center", marginLeft: 10}}
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
                            style={{alignSelf: "center"}}
                            onClick={() => {
                                deleteTodoWithConfirm();
                            }}
                        />
                    )}
                </div>
            </div>
            <div style={{display: "flex", margin: 3, justifyContent: "flex-end"}}>
                {editMode && <TodoTagAdd done={todo.done}/>}
                {(tags || []).map((tag) => {
                    return (
                        <TodoTagItem
                            tag={tag}
                            done={todo.done}
                            editMode={editMode}
                            updateTodoTags={updateTodoTags}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TodoItem;

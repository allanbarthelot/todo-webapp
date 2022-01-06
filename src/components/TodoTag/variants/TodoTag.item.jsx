import {TextField} from "@mui/material";
import {useState} from "react";
import {ImCross} from "react-icons/im";

function TodoTagItem({tag, done, editMode, updateTodoTags}) {
    const actionColor = done ? "#1abc9c" : "#CECECE";

    const [edit, setEdit] = useState(false);
    const [tagText, setTagText] = useState(tag);

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
            onDoubleClick={() => {
                setEdit(!edit);
            }}>
            {edit ? (
                <TextField
                    size="small"
                    id="standard-basic"
                    variant="standard"
                    color={"white"}
                    value={tagText}
                    onChange={(e) => setTagText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setEdit(false);
                            // updateTodoLabel();
                            updateTodoTags(tag, tagText)
                        }

                        if (e.key === "Escape") {
                            // setEditMode(false);
                            setEdit(false);
                        }
                    }}
                />
            ) : (
                <text style={{fontSize: 12, color: "#ffffff"}}>{tag}</text>
            )}

            {edit && (
                <ImCross
                    size={10}
                    style={{alignSelf: "center", marginLeft: 10}}
                    color="#ffffff"
                    onClick={() => {
                    }}
                />
            )}
        </div>
    );
}

export default TodoTagItem;

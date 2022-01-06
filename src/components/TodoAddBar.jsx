import {TextField, Button} from "@mui/material";
import TodoTag from "./TodoTag/TodoTag";

function TodoAddBar({
                        addTodo, activeTags, setActiveTags, selectedList, tags, todo, setTodo,
                    }) {
    const processTagsFromTodo = (e) => {
        if (e.keyCode === 13) {
            addToTodo();
        }

        if (e.keyCode === 32) {
            const tagsFound = todo.match(/#\w+/g);
            console.log(tagsFound);

            if (tagsFound && tagsFound.length > 0) {
                const newTags = [...activeTags, ...tagsFound];
                setActiveTags(newTags);
            }
        }
    };

    const addToTodo = () => {
        const todoObject = {label: todo, tags: activeTags, list: selectedList};
        addTodo(todoObject);
        setTodo("");
    };

    return (<div
        style={{
            display: "flex",
            paddingTop: 50,
            paddingBottom: 20,
            width: "100%",
            backgroundColor: "#3498db",
            justifyContent: "center",
            alignItems: "flex-start",
        }}>
        <div
            style={{
                display: "flex", flexDirection: "column", maxWidth: 800, minWidth: 600,
            }}>
            <TextField
                id="standard-basic"
                label="New to do..."
                variant="standard"
                color={"white"}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyDown={(e) => {
                    processTagsFromTodo(e);
                }}
            />

            <div
                style={{
                    display: "flex", marginTop: 3, marginLeft: -5, alignItems: "center",
                }}>
                {[...(tags || []), ...activeTags.filter((activeTag) => !tags.includes(activeTag)),].map((tag) => {
                    return (<TodoTag
                        setActiveTags={setActiveTags}
                        activeTags={activeTags}
                        tag={tag}
                    />);
                })}
            </div>
        </div>

        <Button
            style={{marginLeft: 5, marginTop: 14}}
            variant="contained"
            onClick={() => addTodo()}
            size="small">
            Add
        </Button>
    </div>);
}

export default TodoAddBar;

import React from "react";

function TodoTag({ setActiveTags, activeTags, tag }) {
  const activeTag = "#54a2d6";
  const inActiveTag = "#2776ab";

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: activeTags.includes(tag) ? activeTag : inActiveTag,
        paddingTop: 3,
        paddingLeft: 6,
        paddingBottom: 3,
        paddingRight: 6,
        borderRadius: 3,
        margin: 3,
      }}
      onClick={() => {
        if (activeTags.includes(tag)) {
          setActiveTags([
            ...activeTags.filter((activeTag) => activeTag !== tag),
          ]);
        } else {
          setActiveTags([...activeTags, tag]);
        }
      }}
    >
      <text style={{ fontSize: 18, color: "#ffffff" }}>{tag} </text>
    </div>
  );
}

export default TodoTag;

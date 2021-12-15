import React from "react";
import { TextField, Button } from "@mui/material";
import { ImProfile } from "react-icons/im";

function ProfileButton({ user, setIsOpen }) {
  console.log("user", user);
  return (
    <Button
      style={{ margin: 5 }}
      variant="outlined"
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <ImProfile size={20} style={{ marginRight: 5 }} />
      {user ? user.name : "Login"}
    </Button>
  );
}

export default ProfileButton;

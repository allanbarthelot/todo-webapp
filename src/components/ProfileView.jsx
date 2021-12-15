import React from "react";
import { MdLogout } from "react-icons/md";

import { TextField, Button } from "@mui/material";

function ProfileView({ user, logout, setIsOpen }) {
  const logoutAction = () => {
    if (
      window.confirm(
        "Are you sure you want to logout? You data will not be visible or synced anymore"
      )
    ) {
      logout();
      setIsOpen();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: 50,
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 50,
          backgroundColor: "#3498db",
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          color: "#ffffff",
          justifyContent: "center",
        }}
      >
        <div style={{fontSize:24}}>{user.name}</div>
        <div>{user.email}</div>
      </div>
      <div
        style={{
          padding: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          borderRadius: 3,
        }}
      >
        <Button
          style={{ margin: 5 }}
          variant="outlined"
          onClick={() => {
            logoutAction();
          }}
        >
          <MdLogout size={20} />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default ProfileView;

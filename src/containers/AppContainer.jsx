import React, { useState, useEffect } from "react";
import ProfileModal from "../components/ProfileModal";
import TodoList from "./TodoContainer";

import {
  login,
  getMe,
  logout,
  verifyAccount,
  signup,
} from "../redux/user/actions";
import { connect } from "react-redux";
import ProfileButton from "../components/ProfileButton";

function TodoHome({
  user,
  userLoading,
  login,
  logout,
  signup,
  getMe,
  verifyAccount,
  accountExists,
  selectedList,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "#3498db",
        }}
      >
        <ProfileButton user={user} setIsOpen={setIsOpen} />
      </div>
      <ProfileModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        userLoading={userLoading}
        login={login}
        signup={signup}
        logout={logout}
        verifyAccount={verifyAccount}
        accountExists={accountExists}
      />

      <TodoList
        className={"TodoList"}
        user={user}
        selectedList={selectedList}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    userLoading: state.user.userLoading,
    accountExists: state.user.accountExists,

    selectedList: state.lists.selectedList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    },
    signup: (name, email, password) => {
      dispatch(signup(name, email, password));
    },
    verifyAccount: (email) => {
      dispatch(verifyAccount(email));
    },
    getMe: () => {
      dispatch(getMe());
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoHome);

import Modal from "@mui/material/Modal";
import LoginView from "./ProfileLoginView";
import ProfileView from "./ProfileView";

function ProfileModal({
  isOpen,
  setIsOpen,
  login,
  signup,
  logout,
  user,
  userLoading,
  verifyAccount,
  accountExists,
}) {
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div
        style={{
          width: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        {user ? (
          <ProfileView user={user} logout={logout} setIsOpen={setIsOpen} />
        ) : (
          <LoginView
            verifyAccount={verifyAccount}
            login={login}
            signup={signup}
            user={userLoading}
            accountExists={accountExists}
          />
        )}
      </div>
    </Modal>
  );
}

export default ProfileModal;

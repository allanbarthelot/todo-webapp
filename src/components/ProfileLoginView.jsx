import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

function LoginView({ login, verifyAccount, signup, accountExists }) {
  const [onboardStep, setOnboardStep] = useState(0);
  const [accountVerified, setAccountVerified] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState(() => false);

  const [actionText, setActionText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");

  useEffect(() => {
    if (accountVerified) {
      if (accountExists) setOnboardStep(1);
      else setOnboardStep(2);
    }
  }, [accountExists]);

  useEffect(() => {
    switch (onboardStep) {
      case 0:
        setValidation(email !== "");
        setActionText("Get started");
        setDescriptionText("You're one step closer to syncing your todos");
        break;
      case 1:
        setValidation(email !== "" && password !== "");
        setActionText("Login");
        setDescriptionText("Looks like you've already signed up");
        break;

      case 2:
        setValidation(name !== "" && email !== "" && password !== "");
        setActionText("Signup");
        setDescriptionText("Give us your name and a password and start");
        break;

      default:
        break;
    }
  }, [onboardStep, email, name, password]);

  const onboardAction = () => {
    switch (onboardStep) {
      case 0:
        verifyAccount(email);
        setAccountVerified(true);
        break;
      case 1:
        login(email, password);
        break;
      case 2:
        signup(name, email, password);
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
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
        {descriptionText}
      </div>

      <div
        style={{
          paddingBottom: 50,
          paddingRight: 50,
          paddingLeft: 50,
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
        }}
      >
        {onboardStep === 2 && (
          <TextField
            style={{ marginTop: 20, width: 340 }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (validation) onboardAction();
              }
            }}
          />
        )}

        <TextField
          style={{ marginTop: 20, width: 340 }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (validation) onboardAction();
            }
          }}
        />
        {onboardStep !== 0 && (
          <TextField
            style={{ marginTop: 20, width: 340 }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            password={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (validation) onboardAction();
              }
            }}
            type="password"
          />
        )}

        <Button
          style={{ marginTop: 50 }}
          variant="contained"
          onClick={() => {
            onboardAction();
          }}
          disabled={!validation}
        >
          {actionText}
        </Button>
      </div>
    </div>
  );
}

export default LoginView;

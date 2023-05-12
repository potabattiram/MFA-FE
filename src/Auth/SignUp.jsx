import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./styles.css";

import google from "./media/google.svg";
import facebook from "./media/facebook.svg";
import apple from "./media/apple.svg";

import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [state, setState] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, settoken] = useState("");
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [qrCode, setQrCode] = useState("");

  function SignUp() {
    if (username && password) {
      axios
        .post("http://localhost:9000/api/register", { username, password })
        .then((res) => {
          setState(2);
          console.log(res);
          setUserId(res.data.id);
          setQrCode(res.data.qrCode);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("username or password empty");
    }
  }

  function Verify() {
    if (username && password) {
      axios
        .post("http://localhost:9000/api/verify", { userId, token })
        .then((res) => {
          setState(3);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("username or password empty");
    }
  }

  return (
    <>
      <div id="mainDiv">
        {state === 1 ? (
          <>
            <h2>Sign Up</h2>

            <div id="inputDiv">
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div id="buttonsDiv">
              <Button variant="contained" onClick={() => SignUp()}>
                Sign Up!
              </Button>
            </div>
          </>
        ) : state === 2 ? (
          <>
            <h2>Verify your Identity using Authenticator App</h2>

            <div id="inputDiv">
              <img src={qrCode} style={{
                width: '10rem',
                height: '10rem'
              }} />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="number"
                onChange={(e) => settoken(e.target.value)}
              />
            </div>

            <div id="buttonsDiv">
              <Button variant="contained" onClick={() => Verify()}>
                Verify
              </Button>
            </div>
          </>
        ) : state === 3 ? (
          <>
            <h2>Successfully Authenticated!</h2>
          </>
        ) : null}

        <div className="registerMsg">
          Already have an account?{" "}
          <span style={{ color: "blue",cursor:"pointer" }} onClick={() => navigate("/login")}>
            Log In!
          </span>
        </div>
      </div>
    </>
  );
}

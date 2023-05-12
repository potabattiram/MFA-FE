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

  function SignUp() {
    if (username && password) {
      axios
        .post("http://localhost:9000/api/validate", { username, password })
        .then((res) => {
          setState(2);
          console.log({
            userId: res.data.userId,
          })
          setUserId(res.data.userId);
        })
        .catch((err) => {
          console.log(err)
        })
        
    } else {
      console.log("username or password empty");
    }
  }

  function Verify() {
      axios
        .post("http://localhost:9000/api/verify", { userId, token })
        .then((res) => {
          if(res.data.verified){
            setState(3);
          }
          else{
            console.log('errororos')
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <>
      <div id="mainDiv">
        {state === 1 ? (
          <>
            <h2>Log In</h2>

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
          <span style={{ color: "blue", cursor:"pointer" }} onClick={() => navigate("/sign-up")}>
            Sign Up!
          </span>
        </div>
      </div>
    </>
  );
}

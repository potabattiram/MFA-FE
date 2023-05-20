import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./styles.css";

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

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

  const [showerror,setShowerror] = useState(0);
  const [open, setOpen] = React.useState(true);

  function SignUp() {
    if (username && password) {
      axios
        .post("http://localhost:9000/api/validate", { username, password })
        .then((res) => {
          if(res.data.userId)
          {
            setState(2);
            console.log({
              userId: res.data.userId,
            })
            setUserId(res.data.userId);
          }
          else{
            console.log('here')
            setShowerror(true);
          }
          
        })
        .catch((err) => {
          console.log(err);
          setShowerror(1);

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
            console.log('errororos');
          setShowerror(2);

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
                Log In!
              </Button>
            </div>
            {showerror===1 && 
            <Alert variant="outlined" severity="error">
            User not registered!
          </Alert>
          }
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
            {showerror===2 && 
            <Alert variant="outlined" severity="error">
            OTP Incorrect!
          </Alert>
          }
          </>
        ) : state === 3 ? (
          <>
            <h2>Successfully Authenticated!</h2>
            <br/>
            <Button variant="contained" onClick={() => navigate('/')}>
                Logout
              </Button>
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

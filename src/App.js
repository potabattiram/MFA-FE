import React from 'react';
import {Navigate, Route,Routes} from 'react-router-dom';
import Home from './Admin/Home';
import './App.css';
import LandingPage from './Auth/LandingPage';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import axios from 'axios';

function App() {
  
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/sign-up" element={<SignUp/>}/>

        {/* <Route exact path="/admin/home" element={<NewTry/>}/> */}

      </Routes>
    </>
  );
}

export default App;

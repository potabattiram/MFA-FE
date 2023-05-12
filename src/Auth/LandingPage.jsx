import React from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import mainhome from "./media/mainhome.png";


export default function Login() {
    const navigate = useNavigate();
    return (
        <>
            <div id="mainDiv">
                <img src={mainhome} />
                <div id="redirectingButtons">
                    <button className="button-23" onClick={() => navigate('/login')}>Login</button>
                    <button className="button-23" onClick={() => navigate('/sign-up')}>Sign Up</button>
                </div>
            </div>
        </>
    )
}
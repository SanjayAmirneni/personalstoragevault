import React from "react";
import { useNavigate } from "react-router-dom";
import './SignOut.css'

function SignOut(){

    const navigate = useNavigate();


    function signin(){
        navigate('/')
    }


    return(
        <div className="signout__container">
        <h1 className="signout__header">Thankyou</h1>
        <button className="signin__button" onClick={signin}>Signin</button>
        </div>
    )
}

export default SignOut;
import React from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './View.css'

function View(props){

    const navigate = useNavigate();

    const reduxData = useSelector((storeData)=>{return storeData})

    const name = reduxData.ImageUrlReducer.image

    function back(){
        navigate('/home')
    }

    return (
        <div className="view__container">
                <h3 className="name">{name}</h3>
                <iframe className = 'iframe' src={`https://docs.google.com/gview?url=https://d32u7y0cmqkkuv.cloudfront.net/public/${reduxData.ImageUrlReducer.image}&embedded=true`}></iframe>
                <button className="item__button" onClick={back}>Back</button>
        </div>
    )
}

export default View;
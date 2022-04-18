import React from "react";
import { Link } from 'react-router-dom'
import './Links.css'

function Links(){

    return (
        <div className="home__links">
        <Link to='/newtextfile'>
        <button className="button">Text Editor</button>
        </Link>
        <Link to='/image'>
        <button className="button">Upload File</button>
        </Link>
        </div>
    )
}


export default Links;
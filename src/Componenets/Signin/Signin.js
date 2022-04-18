import React from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator } from "@aws-amplify/ui-react";
import Home from "../Home/Home";
import './Signin.css'
import addSignOut from "../../Action/addSignOut";
import {useNavigate} from 'react-router-dom'

function Signin(){

    const navigate = useNavigate();
    const { route } = useAuthenticator(context => [context.route]);

    return (
        <div className="signin__container">
            {/* <h1 className="header">Personal Storage Vault</h1> */}
            {/* <h1>Personal Storage Vault</h1> */}
            <Authenticator className="authenticator">       
            {({ signOut, user }) => (
             <main>
                 {/* {console.log(signOut)} */}
                 {/* <Button props={signOut} /> */}
                 {/* {console.log(signOut)}
                 {addSignOut(signOut)} */}
                 {/* return route === 'authenticated' ? <Home /> : <Signin /> */}
           
                {navigate('/home')}
                

             </main>
            )}
            </Authenticator>
        </div>
    )
}


export default Signin;
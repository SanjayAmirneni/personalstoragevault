import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createRoot } from "react-dom/client";
// import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import vault from './Redux/vault'
import {Provider} from 'react-redux'
import { Authenticator } from '@aws-amplify/ui-react';



Amplify.configure(config);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  
  <Provider store={vault}>
    <Authenticator.Provider>
    <App />
    </Authenticator.Provider>
     </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

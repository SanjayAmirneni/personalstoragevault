import { useEffect } from 'react';
import './App.css';
import Signin from './Componenets/Signin/Signin';
import "@aws-amplify/ui-react/styles.css"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './Componenets/Home/Home';
import NewTextFile from './Componenets/NewTextFile/NewTextFile';
import Image from './Componenets/Image/Image';
import Links from './Componenets/Links/Links';
import 'bootstrap/dist/css/bootstrap.css'
import {useSelector} from 'react-redux'
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import SignOut from './Componenets/SignOut/SignOut';
import View from './Componenets/View/View';
// import { Authenticator } from '@aws-amplify/ui-react';




function App() {

  const reduxData = useSelector((storeData)=>{
    return storeData
  })



  return ( 
<Authenticator.Provider>
    <Router>
    <div className="App">
                  <Routes>
                      <Route path='/' element={<Signin />} />
                      <Route path='/home' element={<div><Home /></div>} />
                      <Route path='/signout' element={<div><SignOut /></div>} />
                      <Route path='/newtextfile' element={<div className='text__file'><Links /><NewTextFile /></div>} />
                      <Route path='/image' element={<div className='text__file'><Links /><Image /></div>} />
                      <Route path='/view' element={<View />} />
                      {/* <Route path='/item' element={<div className='text__file'><Links /><Item props={reduxData.itemReducer.item}/></div>} /> */}
                  </Routes>
              </div>
    </Router>
    </Authenticator.Provider>
  );
}

export default App;

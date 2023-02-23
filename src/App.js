import React from 'react'
import {useEffect } from 'react'
import Footer from './components/Footer'
import Home from './Home'
import Rules from './Rules'
import Builders from './Builders'
import ComingSoon from './ComingSoon'
import Hamburger from './components/Hamburger'

import {Routes, Route} from "react-router-dom";





function App() {
  return (

        <div className="wrapper">
        <div id="CRT"></div>
        <div id="noise"></div>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rules" element={<Rules/>}/>
              <Route path="/builders" element={<Builders/>}/>
            <Route path="/comingsoon" element={<ComingSoon/>}/>
          </Routes>
          <Hamburger/>
          <Footer/>
        </div>

  );
}

export default App;

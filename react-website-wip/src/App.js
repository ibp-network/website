import React from 'react'
import Footer from './components/Footer'
import Home from './Home'
import Rules from './Rules'

import {Routes, Route} from "react-router-dom";


function App() {
  return (

        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rules" element={<Rules/>}/>
          </Routes>
          <Footer/>
        </div>

  );
}

export default App;

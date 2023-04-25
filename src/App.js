import React from 'react'
import Header from './components/Header'
import Home from './Home'
import Rules from './Rules'
import Builders from './Builders'
import ComingSoon from './ComingSoon'
import Map from './Map'
import {Routes, Route} from "react-router-dom";
import Footer from './components/Footer'


function App() {
  return (

        <div className="wrapper">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rules" element={<Rules/>}/>
            <Route path="/builders" element={<Builders/>}/>
            <Route path="/comingsoon" element={<ComingSoon/>}/>
            <Route path="/map" element={<Map/>}/>
          </Routes>
        <Footer/>
        </div>

  );
}

export default App;

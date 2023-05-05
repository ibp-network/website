import React from 'react'
import Header from './components/Header'
import Home from './Home'
import Rules from './Rules'
import Builders from './Builders'
import ComingSoon from './ComingSoon'
import Map from './Map'
import {Routes, Route} from "react-router-dom";
import Footer from './components/Footer'
import {useState, useEffect} from 'react'


function App() {
  var [display, changeDisplay] = useState('block');

  function displayFooter(){
    var base = window.location.origin;
    if(window.location.href === base + '/map'){
      changeDisplay('none');
    }
    else{
      changeDisplay('block');
    }
  }

  useEffect(() => {
    window.addEventListener('click', (e) => { displayFooter()});
  });

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
          <div style={{display: `${display}`}}>
            <Footer/>
          </div>
        </div>

  );
}



export default App;

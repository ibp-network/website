import React from 'react'
import Header from './components/Header'
import Home from './Home'
import Rules from './Rules'
import Builders from './Builders'
import ComingSoon from './ComingSoon'
import Map from './Map'
import {Routes, Route, useLocation} from "react-router-dom";
import Footer from './components/Footer'
import {useState, useEffect} from 'react'


function App() {

  const location = useLocation();
  const [display, changeDisplay] = useState('block');

  useEffect(() => {
      // execute on location change
      if(location.pathname === '/map' || location.pathname === '/rules'){
        changeDisplay('none');
      }
      else{
        changeDisplay('block');
      }
  }, [location]);

  return (

        <div className="wrapper">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/rules" element={<Rules/>}/>
            //<Route path="/builders" element={<Builders/>}/>
            <Route path="/comingsoon" element={<ComingSoon/>}/>
            <Route path="/map" element={<Map/>}/>
          </Routes>
          <div style={{display: display}}>
            <Footer/>
          </div>

        </div>

  );
}



export default App;

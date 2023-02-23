import React, {useState} from 'react'
import Button from './Button'
import {Link} from "react-router-dom";


export default function Hamburger(){
    var [display, changeDisplay] = useState('hide');
    return(
      <>
        <div onClick={() =>{
          if(display == 'hide'){
            changeDisplay('show');
          }
          else{
            changeDisplay('hide');
          }
        }} className={`hamburger-container right-align ${display}`}>
        <img src="img/hamburger.svg"/>
        </div>

        <div className={`big-menu-container col center ${display}`}>

          <div className={'flex center col'}>
            <div onClick={() => {
              if(display == 'hide'){
                changeDisplay('show');
              }
              else{
                changeDisplay('hide');
              }
            }}>
              <Link to={'/'}><h3>Home</h3></Link>
            </div>


            <div onClick={() => {
              if(display == 'hide'){
                changeDisplay('show');
              }
              else{
                changeDisplay('hide');
              }
            }}>
              <Link to={'/rules'}><h3>Rules</h3></Link>
            </div>

            <div onClick={() => {
              if(display == 'hide'){
                changeDisplay('show');
              }
              else{
                changeDisplay('hide');
              }
            }}>
              <Link to={'/builders'}><h3>Builders</h3></Link>
            </div>

            <div onClick={() => {
              if(display == 'hide'){
                changeDisplay('show');
              }
              else{
                changeDisplay('hide');
              }
            }}>
              <Link to={'/comingsoon'}><h3>Map</h3></Link>
            </div>

            <br/>
            <a href='https://forms.gle/dbsyK4KPEJ8N4Qmz5' target='_blank'><h3>Apply</h3></a>
            <div onClick={() => {
              if(display == 'hide'){
                changeDisplay('show');
              }
              else{
                changeDisplay('hide');
              }
            }} className={`flex center close`} style={{marginTop: '2rem'}}>
              <h4>Close&nbsp;</h4>
              <h4 className={'flex center'} style={{padding:'0.25rem'}}>&nbsp;X</h4>
            </div>


          </div>

        </div>

      </>
    )
}

function Item({name, link, changeDisplay, display}){

  return(
  <div onClick={() => {
    if(display == 'hide'){
      changeDisplay('show');
    }
    else{
      changeDisplay('hide');
    }
  }}><Link to={link}><h3>{name}</h3></Link></div>)
}

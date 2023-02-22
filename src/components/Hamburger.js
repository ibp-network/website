import React, {useState} from 'react'
import Button from './Button'

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
            <a href='/'><h3>Home</h3></a>
            <a href='/rules'><h3>Rules</h3></a>
            <a href='/builders'><h3>Builders</h3></a>
            <a href='/comingsoon'><h3>Map</h3></a>
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

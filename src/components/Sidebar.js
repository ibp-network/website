import React from 'react'
import {useState} from 'react'
import Button from './Button'

export default function Sidebar() {
  function makeListItem(list, items, isPink){
    let color = "";
    let fontWeight = "";
    let title = 'Hobbyist';

    if(isPink){
      color = "alt";
      fontWeight = 400;
      title = 'Pro'
    }

    for(var i = 0; i < list.length; i++)
    {
      items.push(
        <div className={'flex row center'}>
        <a href={`#${title}-${i+1}`} className={`flex col dropdown-item ${color}`}>
            <h4>{"Milestone " + (i + 1)} </h4>
            <p style={{fontWeight: fontWeight }}>{list[i]}</p>

          </a>
        <div className={'indicator'}></div>
        </div>
      );
    }
  }

  //For mobile layout only
  var [display, changeDisplay] = useState('hide');

  const displayMap = ['none', 'block'];
  const arrowMap = [ 90, 270];

  const [showHobby, hobbyDisplay] = useState(0);
  const [showPro, proDisplay] = useState(0);

  //Contains descriptions
  let hobbyist = [
    "Launch 2 full archive nodes for Kusama & Polkadot...",
    "Launch 2 full archive nodes for supported parachains...",
    "Develop tools & applications for the IBP..."

  ];
  let professional = [
    "Launch 3 boot nodes for Westend, Kusama and Polkadot",
    "Interview & assessment to review existing work",
    "Launch RPC services for 3 relay chains",
    "Bootnodes for common-good parachains",
    "Join community operated snapshot service",
    "Complete 2 of the following tasks...",
    "Operate a nomination pool for the treasury..."
  ];

  //array contains components of the descriptions
  let hItems = [];
  let pItems = [];


  makeListItem(hobbyist, hItems, false);
  makeListItem(professional, pItems, true);

  return(
    <>

    <div className={ `sidebar-container col ${display}` }>

      <div onClick={() => {
        if(display == 'hide'){
          changeDisplay('show');
        }
        else{
          changeDisplay('hide');
        }
      }} className={`right-align flex center close`}>
        <h4>Close&nbsp;</h4>
        <h4 className={'flex center'} style={{padding:'0.25rem'}}>&nbsp;X</h4>
      </div>

      <ul>
        <li><h4> Milestone Map</h4></li>
          <li><a href="#Prerequisites" className={"dropdown-item"}><h4> Prerequisites</h4> <div className={'indicator'}></div></a></li>
          <li><a href="#1000 Validators-1" className={"dropdown-item"}><h4> Launch 2 KSM Validators</h4> <div className={'indicator'}></div></a></li>
          <li><a href="#1000 Validators-2" className={"dropdown-item"}><h4> Launch 1 DOT Validator</h4> <div className={'indicator'}></div></a></li>
        <li>
          <div onClick={() =>{
            if(showHobby == 0){
              hobbyDisplay(1);
            }
            else{
              hobbyDisplay(0);
            }
          }}
           id="hobby-drop" style={{borderColor: 'white'}} className={"dropdown"}>
            <h4> Hobbyist Milestones</h4>
            <h3 style={{transform: `rotate(${arrowMap[showHobby]}deg)`}} className={'arrow-up'}>&#60;</h3>
          </div>
          <div style={{display: displayMap[showHobby] }}>
            {hItems}
          </div>
        </li>

        <li>
          <div onClick={() =>{
            if(showPro == 0){
              proDisplay(1);
            }
            else{
              proDisplay(0);
            }
          }}
          id="pro-drop" className={"dropdown"}>
            <h4 className="alt"> Pro Milestones</h4>
            <h3 style={{transform: `rotate(${arrowMap[showPro]}deg)`}} className={"arrow-up alt"}>&#60;</h3>
          </div>
          <div id="pro-menu" style={{display: displayMap[showPro]}}>
            {pItems}
          </div>
        </li>

      </ul>
</div>
    //For mobile responsive layout only
    <div onClick={() =>{
      if(display == 'hide'){
        changeDisplay('show');
      }
      else{
        changeDisplay('hide');
      }
    }} className={`sidebar-popout-container flex ${display}`}>
      <div className={`sidebar-popout-content flex center `} >
        <h4> Menu  </h4>
        <h3> &nbsp; &#62; </h3>
      </div>
    </div>

    </>
  )
}

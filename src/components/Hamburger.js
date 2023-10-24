import React, {useState, useEffect, useRef} from 'react'
import {Link} from "react-router-dom";
import {MenuItem} from './TextComponents'


export default function Hamburger(){
  const [wikiLink, setLink] = useState('https://wiki.dotters.network/');
  var inputRef = useRef();

  function displayChange(){
    if(display === 'hide'){
      inputRef.current.checked = true;
      changeDisplay('show');
    }
    else{
      inputRef.current.checked = false;
      changeDisplay('hide');
    }
  }

  useEffect(() => {
    const url = window.location.href;
    if(url === 'https://ibp.network/'){
      setLink('https://wiki.ibp.network/');
    }
  }, []);

    var [display, changeDisplay] = useState('hide');

    function Item({text, link, isBig, target}){

      if(isBig){
        if(target){
          return(
            <a href={link} target='_blank' rel="noreferrer">
              <MenuItem classes={'alt'} isBig={true} text={text}/>
            </a>
          );
        }

        return(
        <div>
          <Link to={link}>
          <MenuItem classes={'alt'} isBig={true} text={text}/>
          </Link>
        </div>);

      }
      if(target){
        return(
          <a href={link} target='_blank' rel="noreferrer">
            <MenuItem classes={'alt'} text={text}/>
          </a>
        );
      }
      return(
      <div>
        <Link to={link}>
          <MenuItem classes={'alt'} text={text}/>
        </Link>
      </div>
    );
  }

    return(
      <>
      <div className={'header-container'} >
          <Link to={'/'}>
            <div onClick={() => {
            if (display === 'show'){
              inputRef.current.checked = false;
              changeDisplay('hide');
            }}} className={'home-icon'} >
              <h5 >ibp</h5>
            </div>
          </Link>

          <div className={'right-align'} onClick={() =>{
            displayChange()
          }}>

            	<div className="menu-icon" >
            		<input ref={inputRef} className="menu-icon__cheeckbox" type="checkbox" />
            		<div>
            			<span></span>
            			<span></span>

            		</div>
            	</div>

          </div>
        </div>

        <div className={`big-menu-container   ${display}`}>

          <div className={'flex center'}>

            <div className={'flex left-align col'}>
              <div onClick={() => displayChange()}>
                <Item text='Contact' target={'_blank'} link='https://matrix.to/#/!tNVRcjndUHhSDzCKFF:matrix.org?via=parity.io&via=matrix.org&via=matrix.parity.io' isBig={true}/>
              </div>

              <div onClick={() => displayChange()}>
                <Item text='Service Map' link='/map' isBig={true}/>
              </div>

              <div onClick={() => displayChange()}>
                <Item text='Apply' link='https://forms.gle/dbsyK4KPEJ8N4Qmz5' target='_blank' isBig={true}/>
              </div>

            </div>

            <div className={'flex right-align col'}>
              <div onClick={() => displayChange()}>
                <Item text='The Builders' link='/builders'/>
              </div>

              <div onClick={() => displayChange()}>
                <Item text='Member Rules' link='/rules'/>
              </div>

              <div onClick={() => displayChange()}>
                <Item text='Service Monitor' target={'_blank'} link='https://monitor.dotters.network/'/>
              </div>

              <div onClick={() => displayChange()}>
                <Item text='The Wiki' target={'_blank'} link={wikiLink}/>
              </div>
            </div>
          </div>

        </div>

      </>
    )
}

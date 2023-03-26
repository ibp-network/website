import React from 'react';
import {Link} from "react-router-dom";
import {useState, useEffect} from 'react';


export default function Footer() {
  const [wikiLink, setLink] = useState('https://wiki.dotters.network/');
  useEffect(() => {
    const url = window.location.href;
    if(url == 'https://ibp.network/'){
      setLink('https://wiki.ibp.network/');
    }
  });

  return(

      <footer>
        <div className="footer-pair">
          <FooterItem name="Home" link="/"/>
          <FooterItem name="Rules" link="/rules"/>
        </div>

        <div className="footer-pair">
          <FooterItem name="Apply" link='https://forms.gle/dbsyK4KPEJ8N4Qmz5' target='_blank'/>
          <FooterItem name="Builders" link='/builders' />
        </div>

        <div className="footer-pair">
          <FooterItem name="Map" link='/map'/>
          <FooterItem name="Health" link='https://monitor.dotters.network/' target='_blank' />
        </div>

        <div className="footer-pair">
          <FooterItem name="wiki" link={wikiLink} target='_blank'/>
        </div>

      </footer>

  )
}


function FooterItem({name, link, target}){
  var destination = link;
  if(link == null){
    destination = "comingsoon";
  }
  if(target != null){

    return(
      <a href={link} target={target}>
        <div className="footer-item">
            <div className="footer-indicator">
              <h3 className="arrow-up dark">&#60; &nbsp;</h3>
              <h3 className="dark">{name[0]}</h3>
            </div>

            <h3 className="footer-text">{name}</h3>
          </div>
        </a>
      );
  }
  return(
    <Link to={destination}>
      <div className="footer-item">
          <div className="footer-indicator">
            <h3 className="arrow-up dark">&#60; &nbsp;</h3>
            <h3 className="dark">{name[0]}</h3>
          </div>

          <h3 className="footer-text">{name}</h3>
        </div>
      </Link>
  )
}

import React from 'react'
import {Link} from "react-router-dom";


export default function Button({content, icon, link, target, isLight}) {
  var iconComponent;
  var text;
  var destination;
  var light;

  if(isLight){
    light = 'alt';
  }
  destination = link;
  if(link == null){
    destination = 'ComingSoon';
  }
  if(icon != null){
    iconComponent = <div className={`button ${light}`}> <img style={{height: '2rem'}} src={`/img/${icon}`} alt='icon'/> </div>;
  }
  else{
    text =
    <div className={`flex button ${light}`} style={{justifyContent: 'center'}}>
        <h4>{content}</h4>
    </div>;
  }

  //Returns
  if(target != null){
    return(
      <a href={link} target={target}>
        <div>
            {text}
            {iconComponent}
        </div>
      </a>
    )
  }
  return(
    <Link to={destination}>

        <div>
          {text}
          {iconComponent}
        </div>

    </Link>
  )
}

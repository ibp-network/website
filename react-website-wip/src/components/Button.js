import React from 'react'
import {Link} from "react-router-dom";


export default function Button({content, icon, link}) {
  var iconComponent;
  var text;
  var destination;
  destination = link;
  if(link == null){
    destination = 'ComingSoon';
  }
  if(icon != null){
     iconComponent = <div style={{padding: '0.5rem'}} className={'button'}> <img style={{height: '2rem'}} src={`/img/${icon}`}/> </div>;
  }
  else{
    text = <div className={"button"}><h4 className={"alt"}>{content}</h4>  </div>;
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

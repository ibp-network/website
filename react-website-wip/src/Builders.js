import React, {useState} from 'react'
import Button from './components/Button'
import builders from './members.json'


export default function Builders(){


  var cards = [];
  for(var i = 0; i < builders.length; i++){
    cards.push(<BuilderCard name={builders[i].name}
                            level={builders[i].level}
                            element={builders[i].element}
                            icon={builders[i].icon}
                            url={builders[i].url}
                            org={builders[i].org}/>);
  }

  return(
    <div className="flex col center" style={{marginTop:'10%', marginBottom: '6rem'}}>
      <div className="flex col center" style={{width: '32rem'}}>
        <h1>Meet the <span className="alt">Builders!</span></h1>
        <p style={{textAlign: 'center'}}>The program is currently in proof-of-concept as we aim to validate the network design and reference hardware</p>
      </div>
      <div className="flex center card-container">
        {cards}

      </div>
    </div>
  )
}

function BuilderCard({name, level, element, icon, org, url}){
  return(
    <div className="builder-card-container flex center row">
    <img className="builder-icon" src={`${icon}`}/>
      <div>
        <h3>{name}</h3>
        <a href={url} target="_blank">
          <h4>{org}</h4>
        </a>
        <p>Level: <span className={'alt'}>{level}</span></p>
        <a className="link" href={`matrix.to/#/${element}`} target='_blank'>
          <p>{element}</p>
        </a>
      </div>
    </div>
  )
}

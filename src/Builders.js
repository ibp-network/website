import React, {useState} from 'react'
import Button from './components/Button'
import builders from './members.json'
import curators from './curators.json'


export default function Builders(){


  var proBuilders = [];
  var adminCurators = [];

  append(proBuilders, builders);
  append(adminCurators, curators);

  return(
    <>
    <div className="flex col center" style={{marginTop:'10%', marginBottom: '6rem'}}>
      <div className="flex col center" style={{width: '32rem'}}>
        <h1>Meet the <span className="alt">Curators!</span></h1>
        <p style={{textAlign: 'center'}}>The program is currently in proof-of-concept as we aim to validate the network design and reference hardware</p>
      </div>
      <div className="flex center card-container">
        {adminCurators}
      </div>
    </div>

    <div className="flex col center" style={{marginTop:'10%', marginBottom: '6rem'}}>
      <div className="flex col center" style={{width: '32rem'}}>
        <h1>Meet the <span className="alt">Builders!</span></h1>
        <p style={{textAlign: 'center'}}>The program is currently in proof-of-concept as we aim to validate the network design and reference hardware</p>
      </div>
      <div className="flex center card-container">
        {proBuilders}
      </div>
    </div>
    </>
  )
}

function append(array, json){
  for(var i = 0; i < json.length; i++){
    array.push(<BuilderCard name={json[i].name}
                            level={json[i].level}
                            element={json[i].element}
                            icon={json[i].icon}
                            url={json[i].url}
                            org={json[i].org}/>);
  }
}

function BuilderCard({name, level, element, icon, org, url}){
  return(
    <div className="builder-card-container flex center row">
      <div className="builder-icon" style={{backgroundImage: `url(${icon})`}}></div>
      <div>
        <h3>{name}</h3>
        <a href={url} target="_blank">
          <h4>{org}</h4>
        </a>
        <p>Level: <span className={'alt'}>{level}</span></p>
        <a className="link" href={`https://matrix.to/#/${element}`} target='_blank'>
          <p>{element}</p>
        </a>
      </div>
    </div>
  )
}

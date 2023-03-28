import React, {useState, useEffect} from 'react'
import Button from './components/Button'
import builders from './members.json'
import curators from './curators.json'


export default function Builders(){
  var proJson = JSON.parse(Get('https://raw.githubusercontent.com/ibp-network/config/main/members.json'));
  var memberKeys = Object.entries(proJson.members);
  var members = [];

  for(var i = 0; i < memberKeys.length; i++){
    members.push(memberKeys[i][1]);
  }

  console.log(members);
  var proBuilders = [];
  var adminCurators = [];

  append(proBuilders, members);
  append(adminCurators, curators);

  return(
    <>
    <div className="flex col center" style={{marginTop:'10%', marginBottom: '6rem'}}>
      <div className="flex col center" style={{width: '32rem'}}>
        <h1>Meet the <span className="alt">Curators!</span></h1>
        <p style={{textAlign: 'center'}}> Administrative Curators take oversight of the Infrastructure Builders Program, ensuring the health of the program.</p>
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
    var membership = '';
    if(json[i].membership == 'professional') membership = 'PRO'
    array.push(<BuilderCard name={json[i].name}
                            level={membership + ' ' + json[i].current_level}
                            element={json[i].element}
                            icon={json[i].logo}
                            url={json[i].website}
                            org={json[i].website}/>);
  }
}

function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",url,false);
        Httpreq.send(null);

    return Httpreq.responseText;
}

function BuilderCard({name, level, element, icon, org, url}){
  return(
    <div className="builder-card-container flex center row">
      <div className="builder-icon" style={{backgroundImage: `url(${icon})`}}></div>
      <div>
        <h3>{name}</h3>
        <a href={url} target="_blank">
          <p>{org}</p>
        </a>
        <p>Level: <span className={'alt'}>{level}</span></p>
        <a className="link" href={`https://matrix.to/#/${element}`} target='_blank'>
          <p>{element}</p>
        </a>
      </div>
    </div>
  )
}

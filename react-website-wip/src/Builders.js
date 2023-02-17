import React, {useState} from 'react'
import Button from './components/Button'

export default function Builders(){

  var icons[];
  var names[];

  return(
    <div className="container">
      <div>
        <h1>Meet the Builders! </h1>
        <p>The program is currently in proof-of-concept as we aim to validate the network designa nd reference hardware</p>
      </div>
    </div>
  )
}

function BuilderCard({name, level, element, icon}){
  return(
    <div className="builder-card-container">
      <img src={`/img/${icon}`}/>
      <h4>name</h4>
      <p>Level: ${level}</p>
      <a href={`${element}`}>
        <p>${element}</p>
      </a>
    </div>
  )
}

import React, {useState, useEffect} from 'react'
import Button from './components/Button'
import TypeText from './components/TypeText'


export default function Home() {
  return(
    <>
        <Hero/>
        <Join/>
        <Questions/>
    </>
  );
}

function Hero() {
  var gridItems = [];
  var grid = [];

  for(var i = 0; i < 30; i++){
    gridItems.push(<div className={"grid-item "}></div>);
  }

  for(var j = 0; j < 120; j++){
    grid.push(<div className="flex center col">{gridItems}</div>);
  }

    return(
      <div className={"container col"}>

        <div style={{pointerEvents:'none', width: '65%'}} className={"abs"}>
          <div className={"content flex col"}>

            <div>
              <h1 id="hero-line">Providing Core Infrastructure Services that are</h1>
              <TypeText text={['Decentralized', 'Autonomous', 'Fault-Tolerant', 'Self-Sustaining']}/>

              <h3>On Polkadot and Kusama</h3>
            </div>

            <div style={{marginTop:'1rem'}} className={'right-align flex col'}>
              <Button content="Learn More" link="/rules"/>
              <div id="hero-desc">
                <p>
                Operators in the program will lease rack space at unique facilities and deploy owned hardware to provide
                common endpoint and functionality for a variety of core infrastructure services (RPC, Snapshots, Boot nodes,
                Validators, Telemetry).
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="flex center row">
          {grid}
        </div>

        <div className="gradient-right"></div>
        <div className="gradient-left"></div>

      </div>
    )
}
function Join(){
  return(
    <div className={"container mini-container flex row"} style={{alignItems: "center", backgroundColor:'black'}}>
      <div style={{maxWidth: '32rem'}} className={"content"}>
        <h1>Join the Infrastructure Builders Program </h1>
        <p>
          Eligible members must be 1kV members with a rank of 25 or higher before applying
          for the Infrastructure Builders Program. Hardware must be your own and hosted in an
          independent data center.
        </p>
        <div className={"flex row"}>
          <Button content="Learn More" link="/rules"/>
          <Button content="Apply Now" link='https://forms.gle/dbsyK4KPEJ8N4Qmz5' target='_blank'/>
        </div>
      </div>


        <img className='half-image' src={'img/JoinIBP.svg'}/>

    </div>
  )
}

function Questions(){
  return(
    <>

    <div className={"mini-container flex row center"} style={{marginBottom: '4rem'}}>

        <img className={"abs square-image left"} src="/img/Questions.svg"/>

      <div className={"flex col center "} style={{width: '32rem', textAlign:'center'}}>
          <h1>Have questions?<br/> Join us in the discussion </h1>
          <p >
            The Infrastructure Builders Program is ongoing. Feel free to ask any questions or contribute new ideas on
            Polkassembly. We are always open to new minds and new ideas.
          </p>
          <div className={"flex row"}>
            <Button content="Discussion" link='https://kusama.polkassembly.io/post/1969' target='_blank'/>
            <Button icon="element-icon.svg"/>
            <Button icon="github-icon.svg" link='https://github.com/dotsama-ibp/website' target='_blank'/>
          </div>
        </div>

          <img className={"abs square-image right"} style={{transform: "scale(-1)"}} src="/img/Questions.svg"/>

            <div className="gradient" style={{left: '0'}}></div>
            <div className="gradient" style={{right: '0', transform: 'scale(-1)'}}></div>

      </div>
    </>
  )
}

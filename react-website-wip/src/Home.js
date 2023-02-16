import React, {useState} from 'react'
import Button from './components/Button'
import joinImage from './assets/img/JoinIBP.svg'
import questions from './assets/img/Questions.svg'

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
              <h1 style={{maxWidth: "42rem"}}>Providing Core Infrastructure Services that are</h1>
              <h1 style={{color: "var(--pink)", fontSize: "4rem"}}> Decentralized_</h1>
              <h3>On Polkadot and Kusama</h3>
            </div>

            <div style={{marginTop:'1rem'}} className={'right-align flex col'}>
              <Button content="Learn More" link="/rules"/>
              <div style={{maxWidth: "39rem", marginTop: "1rem"}}>
                <p>
                Operators in the program will lease rack space at unique facilities and deploy owned hardware to provide
                common endpoint and functionalityfor a variety of core infrastructure services (RPC, Snapshots, Boot nodes,
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
          <Button content="Apply Now"/>
        </div>
      </div>


        <img style={{objectFit: 'cover', height:'100%', width: '40%'}} src={joinImage}/>

    </div>
  )
}

function Questions(){
  return(
    <>

    <div className={"mini-container flex row center"} style={{marginBottom: '4rem'}}>

        <img className={"abs square-image"} style={{ left: '-10%'}} src={questions}/>

      <div className={"flex col center "} style={{width: '32rem', textAlign:'center'}}>
          <h1>Have questions?<br/> Join us in the discussion </h1>
          <p >
            The Infrastructure Builders Program is ongoing. Feel free to ask any questions or contribute new ideas on
            Polkassembly. We are always open to new minds and new ideas.
          </p>
          <div className={"flex row"}>
            <Button content="Discussion"/>
          </div>
        </div>

          <img className={"abs square-image"} style={{transform: "scale(-1)", right: '-10%'}} src={questions}/>

            <div className="gradient-right" style={{left: '0', height: '50vh'}}></div>
            <div className="gradient-right" style={{right: '0',  height: '50vh', transform: 'scale(-1)'}}></div>

      </div>
    </>
  )
}

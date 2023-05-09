import React, {useState, useEffect, useRef} from 'react'
import Button from './components/Button'
import Banner from './components/Banner'
import Carousel from './components/Carousel'
import {H1, Cycle} from './components/TextComponents'
import anime from 'animejs'

export default function Home() {
  var iconContainer = useRef();
  var clientContainer = useRef();

  //Get JSON data
  var [json, setJson] = useState();
  var [isLoading, setLoading] = useState(true);

  async function setInfo(memberKeys){
    var data = [];
    for(var i = 0; i < memberKeys.length; i++){
      var mData = {name: '', website:'', logo: 'logo', level: 1};
      //Data needed for the popup of each marker, pushed onto markerData array
      mData.name      = memberKeys[i][1].name;
      mData.logo      = memberKeys[i][1].logo;

      if(mData.logo.length === 0){
        mData.logo = '/img/default-logo-2.jpg'
      }
      mData.level     = memberKeys[i][1].current_level;
      mData.website   = memberKeys[i][1].website;
      data.push(mData);
    }

    setJson(data);
  }

  useEffect(() =>{
    let options = {
      rootMargin: '0px',
      threshold: 1.0,
    }

    async function getJson() {
      try {
        let response = await fetch('https://raw.githubusercontent.com/ibp-network/config/main/members.json');
        let responseJson = await response.json();
        var memberKeys = Object.entries(responseJson.members);
        setInfo(memberKeys);
       }
      catch(error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    document.title = 'IBP | Home';
    if(isLoading){
      getJson();
    }

    var iconAnimator = anime({
      targets: '.service',
      translateY: ['2rem', 0],
      autoplay: false,
      opacity: [0, 1],
      easing: 'easeInOutQuad',
      delay: (el, i) => 250 * i
    });

    var clientAnimator = anime({
      targets: '.client',
      translateY: ['2rem', 0],
      autoplay: false,
      opacity: [0, 1],
      easing: 'easeInOutQuad',
      delay: (el, i) => 250 * i
    });

    var observer = new IntersectionObserver( ([entry]) => {
      if(entry.isIntersecting){
        iconAnimator.play();
        observer.unobserve(entry.target);
      }
    }, options);

    var clientObserver = new IntersectionObserver( ([entry]) => {
      if(entry.isIntersecting){
        clientAnimator.play();
        clientObserver.unobserve(entry.target);
      }
    }, options);

    observer.observe(iconContainer.current);
    clientObserver.observe(clientContainer.current);
    return () => {observer.disconnect(); clientObserver.disconnect()}
  }, [isLoading]);


    var arr = [];
    if(!isLoading || json){
      for(var i = 0; i < json.length; i++){
          arr.push(
            <Box key={i} logo={json[i].logo} name={json[i].name} level={json[i].level} website={json[i].website}/>
          );
      }
      arr = insertionSort(shuffle(arr));

    }


  return(
    <>
        <Hero/>
        <Impact/>
        <Services reference={iconContainer} />
        <Clients reference={clientContainer}/>

        <Carousel>
          {arr}
        </Carousel>
        <Questions/>
    </>
  );
}




function Box({logo, name, level, website}) {
  return(
  <div className={'flex col image-container'} style={{width: '32vmin'}}>
            <img className="image" alt={`${name}-logo`} src={logo} draggable="false" />
            <div className='flex row' style={{marginTop: '1rem', alignItems: 'center'}}>
              <h2 className='alt'>{name}</h2>
              <a style={{marginLeft: '0.5rem'}} href={website} target='_blank' rel="noreferrer">
                <img style={{width: '1rem'}} src='/img/launch-icon.svg' alt={'website'}/>
              </a>
            </div>
            <div className='flex row'>
              <p className='alt label'>LEVEL&nbsp;{level} </p>
              <p className='alt label' style={{marginLeft: '1rem'}}>pro builder</p>
            </div>
          </div>);
}


function Hero() {
    return(
      <>
        <div className={'container'}>
          <div className={'max-container flex center'}>
            <Circles/>
            <Circles/>
          </div>

          <div className={'flex row abs center'} style={{width: '100vw', height: '95%', left: '-12vw'}}>
            <img className={'wires'} src="img/Group 3.svg" alt='wires'/>

            <div className={'flex col'}>
              <H1 id='hero-line' text='powering dotsama from all around the world'/>
              <p id='hero-tag'>providing core infrastructure services that are <Cycle text={['decentralized', 'autonomous','impressive', 'dependable']} target='tagline-1'/></p>
            </div>

            <img className={'wires'} src="img/Group 2.svg" alt='wires-2'/>
          </div>
        </div>
      </>
    )
}

function Circles(){
  return(
    <>
    <div className={'circle'}>
      <div className={'circle'}>
        <div className={'circle'}></div>
      </div>
    </div>
    </>
  );
}

function Impact(){
  return(
    <>
      <div className={'container flex col'} style={{position: 'relative'}}>
        <Banner width="100%" height="95%" source="/img/world.png"/>
        <div style={{width: '124vw', backgroundColor: '#f2f2f2', height: '10rem', left:'-12vw',position: 'absolute', bottom:'0px'}}/>
      </div>
    </>);
}


function Services({reference}){
  return(
    <div className={'flex col'} style={{backgroundColor: '#f2f2f2',  position: 'relative', alignItems:'center', paddingBottom: '6%'}}>

      <p className={'alt'}>- services we provide -</p>

      <div ref={reference} className={'flex row'}>
      </div>

      <div className={'flex row stats-container'}>
        <div className={'flex col'}>

          <div className={'service icon inline-flex col center'}>
            <img src='/img/RPC.svg' alt='rpc svg'/>
            <p className={'alt label'}>RPC endpoints</p>
          </div>

          <div>
            <h6>99.9% uptime ––</h6>
            <p className={'alt'}>
              the world does not sleep and neither do our nodes. our nodes operate at 99.9% uptime.
            </p>
          </div>
        </div>

        <div className={'flex col'}>
          <div className={'service icon inline-flex col center'}>
            <img src='/img/BootNodes.svg' alt='bootnode svg'/>
            <p className={'alt label'}>boot nodes</p>
          </div>

          <div>
            <h6>under 100ms ––</h6>
            <p className={'alt'}>
              experience the synergy of rapid support and exceptional performance for maximum productivity.
            </p>
          </div>
        </div>

        <div className={'flex col'}>
        <div className={'service icon inline-flex col center'}>
          <img src='/img/DBSnapshot.svg' alt='db snapshot svg'/>
          <p className={'alt label'}>indexer nodes</p>
        </div>
          <div>
            <h6>worldwide service ––</h6>
            <p className={'alt'}>
              leverage the power of our globally distributed nodes, providing comprehensive coverage across continents.
            </p>
          </div>
        </div>
      </div>

      <Button content="Contact Us" target={'_blank'} link={'https://matrix.to/#/!tNVRcjndUHhSDzCKFF:matrix.org?via=parity.io&via=matrix.org&via=matrix.parity.io'} isLight={true}/>

    </div>
  );
}



function Clients({reference}){
  return(
    <div className={'flex mini-container center col'} style={{backgroundColor: '#D9D9D9',  position: 'relative'}}>
      <p ref={reference}  className={'alt'}>- we are building for -</p>
      <div  className={'client-container flex row'}>

        <div className={'client icon'}>
          <img src='/img/client-icons/Encointer.svg' alt='Encointer'/>
        </div>


        <div className={'client icon'}>
          <img src='/img/client-icons/Polkadot.svg' alt='Polkadot'/>
        </div>

        <div className={'client icon'}>
          <img src='/img/client-icons/Kusama.svg' alt='Kusama'/>
        </div>

        <div className={'client icon'}>
          <img src='/img/client-icons/Statemine.svg' alt='Statemine'/>
        </div>

        <div className={'client icon'}>
          <img src='/img/client-icons/Bridgehub.svg' alt='Bridgehub'/>
        </div>
      </div>
    </div>
  );
}

function Questions(){
  return(
    <div className='questions-container flex' style={{backgroundColor: '#f4f4f4',  position: 'relative'}}>
      <div className='flex questions-header' style={{marginTop: '5rem', marginLeft: '10vw'}}>
        <div className='flex'>
          <H1 id="haveQuestions" classes='alt' text='have questions?'/>
          <H1 id="sayHi" classes='alt' text='come say hi!'/>
        </div>
        <div className='flex col' style={{justifyContent: 'center'}}>
          <p className='alt' style={{width: '15rem'}}>Keep up to date with the latest IBP news on Element</p>
          <Button content='Element' link={'https://matrix.to/#/!tNVRcjndUHhSDzCKFF:matrix.org?via=parity.io&via=matrix.org&via=matrix.parity.io'} target={'_blank'} isLight={true}/>
        </div>
      </div>


    </div>
  );

}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function insertionSort(array) {
    let n = array.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = array[i];
            // The last element of our sorted subarray
            let j = i-1;
            while ((j > -1) && (current.props.level > array[j].props.level)) {
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = current;
        }
    return array;
}

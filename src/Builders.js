import React from 'react'
import {H1, Cycle} from './components/TextComponents'

export default function Builders(){
  document.title = 'IBP | Meet the Builders'
  var proJson = JSON.parse(Get('https://raw.githubusercontent.com/ibp-network/config/main/members.json'));
  var memberKeys = Object.entries(proJson.members);
  var members = [];

  for(var i = 0; i < memberKeys.length; i++){
    members.push(memberKeys[i][1]);
  }

  var proBuilders = [];

  append(proBuilders, members);

  return(
    <>
    <div style={{ backgroundColor: '#f4f4f4'}}>
      <div className="flex col center" style={{marginTop:'10%'}}>
        <div className="flex col center" >
          <div id="builder-headline">
            <H1 classes={'alt'} id={'builder-tagline'} text={'united by continents, together we empower success'}/>
          </div>
          <div className={'flex col center'} style={{backgroundColor: '#ffffff', marginTop: '12%', paddingBottom: '6%'}}>
            <img style={{width: '60%', top: '-3rem', position: 'relative'}} src='/img/teamwork.jpg' alt='teamwork.jpg'/>
            <div style={{width: '30rem'}}>
              <h3 className='alt'> Our mission is simple. </h3>
              <br/>
              <p className='alt'> to bring together an exceptional team of thinkers, makers and changers with ambitious project starters, to provide quality infrastructure services, to bring to life decentralized apps.</p>
              <br/>
              <p className='alt'> we provide infrastructure services that are
              <Cycle text={['decentralized', 'autonomous', 'powerful', 'reliable']} classes='alt'target={'tagline-3'}/>
              .&nbsp;let us provide for you.
              </p>
            </div>
          </div>
        </div>
        <div className="flex col center" style={{width: '100%', backgroundColor: '#f4f4f4', padding: '6% 12% 12% 12%'}} >
          <p className='alt'> - meet the builders - </p>
          <br/><br/>
          <div className="flex center card-container">
            {proBuilders}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function append(array, json){
  json = insertionSort(shuffle(json));
  var object = {name: '', level: '', element: '', logo: '', website: '', membership: ''};
  for(var i = 0; i < json.length; i++){
      //Data needed for the popup of each marker, pushed onto markerData array
      if(json[i].hasOwnProperty('name')){
        object.name      = json[i].name;
      }

      if(json[i].hasOwnProperty('membership')){
        object.membership = 'pro';
        if(json[i].membership !== 'professional'){
          object.membership = 'hobbyist';
        }
      }
      if(!json[i].hasOwnProperty('element')){
        object.element = json[i].element;
      }
      if(!json[i].hasOwnProperty('logo')){
        object.logo = '/img/default-logo-2.jpg';
      }
      else{
        object.logo      = json[i].logo;
        if(json[i].logo.length === 0){
          object.logo = '/img/default-logo-2.jpg';
        }
      }

      if(json[i].hasOwnProperty('current_level')){
        object.level     = json[i].current_level;
      }

      if(json[i].hasOwnProperty('website')){
        object.website   = json[i].website;
      }
    
    array.push(<BuilderCard name={object.name}
                            level={object.level}
                            element={object.element}
                            logo={object.logo}
                            website={object.website}
                            membership={object.membership}
                          />);
    }
  }


function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",url,false);
        Httpreq.send(null);

    return Httpreq.responseText;
}


function BuilderCard({logo, name, level, element, website, membership}) {
  return(
  <div className={'flex col image-container'} style={{width: '32vmin', marginRight: '4vmin', marginBottom: '4vmin'}}>
            <img className="image" src={logo} draggable="false" alt={`${name}-logo`} />
            <div className='flex row' style={{marginTop: '1rem'}}>
              <h2 className='alt'>{name}</h2>
              <a style={{marginLeft: '0.5rem'}} href={website} target='_blank' rel="noreferrer">
                <img style={{width: '1rem'}} src='/img/launch-icon.svg' alt={`${name}-website`}/>
              </a>
            </div>
            <div className='flex row'>
              <p className='alt label'>level&nbsp;{level} </p>
              <p className='alt label' style={{marginLeft: '1rem'}}>{membership} builder</p>
            </div>
          </div>);
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

            while ((j > -1) && (current.current_level > array[j].current_level)) {
                array[j+1] = array[j];
                j--;
            }
            array[j+1] = current;
        }
    return array;
}

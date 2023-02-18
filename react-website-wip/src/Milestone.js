import React from 'react'
import {useState} from 'react'
import proMilestones from './promilestones.json'
import Button from './components/Button'


function Milestone({type, index, details}){
  var toWhite = "";

  //The Hobbyist styling is in Black and White
  if(type == "Hobbyist"){
    toWhite = "white";
  }
  var other = [];
  var interview;
  var sla;
  var link;
  var tasksList = [];
  var [display, changeDisplay] = useState('none');
  var [arrow, rotateArrow] = useState(90);

  if(details.other != null){
    other = details.other;
  }

  //Show dropdowns for interview portion
  if(details.interview != null){
    interview =
    <>
      <p><b>{details.interview}</b></p>
      <DropDown title="Incorporation"     desc={details.incorporation} isWhite={toWhite}/>
      <DropDown title="Resume"            desc={details.resume} other={details.resumeDetails} isWhite={toWhite}/>
      <DropDown title="Location"          desc={details.location} isWhite={toWhite}/>
      <DropDown title="Renewable Targets" desc={details.renewable} isWhite={toWhite}/>
      <DropDown title="Sign & Verify"     desc={details.sign} isWhite={toWhite}/>
    </>
  }


  //Not all milestones have SLA
  if(details.sla != null){
    sla = <div className={`sla-container ${toWhite}`}>
            <Info title="Service Level Agreement" desc={details.sla} isWhite={toWhite}/>
          </div>;
  }

  //If milestone has button links
  if(details.link != null){
    link = <Button content={details.link[0]} link={details.link[1]}/>;
  }

//This is the regular layout
  return(
    <div id={`${type}-${index}`} className={`milestone-container ${toWhite}`}>
      <div className={`milestone-desc-container ${toWhite}`}>
        <h1 className={`alt ${toWhite}`}>{type} Milestone {index}</h1>
        <p className={`milestone-description ${toWhite}`}>{details.desc}</p>
      </div>

      <div style={{display: `${display}`}}>
      {interview}

        <div className="milestone-details-container">
          <div className="flex row reward-cost">
            <Info title="Reward" desc={details.reward} isWhite={toWhite}/>
            <Info title="Cost" desc={details.cost} isWhite={toWhite}/>
          </div>
          <Info title="Requirements" desc={details.req} other={other} isWhite={toWhite}/>
          <DropDown title="Rankings" desc={details.rankings} isWhite={toWhite}/>
        </div>
          {sla}
          <div className="flex center">
            {link}
          </div>
          </div>

          <div style={{marginTop: '2rem'}} className={'flex center'} onClick={() => {
              if(display == 'none'){
                changeDisplay('block');
                rotateArrow(270);
              }
              else{
                changeDisplay('none');
                rotateArrow(90);
              }
          }}>

            <h1 style={{transform: `rotate(${arrow}deg)`}} className={`arrow-up alt ${toWhite}`}>&#60;</h1>
          </div>
    </div>
  )
}

function Milestone7({type, index, details, isInterview}){
  var toWhite = "";
  if(type == "Hobbyist"){
    toWhite = "white";
  }
  var other = [];
  var interview;
  var sla;
  var tasksList = [];
  var [display, changeDisplay] = useState('none');
  var [arrow, rotateArrow] = useState(90);

  if(details.other != null){
    other = details.other;
  }

  if(details.interview != null){
    interview =
    <>
      <p><b>{details.interview}</b></p>
      <DropDown title="Incorporation"     desc={details.incorporation} isWhite={toWhite}/>
      <DropDown title="Resume"            desc={details.resume} other={details.resumeDetails} isWhite={toWhite}/>
      <DropDown title="Location"          desc={details.location} isWhite={toWhite}/>
      <DropDown title="Renewable Targets" desc={details.renewable} isWhite={toWhite}/>
      <DropDown title="Sign & Verify"     desc={details.sign} isWhite={toWhite}/>
    </>
  }

  //If milestone have SLA
  if(details.sla != null){
    sla = <div className={`sla-container ${toWhite}`}>
            <Info title="Service Level Agreement" desc={details.sla} isWhite={toWhite}/>
          </div>;
  }


  //If milestone is broken up into mini-tasks
  if(details.tasks != null){
    for(var i = 0; i < details.tasks.length; i++){
      tasksList.push(
            <div className={"sla-container tasks-container"}>
              <Info title="Task" desc={details.tasks[i]}/>
              <Info title="Reward" desc={details.reward[i]}/>
            </div>);
    }
    return(
      <div id={`${type}-${index}`} className={`milestone-container ${toWhite}`}>
        <div className='milestone-desc-container'>
          <h1 className={`alt ${toWhite}`}>{type} Milestone {index}</h1>
          <p className={`${toWhite}`}>{details.desc}</p>
        </div>
        <div className={"flex center"} onClick={() => {
            if(display == 'none'){
              changeDisplay('block');
              rotateArrow(270);
            }
            else{
              changeDisplay('none');
              rotateArrow(90);
            }
        }}>
          <h1 style={{transform: `rotate(${arrow}deg)`}} className="arrow-up alt">&#60;</h1>
        </div>
        <div style={{display: `${display}`}}>
          <div className="milestone-details-container">
            <Info title="Requirements" desc={details.req} other={other}/>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {tasksList}
          </div>
        </div>
      </div>
    )
  }
}

function Info({title, desc, other, isWhite}){
  var descriptions = [];
  var otherDescriptions = [];
  if(other != null){
    for(var i = 0; i < other.length; i++){
      otherDescriptions.push(<p className={`milestone-description milestone-other ${isWhite}`}>{other[i]}</p>);
    }
  }


  if(desc != null){
    for(var i = 0; i < desc.length; i++){
      descriptions.push(<p className={`milestone-description ${isWhite}`}>{desc[i]}</p>);
    }
    return(
      <div style={{marginTop: '1rem'}} className="flex col">
        <div className="flex col">
          <h3 className={`alt ${isWhite}`}>{title}</h3>
          {descriptions}
          {otherDescriptions}
        </div>
      </div>
    )
  }
  else{
    return(<></>);
  }
}

function DropDown({title, desc, other, isWhite}){

  var descriptions = [];
  var otherDescriptions = [];

  var [details, detailsShow] = useState('none');
  var [rotate, changeRotate] = useState(90);

  if(other != null){
    for(var i = 0; i < other.length; i++){
      otherDescriptions.push(<p className={`milestone-description milestone-other ${isWhite}`}>{other[i]}</p>);
    }
  }
  if(desc == null){
    return(<></>);
  }
  for(var i = 0; i < desc.length; i++){
    descriptions.push(<p className={`milestone-description ${isWhite}`}>{desc[i]}</p>);
  }

  return(
    <div className="flex col">
      <div className="flex col">
        <div onClick={ () => {
            if(details == 'none'){
              detailsShow('block');
              changeRotate(270);
            }
            else{
              detailsShow('none');
              changeRotate(90);
            }
          }
        } className={`flex border-box ${isWhite}`}>
          <h3 className={`alt ${isWhite}`}>{title}</h3>
          <h3 style={{transform:`rotate(${rotate}deg)`, left: '0px'}} className={`alt arrow-up right-align ${isWhite}`}> &#60;</h3>
        </div>
        <div style={{display: `${details}`}}>
          {descriptions}
          <div style={{marginLeft: '1rem'}}>
            {otherDescriptions}
          </div>
        </div>

      </div>
    </div>
  )
}
/*
function useOnScreen(ref: RefObject<HTMLElement>) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  ), [ref])


  useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}
*/
export {DropDown, Info, Milestone, Milestone7};

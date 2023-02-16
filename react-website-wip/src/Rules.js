import React from 'react'
import Button from './components/Button'
import Sidebar from './components/Sidebar'
import {Milestone, Milestone7, Info} from './Milestone'
import proMilestones from './promilestones.json'
import hobbyistMilestones from './hobbyistmilestones.json'
import thousandMilestones from './1kv.json'


export default function Rules() {
  const thousand = thousandMilestones;
  const pro = proMilestones;
  const hobby = hobbyistMilestones;

  const milestones = [];
  const hobbyistMilestonesList = [];
  const thousandMilestonesList = [];

  for(var i = 0; i < thousandMilestones.length; i++){
    thousandMilestonesList.push(<Milestone type={"1000 Validators"} index={i+1} details={thousand[i]}/>);
  }

  for(var i = 0; i < hobby.length; i++){
    hobbyistMilestonesList.push(<Milestone type={"Hobbyist"} index={i+1} details={hobby[i]} isInterview={false}/>);
  }

  for(var i = 0; i < pro.length; i++){
    var interview = false;
    if(pro[i].interview != null){
      interview = true;
    }

    if(i != 6){
      milestones.push(<Milestone type={"Pro"} index={i + 1} details={pro[i]}/>);
    }
    else{
      milestones.push(<Milestone7 type={'Pro'} index={i + 1} details={pro[i]}/>);
    }

  }

  return(
    <>
      <Sidebar/>
      <div className='flex center col'>
        <div className={'milestone-container'} style={{marginTop: '10rem'}}>
          <h1 style={{marginTop: '2rem'}}>Join us in building <br/> a <span className="alt">Decentralized</span> <br/> Network</h1>
          <div style={{marginTop: '2rem'}}>
            <h4>Prerequisites</h4>
            <p>Prospective members must already be 1000 Validator members prior to joining the Infrastructure Builders Program.
            The Infrastructure Builders
            Program provides 2 paths for you to choose from. Either Hobbyist or Pro.
          </p>
          </div>

          <div className={"flex row"} style={{marginTop: '2rem'}}>
            <div style={{width: '50%', paddingRight: '1rem'}}>
              <p>
                The <span>HOBBYIST</span> path is ideal for those who do not have as much time or
                 experience but still want to contribute to providing infrastructure services.
              </p>
            </div>

            <div style={{width: '50%'}}>
              <p>
                The <span className="alt">PRO</span> path is ideal for those who want to make a more full-time commitment to providing infrastructure services.
              </p>
            </div>

          </div>

          <p style={{marginTop: '2rem'}}>Want to join but don’t know where to start? Want to know what are the incentives
          and costs of each milestone? View our milestone map below to learn more!</p>

          <div className={'flex center'}>
            <p style={{color: 'var(--dark-grey)', marginTop: '5rem'}}>Costs, rewards and requirements will vary depending on the milestone.</p>
          </div>

        </div>
        
        <div style={{height: '15rem', border: '1px dashed var(--pink)'}}></div>
        {thousandMilestonesList}
        <div style={{height: '15rem', border: '1px dashed var(--pink)'}}></div>
        {hobbyistMilestonesList}
        <div style={{height: '15rem', border: '1px dashed var(--grey)'}}></div>
        {milestones}

        <div className={'milestone-container'} style={{marginBottom: '15rem', marginTop: '5rem'}}>
          <div className={`milestone-desc-container`}>
            <h1 className={`alt`}>Leaving Members</h1>
          </div>
          <Info  desc={['Members may withdraw from the program at any time for any reason but: The leaving member may be excluded from re-entry to the program at the discretion of Administrative Curators.',
                        'Members are expected to do a coordinated drawdown of service removing themselves from the system gracefully to avoid service interruption.',
                        'If a member leaves the program ungracefully they will be excluded from further participation in the program.']}/>
        </div>
      </div>
    </>
  );
}

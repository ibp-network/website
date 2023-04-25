import React from 'react'
import {MenuItem} from './TextComponents'
import {useState, useEffect} from 'react'

export default function Footer(){
  const [wikiLink, setLink] = useState('https://wiki.dotters.network/');
  useEffect(() => {
    const url = window.location.href;
    if(url === 'https://ibp.network/'){
      setLink('https://wiki.ibp.network/');
    }
  }, []);

  return(
  <footer className={'row'} style={{alignItems: 'center'}}>
    <div style={{marginTop: '2rem'}}>
      <MenuItem text='Get in touch'
                link={'https://matrix.to/#/!tNVRcjndUHhSDzCKFF:matrix.org?via=parity.io&via=matrix.org&via=matrix.parity.io'}/>

      <MenuItem text='Join the IBP'
                link={'https://docs.google.com/forms/u/3/d/e/1FAIpQLSdhCFsscVz66ZocyKfPQzmsmoR9Y_ZlfGGyAUBJ6ThZDS8hRQ/viewform?usp=send_form'}/>

      <MenuItem text='Explore the wiki'
                link={wikiLink}/>
    </div>

    <div className={'inline-flex center right-align'} style={{height: '100%'}}>
      <div className={'flex col footer-icons'} style={{marginTop: '2rem'}}>
        <div>
          <img className={'icon-large'} src="/img/builder-icons/DBSnapshot-dark.svg" alt='db snapshot svg'/>
          <img className={'icon-large'} src="/img/builder-icons/Bootnodes-dark.svg" alt='bootnodes svg'/>
          <img className={'icon-large'} src="/img/builder-icons/RPC-dark.svg" alt='rpc svg'/>
        </div>

        <p className='label' style={{opacity: '0.5', width: '50%'}}>infrastructure services that are decentralized</p>
      </div>
    </div>
  </footer>
);
}

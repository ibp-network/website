import React from 'react';

export default function Map(){
  document.title = 'IBP | Service Map';
  const url = window.location.origin + '/node-map.html';
  return(
    <>
      <div className={'gradient-bottom'} style={{width: '100vw', height: '10vh', top: '0', zIndex: '2', position: 'absolute'}}></div>
      <iframe style={{width: '100vw', height: '100vh', zIndex: '1'}} src={url} title="description"></iframe>
    </>
  )
}

import {useEffect, useState, useRef} from 'react';

export default function Map(){
  const url = window.location.origin + '/map.html';
  console.log(url);
  return(
    <>
      <iframe style={{width: '100vw', height: '100vh'}} src={url} title="description"></iframe>
    </>
  )
}

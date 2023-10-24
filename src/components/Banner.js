import React from 'react'
import Button from './Button'
import {Cycle} from './TextComponents'
import {useEffect, useRef} from 'react'
import Video from '../assets/videos/SpinningEarth-Compressed.mp4'

export default function Banner({source, width, height}){
  var videoRef = useRef();
  useEffect(() => {
    let options = {
      rootMargin: '0px',
      threshold: 0.5,
    }

    var observer = new IntersectionObserver( ([entry]) =>
    {
      if(entry.isIntersecting){
          videoRef.current.play();
          videoRef.current.style.filter = 'brightness(1)';
          observer.unobserve(entry.target);
      }

    }, options);

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return(
    <>
        <div style={{width: '100%', height: height, zIndex: 2, overflow: 'none'}}>
            <video ref={videoRef} width={width} height={height} className={'parallax-image'} alt='worldwide nodes'  src={Video} loop muted></video>
          <div className='banner-gradient gradient flex row' style={{alignItems: 'center', width: width, height: '20%'}}>

              <p style={{marginRight: '2rem'}}>we are found in regions around<br/> the globe, with nodes from<br/>
              <Cycle text={['The U.K.', 'Switzerland', 'Turkey']} target={'countries-1'}/>
              &nbsp;to&nbsp;
              <Cycle text={['United States', 'Portugal', 'Costa Rica']} target={'countries-2'}/>
              </p>



              <Button isLight={true} content={'service map'} link={'/map'}/>
          </div>
        </div>
    </>
  );
}

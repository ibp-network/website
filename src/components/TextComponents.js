import React from 'react';
import anime from 'animejs';
import {useRef, useEffect, useState} from 'react'

function H1({id, classes, text}){
  var textWrapper = useRef();
  var titleContainer = useRef();
  var arr = text.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] += " ";
    arr[i] = <div className='word-wrapper'><span className={'word'}>{arr[i]}</span></div>;
  }

  useEffect(() => {

    let options = {
      rootMargin: '0px',
      threshold: 1.0,
    }


    var h = anime({
        targets: `#${id} .word`,
        translateY: ["4.5rem", 0],
        duration: 700,
        autoplay: false,
        easing: 'easeOutQuad',
        delay: (el, i) => 100 * i
      });

    var observer = new IntersectionObserver( ([entry]) =>
    {
      if(entry.isIntersecting){
          h.play();
          observer.unobserve(entry.target);
      }
    }, options);
    observer.observe(textWrapper.current);
    return () => observer.disconnect();

  }, [id]);


  return(
    <div ref={titleContainer} className={'title-container'}>
      <h1 ref={textWrapper} id={id} className={`ml6 ${classes}`}>
        <span className='text-wrapper'>
          <span className='words'>{arr}</span>
        </span>
      </h1>
    </div>
  );
}

function Cycle({key, id, classes, target, text, rem}){
  var remSize = 1.5;
  if(rem){
    remSize = rem;
  }
  var textComponent = [];
  var [ty, changeTy] = useState( (remSize * parseFloat(getComputedStyle(document.documentElement).fontSize)) + 1);

  for(var i = 0; i < text.length; i++){
    textComponent[i] = <p className={`cycle ${target} ${classes}`}>{text[i]}</p>;
  }
  textComponent[textComponent.length] = <p className={`cycle ${target} ${classes}`}>{text[0]}</p>

  useEffect(() => {
    window.onresize = e =>{
      var remSize = 1.5;
      if(rem){
        remSize = rem;
      }
      changeTy( (remSize * parseFloat(getComputedStyle(document.documentElement).fontSize)) + 1);
    }
    var timeline = anime.timeline({loop: true});
    for(var i = 1; i < textComponent.length; i++){
      timeline.add({
        targets: `.${target}`,
        translateY: [`-${(i - 1) * ty}px`, `-${i * ty}px`],
        delay: 1500,
        easing: 'easeOutQuad'
      });
    }
  }, [rem, target, textComponent.length, ty]);
  return(
    <>
      <div className='cycle-container inline-flex col'>
        {textComponent}
      </div>
    </>
  );
}

function MenuItem({id, classes, text, isBig, link}){

  if(isBig){
    return(
      <a href={link} target='_blank' rel="noreferrer">
      <div className={`menu-item inline-flex col ${classes}`}>
        <h1>{text}</h1>
        <div className={`underline ${classes}`}></div>
        <div className={`underline-full ${classes}`}></div>
      </div>
      </a>
    )
  }
  return(
      <a href={link} target='_blank' rel="noreferrer">
        <div className={`menu-item inline-flex col ${classes}`}>
          <h2>{text}</h2>
          <div className={`underline ${classes}`}></div>
          <div className={`underline-full ${classes}`}></div>
        </div>
      </a>
  )
}

export{
  H1, Cycle, MenuItem
}

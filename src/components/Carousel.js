import React from 'react'
import {useEffect, useRef} from 'react'
import Button from './Button'

export default function Carousel(props) {
  const slider = useRef(null);
  let isDown = useRef(false);
  let startX = useRef(null);
  let scrollLeft = useRef(null);

  useEffect(() => {
    if (slider && slider.current) {
      let sliderRef = slider.current;
      sliderRef.addEventListener("mousedown", one);
      sliderRef.addEventListener("mousedown", two);
      sliderRef.addEventListener("mouseleave", three);
      sliderRef.addEventListener("mouseup", four);
      sliderRef.addEventListener("mousemove", five);

      return () => {
        sliderRef.removeEventListener("mousedown", one);
        sliderRef.removeEventListener("mousedown", two);
        sliderRef.removeEventListener("mouseleave", three);
        sliderRef.removeEventListener("mouseup", four);
        sliderRef.removeEventListener("mousemove", five);
      };
    }
  }, []);

  function one(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  function two(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  function three() {
    isDown.current = false;
  }

  function four() {
    isDown.current = false;
  }

  function five(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX.current;
    slider.current.scrollLeft = scrollLeft.current - walk;
  }

  return (
    <>
    <div className='container flex col center' style={{position: 'relative', backgroundColor: '#f4f4f4'}} >

        <p className='alt'> - meet the builders - </p>

      <br></br>
      <div className="items" ref={slider}>
        <div className={'flex col image-container'} >
            <div style={{width: '50vmin', height: '32vmin'}} ></div>
        </div>
        {props.children}
        <div className={'flex col image-container'} >
            <div style={{width: '50vmin', height: '32vmin'}} ></div>
        </div>
      </div>

    <br></br>
    <div className='flex center row'>
      <Button content='all builders' link={'/builders'} isLight={true}/>
      <Button content='apply' target={'_blank'} link={'https://docs.google.com/forms/d/e/1FAIpQLSdhCFsscVz66ZocyKfPQzmsmoR9Y_ZlfGGyAUBJ6ThZDS8hRQ/viewform'} isLight={true}/>
    </div>
  </div>
    </>
  );
}

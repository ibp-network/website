import React, { useRef, useEffect } from 'react'

const Canvas = props => {

  const canvasRef = useRef(null)

  const draw = (ctx, frameCount) => {
    ctx.canvas.width = window.innerWidth * window.devicePixelRatio;
    ctx.canvas.height = window.innerHeight * window.devicePixelRatio;;
      const w = ctx.canvas.width,
    				h = ctx.canvas.height,
    				iData = ctx.createImageData(w, h),
    				buffer32 = new Uint32Array(iData.data.buffer),
    				len = buffer32.length
    	  let i = 0

    	for(i = 0; i < len;i++)
    		if (Math.random() < 0.5) buffer32[i] = 0xffffffff;

    		ctx.putImageData(iData, 0, 0);

  }

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    const f1 = draw(context, 1);
    const f2 = draw(context, 2);

    console.log(f1);

    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render)

    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas id={'noise'} ref={canvasRef} {...props}/>
}

export default Canvas

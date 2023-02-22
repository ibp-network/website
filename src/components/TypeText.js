import React, {useState, useEffect} from 'react'

export default function TypeText({text}){
  var textState = ['istyping', 'isdeleting'];
  var [typing, setTyping] = useState(textState[0]);
  function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //Text Content
  var firstText = text;
  var [text1, changeText] = useState("");
  var [length, increment] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {

      if(typing === 'istyping' && text1 !== firstText[length])
          {
            changeText(firstText[length].slice(0, text1.length + 1));
          }
      else if(text1 === firstText[length] && typing === 'istyping')
      {
        sleep(2000).then(() => {
        setTyping(textState[1]);
      });
      }
      else if((text1 === firstText[length] && typing === 'isdeleting') || typing === 'isdeleting'){
        changeText(firstText[length].slice(0, text1.length - 1));
        if(text1.length <= 1){
          if(length < text.length -1){
            increment(length + 1);
          }
          else{
            increment(0);
          }
          setTyping(textState[0]);
        }
      }
    }, 100);
      return(() => {
        clearTimeout(timeout);
      });

    }, [text1, typing]);

    return(
      <h1 id='decentralized' className='blinking-cursor'>{text1}</h1>
    )
}

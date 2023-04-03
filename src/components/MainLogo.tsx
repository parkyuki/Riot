import * as React from 'react';
import  styled  from 'styled-components';

interface MainLogoProps {
    src: string;
  }


export default function MainLogo ({src}: MainLogoProps) {
    
  return (
    <>
      <Logo src={src}/>
    </>
  );
}
const Logo=styled.img`
    display: block;
    width: 60%;
    border: 9px solid rgb(231, 230, 226);
    margin: 2% auto 8%;
`
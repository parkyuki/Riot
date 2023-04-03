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
width: 60%;
border: 9px solid #e7e6e2;
margin-top: 2%;
`
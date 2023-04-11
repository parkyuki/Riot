import * as React from 'react';
import  styled  from 'styled-components';



export default function MainLogo () {
  const publicUrl = process.env.PUBLIC_URL || "";
  const Logoimg=publicUrl+"/assets/Riot_Logo.png";
    
  return (
    <>
      <Logo src={Logoimg}/>
    </>
  );
}
const Logo=styled.img`
    display: block;
    width: 60%;
    border: 9px solid rgb(231, 230, 226);
    margin: 2% auto 8%;
`
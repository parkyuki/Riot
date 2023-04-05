import * as React from 'react';
import { useState } from 'react';
import  styled  from 'styled-components';
import  MainLogo  from '../components/MainLogo';
import Search from '../components/Search';




export default function Home () {
  const [userName, setUserName]=useState<string>('')
  const handleSubmit=(text:string)=>{
    setUserName(text);
    console.log(userName);
  }
  const Logoimg="/assets/Riot_Logo.png";

  return (
    <HomeDiv>
      <MainLogo src={Logoimg}/>
      <Search onSubmit={handleSubmit}/>
    </HomeDiv>
  );
}
const HomeDiv=styled.div`
    margin-top: 10%;
` 
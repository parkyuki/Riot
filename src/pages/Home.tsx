import * as React from 'react';
import  styled  from 'styled-components';
import  MainLogo  from '../components/MainLogo';
import Search from '../components/Search';




export default function Home () {
  
  const Logoimg="/assets/Riot_Logo.png";

  return (
    <HomeDiv>
      <MainLogo src={Logoimg}/>
      <Search/>
    </HomeDiv>
  );
}
const HomeDiv=styled.div`
    margin-top: 10%;
` 
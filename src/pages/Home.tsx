import * as React from 'react';
import  styled  from 'styled-components';
import  MainLogo  from '../components/MainLogo';
import Search from '../components/Search';




export default function Home () {
  
  

  return (
    <HomeDiv>
      <MainLogo/>
      <Search/>
    </HomeDiv>
  );
}
const HomeDiv=styled.div`
    margin-top: 10%;
` 
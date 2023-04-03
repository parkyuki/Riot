import * as React from 'react';
import  styled  from 'styled-components';
import  MainLogo  from '../components/MainLogo';
import { useNavigate } from 'react-router';



export default function Home () {
  const navigate=useNavigate()
  const Logoimg="/assets/Riot_Logo.png";
  return (
    <HomeDiv>
      <MainLogo src={Logoimg}/>
    </HomeDiv>
  );
}
const HomeDiv=styled.div`
  display:flex;
  justify-content: center;
`
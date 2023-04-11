import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { RiotDataContext } from '../App';
import styled from 'styled-components';
import  Search  from '../components/Search';



export default function User () {
    const userData=useContext(RiotDataContext)

    const publicUrl = process.env.PUBLIC_URL || "";
    const Tierimg=publicUrl+`/assets/${userData.tier}.png`;

    const WinPercentage=Math.round(userData.wins/(userData.wins+userData.losses)*100);


    interface ChampionDataType {
        name: string;
        key: string;
      }
      const [championData, setChampionData] = useState<
      Record<string, ChampionDataType>
    >({});
      
    useEffect(() => {
        fetch('http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json')
          .then((response) => response.json())
          .then((data: { data: Record<string, ChampionDataType> }) => {
            const champions = Object.values(data['data']);
            let tempChampionData: Record<string, ChampionDataType> = {};
            champions.forEach((champion) => {
              const key = champion['key'];
              const name = champion['name'];
              tempChampionData[key] = { name, key };
            });
            setChampionData(tempChampionData);
          });
      }, []);

     const championNames = userData.championIds.map((id) =>
    championData[id] ? championData[id].name : "Unknown Champion"
  );

  return (
    <>
      <Search/>
      <UserBody>
        <TierImg src={Tierimg}/>
        <UserTier>
             {userData.tier} {userData.rank} {userData.leaguePoints}LP
        <UserName>{userData.summonerName}</UserName>
        </UserTier>
        <Winning>{userData.wins}승 {userData.losses}패 {WinPercentage}%</Winning>
        <>
        {championNames.map((name) => (
            <ChampionName key={name}>{name}</ChampionName>
          ))}
        </>
      </UserBody>
    </>
  );
}

const UserBody=styled.div`
    display:flex;
    margin-top:10%;
    width: 500px;
    border: 1px solid white;
    flex-wrap: wrap;
`

const UserName=styled.div`
    font-size: 35px;
    font-weight: bold;
`

const TierImg=styled.img`
    width: 75px;
    height: 75px;
`

const UserTier=styled.div`

`

const Winning=styled.div`

`
const ChampionName=styled.div`

`
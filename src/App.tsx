import React, { useState,useEffect, createContext } from 'react';
import { GlobalStyles } from './index'
import { BrowserRouter,Routes,Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import axios from 'axios';
import User from './pages/User';

interface ContextType{
  handleUserName:(text:string)=>void;
  searchUserName:(click:boolean)=>void;
}
export interface ContextDataType{
  summonerName:string,
  tier:string,
   rank:string, 
   leaguePoints:number, 
   wins:number, 
   losses:number, 
   championIds:number[]
}
const initialData: ContextDataType = {
  summonerName:'',
  tier: '',
  rank: '',
  leaguePoints: 0,
  wins: 0,
  losses: 0,
  championIds: [],
};

export const RiotContext=createContext<ContextType>({
  handleUserName:()=>{},
  searchUserName:()=>{}
});

export const RiotDataContext=createContext<ContextDataType>(initialData);


function App() {
  const [userName, setUserName]=useState<string>('')
  const [searchClick, setSearchClick] = useState<boolean>(false);
  const [data, setData] = useState<ContextDataType>(initialData);
  const [id, setId] = useState('');
  const [error, setError] = useState('');


  const handleUserName=(text:string)=>{
    setUserName(text);
  }
  const searchUserName=(click:boolean)=>{
    setSearchClick(click) 
  }

  const api_key="RGAPI-d1661063-99a1-4fd8-bbac-60bd07a42bcd"
  const id_Url='https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+userName+'?api_key='+api_key
  const user_url='https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/'+id+'?api_key='+api_key
  const champ_url='https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+id+'?api_key='+api_key

  useEffect(() => {
    if (searchClick) {
      const idfetchData = async () => {
        try {
          const res = await axios.get(id_Url);
          setId(res.data.id);
        } catch (error) {
          setError("API 요청에 실패했습니다.");
          alert(error); 
        }
      }; 
      idfetchData();
      setSearchClick(false);
    } 
  }, [searchClick]);  
  
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const userRes = await axios.get(user_url);
        const champRes = await axios.get(champ_url);
        const {summonerName, tier, rank, leaguePoints, wins, losses } = userRes.data[0];
        const championIds = champRes.data.map(({championId}:{championId: number}) => championId).slice(0, 5);
        setData({summonerName, tier, rank, leaguePoints, wins, losses, championIds });
      };
      fetchData();
    }
  }, [id]);
  


  return (
    <RiotContext.Provider value={{handleUserName,searchUserName}}>
      <RiotDataContext.Provider value={data}>
        <BrowserRouter >
          <GlobalStyles /> 
             <div className="App">
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/user" element={<User />}/>
              </Routes>
             </div>
          </BrowserRouter>
      </RiotDataContext.Provider>
    </RiotContext.Provider>
  );
}

export default App;

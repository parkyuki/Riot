import React, { useState,useEffect } from 'react';
import { GlobalStyles } from './index'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import axios, { AxiosResponse } from 'axios';

interface ContextType{
  handleUserName:(text:string)=>void;
  searchUserName:(click:boolean)=>void;
}

export const RiotContext=React.createContext<ContextType>({
  handleUserName:()=>{},
  searchUserName:()=>{}
});

function App() {
  const [userName, setUserName]=useState<string>('')
  const [searchClick, setSearchClick] = useState<boolean>(false);
  const [data, setData] = useState({});
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  
  const handleUserName=(text:string)=>{
    setUserName(text);
  }
  const searchUserName=(click:boolean)=>{
    setSearchClick(click) 
  }

  const api_key="RGAPI-a734d237-c3fb-48ef-b016-ce2ae2e4d7c1"
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
        const { tier, rank, leaguePoints, wins, losses } = userRes.data[0];
        const championIds = champRes.data.map(({championId}:{championId: number}) => championId).slice(0, 5);
        setData({ tier, rank, leaguePoints, wins, losses, championIds });
      };
      fetchData();
    }
  }, [id]);
  


  return (
    <RiotContext.Provider value={{handleUserName,searchUserName}}>
      <BrowserRouter>
        <GlobalStyles /> 
         <div className="App">
           <Routes>
             <Route path='/' element={<Home />}/>
           </Routes>
         </div>
      </BrowserRouter>
    </RiotContext.Provider>
  );
}

export default App;

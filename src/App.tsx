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

const fetchData = async (url: string): Promise<AxiosResponse<{}>> => {
  const res = await axios.get(url);
  return res;
}

function App() {
  const [userName, setUserName]=useState<string>('')
  const [searchClick, setSearchClick] = useState<boolean>(false);


  const handleUserName=(text:string)=>{
    setUserName(text);
  }
  const searchUserName=(click:boolean)=>{
    setSearchClick(click)
  }

  const api_key="RGAPI-1d9b6f52-ea6c-4b0b-8a3f-b9a6e7ee8da0"
  	const url='https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/mtrigger?api_key='+api_key
  const [data, setData] = useState({});
  	

 	useEffect(()=>{
    if(searchClick){
      fetchData(url).then(res => setData(res));
    }
  } , [searchClick]);


 

  // axios.get(url)
  // .then(response => {
  //   console.log(response.data);
  // })
  // .catch(error => {
  //   console.log(error);
  // });
 
  // console.log(data)
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

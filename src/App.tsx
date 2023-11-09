import React, { useState, createContext } from "react";
import { GlobalStyles } from "./index";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import User from "./pages/User";

interface ContextType {
  handleUserName: (text: string) => void;
  searchUserName: (click: boolean) => void;
}
export interface ContextDataType {
  summonerName: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  championIds: number[];
}
const initialData: ContextDataType = {
  summonerName: "",
  tier: "",
  rank: "",
  leaguePoints: 0,
  wins: 0,
  losses: 0,
  championIds: [],
};

export const RiotContext = createContext<ContextType>({
  handleUserName: () => {},
  searchUserName: () => {},
});

export const RiotDataContext = createContext<ContextDataType>(initialData);

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/user", element: <User /> },
]);

function App() {
  const [userName, setUserName] = useState<string>("");
  const [searchClick, setSearchClick] = useState<boolean>(false);
  const [id, setId] = useState("");

  const [data, setData] = useState<ContextDataType>(initialData);

  const handleUserName = (text: string) => {
    setUserName(text);
  };
  const searchUserName = (click: boolean) => {
    setSearchClick(click);
  };

  const api_key = process.env.REACT_APP_API_KEY;
  const id_Url =
    process.env.REACT_APP_ID_URL + userName + "?api_key=" + api_key;
  const user_url = process.env.REACT_APP_USER_URL + id + "?api_key=" + api_key;
  const champ_url =
    process.env.REACT_APP_CHAMP_URL + id + "?api_key=" + api_key;

  searchClick &&
    (async () => {
      try {
        const res = await axios.get(id_Url);
        setId(res.data.id);
      } catch (error) {
        alert("API 요청에 실패했습니다.");
      } finally {
        setSearchClick(false);
      }
    })();

  const fetchData = async () => {
    const userRes = await axios.get(user_url);
    const champRes = await axios.get(champ_url);
    console.log("champRes:" + champRes);
    const { summonerName, tier, rank, leaguePoints, wins, losses } =
      userRes.data[0];
    const championIds = champRes.data
      .map(({ championId }: { championId: number }) => championId)
      .slice(0, 5);
    setData({
      summonerName,
      tier,
      rank,
      leaguePoints,
      wins,
      losses,
      championIds,
    });
  };

  return (
    <RiotContext.Provider value={{ handleUserName, searchUserName }}>
      <RiotDataContext.Provider value={data}>
        <BrowserRouter>
          <GlobalStyles />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RiotDataContext.Provider>
    </RiotContext.Provider>
  );
}

export default App;

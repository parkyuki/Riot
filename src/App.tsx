import React from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import  Search  from "./pages/Search";
import Home from "./pages/Home";


function App() {


  return (
    <BrowserRouter>
    <div className="App">
     <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/search' element={<Search />}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

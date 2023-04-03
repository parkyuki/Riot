import React from 'react';
import { GlobalStyles } from './index'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";


function App() {


  return (
    <BrowserRouter>
    <GlobalStyles /> 
    <div className="App">
     <Routes>
        <Route path='/' element={<Home />}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

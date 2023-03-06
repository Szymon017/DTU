import React from 'react'
import Login from './components/Login/Login.js';
import HomePage from './components/HomePage.js'
import './style.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Menu from './components/Menu.js';
import Container from 'react-bootstrap/esm/Container.js';
import MyCases from '../src/components/MyCases/MyCases'
import Crime from './components/Crime/Crime.js';
import Archives from './components/Archives/Archives.js';
import Informants from './components/Informants/Informants.js';
function App() {
  return (
    <>
        <header>
          <Menu />
        </header>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />}></Route>
              <Route path='/home' element={<HomePage />}></Route>
              <Route path='/cases' element={<MyCases />}></Route>
              <Route path='/crime' element={<Crime />}></Route>
              <Route path='/archives' element={<Archives/>}></Route>
              <Route path='/informants' element={<Informants/>}></Route>
            </Routes>
          </BrowserRouter>
          <footer style={{'text-align':'center'}}>&copy; Detective Task Unit</footer>
    </>
  );
}

export default App;

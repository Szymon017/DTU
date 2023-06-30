import React, { useEffect, useState } from 'react'
import Login from './components/Login/Login.js';
import HomePage from './components/HomePage.js'
import './style.css';
import { BrowserRouter, Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import Menu from './components/Menu.js';
import Container from 'react-bootstrap/esm/Container.js';
import MyCases from '../src/components/MyCases/MyCases'
import Crime from './components/Crime/Crime.js';
import Archives from './components/Archives/Archives.js';
import Persons from './components/Persons/Persons.js';
import Office from './components/Office/Office.js';
import { authOfficer, getCurrentOfficer } from './Services/OfficerService.js';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const getAuthorization = async () => {
    const token = localStorage.getItem("token")
    const result = await authOfficer(token);
    console.log(result.data.authorization);
    setAuthenticated(result.data.authorization)
  }

  useEffect(() => {
    getAuthorization();
  }, [])

  return (
    <>
      <header>
        {authenticated ? (
          <Menu />
        ) : ""}
      </header>
      <BrowserRouter>
        <Routes>
            {authenticated ? (
            <>
          <Route element={<RoleAccess roles={[1, 2]} />}>
              <Route path='/' element={<Login />}></Route>
              <Route path='/home' element={<HomePage />}></Route>
              <Route path='/cases' element={<MyCases />}></Route>
              <Route path='/crime' element={<Crime />}></Route>
              <Route path='/archives' element={<Archives />}></Route>
              <Route path='/persons' element={<Persons />}></Route>
          </Route>
          <Route element={<RoleAccess roles={[2]} />}>
            <Route path='/office' element={<Office />}>
            </Route>
          </Route>
            </>
            ) : ""}
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const RoleAccess = ({ roles = [] }) => {
  if (localStorage.getItem("token")) {
    const officer = getCurrentOfficer();
    return !roles.length || roles.includes(officer?.role)
      ? <Outlet />
      : <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
export default App;

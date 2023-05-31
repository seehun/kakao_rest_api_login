import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import LoginProcess from './LoginProcess';
import { useState } from 'react';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/loginProcess' element={<LoginProcess />} />
      </Routes>
    </>
  );
}

export default App;

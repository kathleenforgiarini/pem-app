import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Protected from './Protected';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="/dashboard" element={ <Protected Component={Dashboard}/> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

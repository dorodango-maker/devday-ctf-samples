import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/login`} element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

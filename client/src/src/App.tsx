import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import List from "./components/List";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/login`} element={<Login />} />
        <Route path={`/list`} element={<List />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

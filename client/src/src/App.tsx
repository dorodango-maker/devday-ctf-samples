import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import List from "./components/List";
import Admin from "./components/Admin";
import AdminHome from "./components/AdminHome";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/login`} element={<Login />} />
        <Route path={`/list`} element={<List />} />
        <Route path={`/admin/login`} element={<Admin />} />
        <Route path={`/admin/home`} element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

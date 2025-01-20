import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import UserDetail from "./Components/UserDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
  );
};

export default App;

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Details } from "./pages/Details";
import Films from "./pages/Films";
import People from "./pages/People";

function App() {
  return (
    <div>
      <h1>Studio Ghibli</h1>
      <Routes>
        <Route path="/" element={ <Navigate to="/films"/>}/>
        <Route path="/films" element={<Films/>}/>
        <Route path="/films/:id" element={<Details endpoint="film"/>}/>
        <Route path="/people" element={<People/>}/>
        <Route path="/people/:id" element={<Details endpoint="people"/>}/>
      </Routes>
    </div>
  );
}

export default App;

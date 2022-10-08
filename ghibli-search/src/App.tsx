import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Details } from "./pages/Details";
import Films from "./pages/Films";
import Locations from "./pages/Locations";
import People from "./pages/People";
import Species from "./pages/Species";
import Vehicles from "./pages/Vehicles";

function App() {
  return (
    <div>
      <h1>Studio Ghibli</h1>
      <Routes>
        <Route path="/" element={ <Navigate to="/films"/>}/>
        <Route path="/films" element={<Films/>}/>
        <Route path="/films/:id" element={<Details endpoint="film"/>}/>
        <Route path="/people" element={<People/>}/>
        <Route path="/people/:id" element={<Details endpoint="person"/>}/>
        <Route path="/locations" element={<Locations/>}/>
        <Route path="/locations/:id" element={<Details endpoint="location"/>}/>
        <Route path="/species" element={<Species/>}/>
        <Route path="/species/:id" element={<Details endpoint="specie"/>}/>
        <Route path="/vehicles" element={<Vehicles/>}/>
        <Route path="/vehicles/:id" element={<Details endpoint="vehicle"/>}/>
      </Routes>
    </div>
  );
}

export default App;

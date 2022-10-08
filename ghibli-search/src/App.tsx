import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Films } from "./pages/Films";

function App() {
  return (
    <div>
      <h1>Studio Ghibli</h1>
      <Routes>
        <Route path="/" element={ <Navigate to="/films"/>}/>
        <Route path="/films" element={<Films/>}/>
      </Routes>
    </div>
  );
}

export default App;

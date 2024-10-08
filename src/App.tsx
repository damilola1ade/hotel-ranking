import { Routes, Route } from "react-router-dom";
import { Home, ViewBrand, ViewHotel } from "./pages";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/hotel/:id" element={<ViewHotel />} />
      <Route path="/brand/:id" element={<ViewBrand />} />
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { Home, ViewBrand, ViewHotel } from "./pages";
import { NavBar } from "./components";
import { ScrollToTop } from "./helper/ScrollToTop";

import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/:id" element={<ViewHotel />} />
        <Route path="/brand/:id" element={<ViewBrand />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { Settings } from "./pages/Settings";
import LeftSidebar from "./components/LeftSidebar";
import Navbar from "./components/Navbar";
import "./App.css";
import Search from "./components/Search";
import { Book } from "./utils/utils";
import Bestseller from "./pages/Bestseller";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <LeftSidebar />
          <div className="col" style={{ background: "#E9EDF6" }}>
            <Search></Search>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/Bestseller"
                element={
                  <Bestseller bestsellers={[]} loading={false} error={null} />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

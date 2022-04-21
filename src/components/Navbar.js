import React from "react";
import { FaBell, FaBacteria, FaBookReader, FaBuffer } from "react-icons/fa";
import { useGolobalContext } from "../context";
function Navbar() {
  const { handleLayout } = useGolobalContext();
  return (
    <header className="app-header">
      <h3 className="app-name">
        <FaBell />
        Poromodo
      </h3>
      <div className="app-nav">
        <button className="nav-btn">
          <FaBuffer />
          report
        </button>
        <button onClick={() => handleLayout()} className="nav-btn">
          <FaBacteria />
          setting
        </button>
        <button className="nav-btn">
          <FaBookReader />
          login
        </button>
      </div>
    </header>
  );
}
export default Navbar;

import "./navBar.css";
import React, { useState } from "react";
import { HouseLine, UserCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isListVisible, setListVisible] = useState(false);

  const toggleList = () => {
    setListVisible(!isListVisible);
  };

  return (
    <>
      <div className="container">
        <HouseLine id="houseLine" size={32} weight="bold" />
        <h1 id="sh housing">Hebron Student Housing</h1>
        <ul>
          <li id="allAccommodations">
            <Link to="all">All Accommodations</Link>
          </li>
          <li id="Favorite">
          <Link to="Favorite">Favorite</Link>
          </li>
          <li id="Home">
          <Link to="/">Home</Link>
          </li>
          <li id="UserCircle">
            <UserCircle size={32} onClick={toggleList} />
          </li>
        </ul>
      </div>

      <ul className={`nav-list ${isListVisible ? "visible" : ""}`}>
        <li>Login</li>
        <li>Sign Up</li>
      </ul>
    </>
  );
};

export default NavBar;

import "./navBar.css";
import React, { useState } from "react";
import { HouseLine, UserCircle } from "@phosphor-icons/react";

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
            <a href="allAccommodations">All Accommodations</a>
          </li>
          <li id="Favorite">
            <a href="Favorite">Favorite</a>
          </li>
          <li id="Home">
            <a href="Home">Home</a>
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

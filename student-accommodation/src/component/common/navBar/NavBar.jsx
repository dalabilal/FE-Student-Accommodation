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
        <h1 id="HShousing">Hebron Student Housing</h1>
        <ul>
          <li id="allAccommodations">
            <Link to="all">Accommodations</Link>
          </li>
          <li id="Favorite">
            <Link to="Favorite">Favorite</Link>
          </li>
          <li id="Home">
            <Link to="/">Home</Link>
          </li>
          <li id="Home">
            <Link to="users">Users</Link>
          </li>
        </ul>

        <div id="UserCircle">
          <UserCircle size={32} onClick={toggleList} />
        </div>

      </div>

      <ul className={`nav-list ${isListVisible ? "visible" : ""}`}>
        <li>Login</li>
        <li>Sign Up</li>
      </ul>
    </>
  );
};

export default NavBar;

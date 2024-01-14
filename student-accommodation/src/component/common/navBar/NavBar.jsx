import "./navBar.css";
import React from "react";
import { HouseLine, UserCircle } from "@phosphor-icons/react";


const NavBar = () => {
  return (
    <div className="container">
      <HouseLine id="houseLine" size={32} />
      <h1 id="sh housing">Hebron Student Housing</h1>
      <ul>
        <li id='allAccommodations'>
          <a href="allAccommodations">All Accommodations</a>
        </li>
        <li id="Favorite">
          <a href="Favorite">Favorite</a>
        </li>
        <li id="Home">
          <a href="Home">Home</a>
        </li>
        <li id="UserCircle">
          <UserCircle size={32} />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;

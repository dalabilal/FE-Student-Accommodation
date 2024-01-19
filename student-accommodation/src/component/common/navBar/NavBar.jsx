import "./navBar.css";
import React, { useState } from "react";
import { HouseLine, UserCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [Options, setOptions] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleOptions = () => {
    setOptions(false);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setOptions(false);
  };

  return (
    <div className="navBarWithList">
      <div className="container">
        <HouseLine id="houseLine" size={32} weight="bold" />
        <h1 id="HShousing">Hebron Student Housing</h1>
        <ul className="vanBarOptions">
          <li
            className={activeItem === "Accommodations" ? "active" : ""}
            onClick={() => handleItemClick("Accommodations")}
          >
            <Link to="all">Accommodations</Link>
          </li>
          <li
            className={activeItem === "Favorite" ? "active" : ""}
            onClick={() => handleItemClick("Favorite")}
          >
            <Link to="Favorite">Favorite</Link>
          </li>
          <li
            className={activeItem === "Home" ? "active" : ""}
            onClick={() => handleItemClick("Home")}
          >
            <Link to="/">Home</Link>
          </li>
          <li
            className={activeItem === "Users" ? "active" : ""}
            onClick={() => handleItemClick("Users")}
          >
            <Link to="users">Users</Link>
          </li>
        </ul>

        <div id="UserCircle">
          <UserCircle size={32} onClick={() => setOptions(!Options)} />
        </div>
      </div>

      {Options && (
        <ul className="options">
          <li onClick={handleOptions}>
            <Link id="signin" to="signin">
              Sign In
            </Link>
          </li>
          <li onClick={handleOptions}>
            <Link id="signup" to="signup">
              Sign Up
            </Link>
          </li>
          <li onClick={handleOptions}>
            <Link id="LogOut" to="">
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;

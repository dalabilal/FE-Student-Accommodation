import "./navBar.css";
import React, { useState, useEffect } from "react";
import { HouseLine, UserCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useUser } from "../../../service/UserContext"

const NavBar = () => {

  const [activeItem, setActiveItem] = useState(null);
  const [Options, setOptions] = useState(false);
  const { logoutUser, noUser, userRole } = useUser();
  const username = sessionStorage.getItem('username');


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
            className={
              (window.location.pathname === '/all' || activeItem === "Accommodations")
                ? "active"
                : ""
            }
            onClick={() => handleItemClick("Accommodations")}
          >
            <Link to="all">Accommodations</Link>
          </li>

          <li
            className={
              (window.location.pathname === '/favorite' | activeItem === "Favorite")
                ? "active"
                : ""
            }
            onClick={() => handleItemClick("Favorite")}
          >
            <Link to="/favorite">Favorite</Link>
          </li>

          <li
            className={
              (window.location.pathname === '/' | activeItem === "Home")
                ? "active"
                : ""}
            onClick={() => handleItemClick("Home")}
          >
            <Link to="/">Home</Link>
          </li>

          {(userRole == 'owner' && noUser) &&
            <li
              className={
                (window.location.pathname === '/allusers' | activeItem === "Users")
                  ? "active"
                  : ""
              }
              onClick={() => handleItemClick("Users")}
            >
              <Link to="allusers">Users</Link>
            </li>
          }
        </ul>

        <span>{username}</span>
        <div id="UserCircle">
          <UserCircle size={32} onClick={() => setOptions(!Options)} />
          {Options && (
            <ul className="options">
              <li onClick={handleOptions}>
                <Link id="signin" to="/signin">
                  Sign In
                </Link>
              </li>
              <li onClick={handleOptions}>
                <Link id="signup" to="/signup">
                  Sign Up
                </Link>
              </li>
              {noUser && <li onClick={handleOptions}>
                <Link id="LogOut" to="/" onClick={logoutUser}>
                  Log Out
                </Link>
              </li>}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
};

export default NavBar;

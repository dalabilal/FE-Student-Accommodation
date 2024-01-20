import "./navBar.css";
import React, { useState } from "react";
import { HouseLine, UserCircle } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../service/UserContext";

const NavBar = () => {

  const [Options, setOptions] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const [isListVisible, setListVisible] = useState(false);
  // const { setUserRole, userRole } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3005/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // setUserRole(null);
        navigate('/signin');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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
            <Link to="allusers">Users</Link>
          </li>
      </ul>

        <div id="UserCircle">
          <UserCircle size={32} onClick={() => setOptions(!Options)} />


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
      </div>

{/* 
      {userRole ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <ul className={`nav-list ${isListVisible ? "visible" : ""}`}>
          <li>
            <Link to="/signin">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )} */}

    </div>
  );
};

export default NavBar;

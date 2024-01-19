import "./navBar.css";
import React, { useState } from "react";
import { HouseLine, UserCircle } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../service/UserContext";

const NavBar = () => {
  const [isListVisible, setListVisible] = useState(false);
  const { setUserRole, userRole } = useUser();
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
        setUserRole(null);
        navigate('/signin');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleList = () => {
    setListVisible(!isListVisible);
  };

  return (
    <>
      <div className="container">
        <HouseLine id="houseLine" size={32} weight="bold" />
        <h1 id="HShousing">Hebron Student Housing</h1>
        <ul>
          <li id="Home">
            <Link to="/">Home</Link>
          </li>
          <li id="allAccommodations">
            <Link to="all">Accommodations</Link>
          </li>
          <li id="Favorite">
            <Link to="Favorite">Favorite</Link>
          </li>
          <li id="Home">
            <Link to="allusers">Users</Link>
          </li>
        </ul>
        <div id="UserCircle">
          <UserCircle size={32} onClick={toggleList} />
        </div>

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
        )}
      </div>
    </>
  );
};

export default NavBar;

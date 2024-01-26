import "./navBar.css";
import React, { useState } from "react";
import { HouseLine, SignOut, UserCircle } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../../service/UserContext"
import { User } from "@phosphor-icons/react/dist/ssr";

const NavBar = () => {

  const [activeItem, setActiveItem] = useState(null);
  const [Options, setOptions] = useState(false);
  const { logoutUser, noUser, userRole } = useUser();
  const username = sessionStorage.getItem('username');
  const location = useLocation();
  const hideNavBarRoutes = ['/signin', '/signup' , '/verification' , '/reset' , '/sendVerify'];
  const shouldShowNavBar = !hideNavBarRoutes.includes(location.pathname);


  const handleOptions = () => {
    setOptions(false);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setOptions(false);
  };


  return (
   <>{shouldShowNavBar && <div className="navBarWithList">
      <div className="container">
        <HouseLine id="houseLine" size={32} weight="bold" />
        <h1 id="HShousing">Hebron Student Housing</h1>

        <ul className="vanBarOptions">
          <li
            className={
              (window.location.pathname === '/' | activeItem === "Home")
                ? "active"
                : ""}
            onClick={() => handleItemClick("Home")}
          >
            <Link to="/">Home</Link>
          </li>
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


          {(userRole === 'owner' && noUser) &&
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
              {!noUser && <><li>
                <Link id="signin" to="/signin" style={{color : "#848488"}}>
                  sign in
                </Link>
              </li>
                <li>
                  <Link id="signup" to="/signup" style={{color : "#848488"}}>
                    sign up
                  </Link>
                </li>
              </>
              }
              {noUser && <li
               onClick={handleOptions}
             
               >
                <Link id="YourAccount" to="/profile"  style={{color : "#848488"}}>
                <User color="#848484" size={20} weight="bold"/>
                  Your Profile
                </Link>
              </li>}
              {noUser &&
                <li onClick={handleOptions}>
                  <Link id="LogOut" to="/signin" onClick={logoutUser}  style={{color : "#848484"}}>
                  <SignOut color="#848484" size={20} weight="bold"/>
                    Log Out
                  </Link>
                </li>
              }
            </ul>
          )}
        </div>
      </div>

    </div>}</>);
};

export default NavBar;

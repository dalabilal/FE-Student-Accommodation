import React from "react";
import "./homePage.css";
import {FacebookLogo} from "@phosphor-icons/react"
import NavBar from "../../component/common/navBar/NavBar";

const HomePage = () => {
  return (
    <>
      <div className="backGround"></div>
      <div className="aboutUScontainer">
        <h1 className="aboutUs">About Us</h1>
        <p className="aboutUsParagraph">
          Our application gathers all the available university accommodations in
          Hebron, enabling you to easily and quickly find the most suitable
          housing close to your university. We provide accurate and reliable
          information about these accommodations, along with various details
          that matter to you, complemented by photos for each residence.
        </p>
        <div className="Line"></div>
        <FacebookLogo id="FacebookLogo" size={24} weight="light" />
      </div>
    </>
  );
};

export default HomePage;

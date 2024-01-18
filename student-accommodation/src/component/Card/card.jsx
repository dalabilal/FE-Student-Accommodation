import React, { useState } from "react";
import {
  Heart,
  MapPinLine,
  Phone,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react";
import "./card.css";

const Card = ({ title, content, imageUrl }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <p className="card-text">{content}</p>
        <ul className="card-details">
          <Heart
            id="heart"
            size={25}
            weight={isHeartClicked ? "fill" : "bold"}
            onClick={handleHeartClick}
          />
          <MapPinLine id="MapPinLine" size={25}  weight='bold'/>
          <Phone id="Phone" size={25} weight='bold'/>
          <DotsThreeOutlineVertical id="DotsThreeOutlineVertical" size={25} />
        </ul>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import {
  Heart,
  MapPinLine,
  Phone,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react";
import "./card.css";

const Card = ({ title, content, imageUrl }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      <div className="card-content">
        <p className="card-text">{content}</p>
        <ul className="card-details">
          <Heart id="heart" size={25} />
          <MapPinLine id="MapPinLine" size={25} />
          <Phone id="Phone" size={25} />
          <DotsThreeOutlineVertical id="DotsThreeOutlineVertical" size={25} />
        </ul>
      </div>
    </div>
  );
};

export default Card;

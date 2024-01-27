import React, { useState } from "react";
import {
  Heart,
  MapPinLine,
  Phone,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react";
import "./card.css";
import { useUser } from "../../service/UserContext";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hook/notification.hook";

const Card = ({ title, content, imageUrl }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const {noUser} =  useUser()
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  const handleHeartClick = () => {
    if(!noUser) {
      navigate('/signin');
      setNotification({ message: 'you are not Login ', status: 'wks' })
    }else {
      setIsHeartClicked(!isHeartClicked);
    }
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

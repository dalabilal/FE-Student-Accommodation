import React, { useState } from "react";
import {Heart, MapPinLine, Phone, DotsThreeOutlineVertical} from "@phosphor-icons/react";
import "./card.css";
import { useUser } from "../../service/UserContext";
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../hook/notification.hook";
import { Trash } from "@phosphor-icons/react/dist/ssr";


const Card = ({ name, description, imageUrl  , data }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const { noUser, housingData } = useUser()
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const userID = sessionStorage.getItem('userID');

  const handleHeartClick = () => {
    if (!noUser) {
      navigate('/signin');
      setNotification({ message: 'you are not Login ', status: 'wks' })
    } else {
      setIsHeartClicked(!isHeartClicked);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">{name}</h2>
     {data.ownerId === userID && <span><Trash size={30}/></span>}
      {imageUrl &&
        <Link to={`/view/${data._id}`}>
          <img src={imageUrl} alt={name} className="card-image" />
        </Link>
      }
      <div className="card-content">
        <p className="card-text">{description}</p>
        <ul className="card-details">
          <Heart
            id="heart"
            size={25}
            weight={isHeartClicked ? "fill" : "bold"}
            onClick={handleHeartClick}
          />
          <MapPinLine id="MapPinLine" size={25} weight='bold' />
          <Phone id="Phone" size={25} weight='bold' />
          <DotsThreeOutlineVertical id="DotsThreeOutlineVertical" size={25} />
        </ul>
      </div>
    </div>
  );
};

export default Card;

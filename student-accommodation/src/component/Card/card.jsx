import React, { useState } from "react";
import {Heart, MapPinLine, Phone, DotsThreeOutlineVertical} from "@phosphor-icons/react";
import "./card.css";
import { useUser } from "../../service/UserContext";
import { Link, useNavigate } from "react-router-dom";
import useNotification from "../../hook/notification.hook";
import { Trash } from "@phosphor-icons/react/dist/ssr";


const Card = ({ name, description, imageUrl  , data }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const { noUser } = useUser()
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const userID = sessionStorage.getItem('userID');

  const handleHeartClick = async () => {
    if (!noUser) {
      navigate('/signin');
      setNotification({ message: 'You are not logged in', status: 'wks' });
    } else {
      setIsHeartClicked(!isHeartClicked)

      try {
        const response = await fetch('http://localhost:3005/like/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID,
            dataId: data._id,
            name,
            description,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setNotification({ message: errorData.message || 'Failed to save like', status: 'err' });
        }
      } catch (error) {
        console.error('Error during like save:', error.message);
        setNotification({ message: 'Error during like save', status: 'err' });
      }
    }
  };


  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:3005/all/housing/${data._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotification({ message: 'Housing card deleted successfully', status: 'success' });
      } else {
        const errorData = await response.json();
        setNotification({ message: errorData.message || 'Failed to delete housing card', status: 'err' });
      }
    } catch (error) {
      console.error('Error during delete:', error.message);
      setNotification({ message: 'Error during delete', status: 'err' });
    }
  };

  return (
    <div className="card">
      <div className="title-trash">
      <h2 className="card-title">{name}</h2>
     {data.ownerId === userID && <span><Trash id="trush" size={30} onClick={handleDeleteClick}/></span>}
     </div>
      {imageUrl &&
        <Link to={`/all/${data._id}`}>
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

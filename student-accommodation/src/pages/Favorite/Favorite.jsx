import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Link } from 'react-router-dom';
import { MapPinLine, Phone, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { Trash } from "@phosphor-icons/react/dist/ssr";

const imageUrl = "https://th.bing.com/th/id/OIP.OfQ9D-ht_ihNi9sbI7mZlwHaEK?rs=1&pid=ImgDetMain";

const Favorite = () => {
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    fetchFavoriteData();
  }, []);

  const fetchFavoriteData = async () => {
    try {
      const userID = sessionStorage.getItem('userID');
      const response = await fetch(`http://localhost:3005/like/${userID}`);
      if (response.ok) {
        const data = await response.json();
        setFavoriteData(data);
      } else {
        console.error('Failed to fetch favorite data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  };

  const handleDeleteClick = async (dataId) => {
    try {
      const response = await fetch(`http://localhost:3005/like/${dataId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavoriteData((prevData) => prevData.filter(item => item._id !== dataId));
      } else {
        console.error('Failed to delete favorite data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during delete:', error.message);
    }
  };

  const handleClearAllClick = async () => {
    try {
      const userID = sessionStorage.getItem('userID');
      const response = await fetch(`http://localhost:3005/like/clear/${userID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavoriteData([]);
      } else {
        console.error('Failed to clear all favorite data:', response.statusText);
      }
    } catch (error) {
      console.error('Error during clear all:', error.message);
    }
  };

  return (
    <div className='favorite'>
      {favoriteData?.map((data) => (
        <div className="card" key={data._id}>
          <div className="title-trash">
            <h2 className="card-title">{data.name}</h2>
            <span onClick={() => handleDeleteClick(data._id)}><Trash id="trush" size={30} /></span>
          </div>
          {imageUrl &&
            <Link to={`/all/${data.dataId}`}>
              <img src={imageUrl} alt={data.name} className="card-image" />
            </Link>
          }
          <div className="card-content">
            <p className="card-text">{data.description}</p>
            <ul className="card-details">
              <MapPinLine id="MapPinLine" size={25} weight='bold' />
              <Phone id="Phone" size={25} weight='bold' />
              <DotsThreeOutlineVertical id="DotsThreeOutlineVertical" size={25} />
            </ul>
          </div>
        </div>
      ))}
      <button
        onClick={handleClearAllClick}
      >
        Clear All
      </button>
    </div>
  );
}

export default Favorite;

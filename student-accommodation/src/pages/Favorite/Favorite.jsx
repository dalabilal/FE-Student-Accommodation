import React, { useEffect, useState } from "react";
import "./favorite.css";
import { Link } from "react-router-dom";
import {
  MapPinLine,
  Phone,
  DotsThreeOutlineVertical,
} from "@phosphor-icons/react";
import { Trash } from "@phosphor-icons/react/dist/ssr";

const imageUrl =
  "https://th.bing.com/th/id/OIP.OfQ9D-ht_ihNi9sbI7mZlwHaEK?rs=1&pid=ImgDetMain";

const Favorite = () => {
  const [favoriteData, setFavoriteData] = useState([]);

  useEffect(() => {
    fetchFavoriteData();
  }, []);

  const fetchFavoriteData = async () => {
    try {
      const userID = sessionStorage.getItem("userID");
      const response = await fetch(`http://localhost:3005/like/${userID}`);
      if (response.ok) {
        const data = await response.json();
        setFavoriteData(data);
      } else {
        console.error("Failed to fetch favorite data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error.message);
    }
  };

  const handleDeleteClick = async (dataId) => {
    try {
      const response = await fetch(`http://localhost:3005/like/${dataId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFavoriteData((prevData) =>
          prevData.filter((item) => item.dataId !== dataId)
        );
      } else {
        console.error("Failed to delete favorite data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during delete:", error.message);
    }
  };

  const handleClearAllClick = async () => {
    try {
      const userID = sessionStorage.getItem("userID");
      const response = await fetch(
        `http://localhost:3005/like/clear/${userID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setFavoriteData([]);
      } else {
        console.error(
          "Failed to clear all favorite data:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during clear all:", error.message);
    }
  };

  return (
    <>
      <div className="favorite">
        {favoriteData?.map((data) => (
          <div className="favorate-card" key={data._id}>
            <Link to={`/all/${data.dataId}`}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={data.name}
                  className="card-image-favorite"
                />
              )}
            </Link>

            <div className="card-content-favorite">
              <div className="title-trash-favorite">
                <h2 className="card-title-favorite">{data.name}</h2>
                <span onClick={() => handleDeleteClick(data.dataId)}>
                  <Trash id="trush" size={30} />
                </span>
              </div>

              <p className="card-text-favorite">{data.description}</p>

              <ul className="card-details-favorite">
                <MapPinLine id="MapPinLine-favorite" size={25} weight="bold" />
                <Phone id="Phone-favorite" size={25} weight="bold" />
                <DotsThreeOutlineVertical
                  id="DotsThreeOutlineVertical-favorite"
                  size={25}
                />
              </ul>
            </div>
          </div>
        ))}
      </div>
      <button id="ClearAll" onClick={handleClearAllClick}>
        Clear All
      </button>
    </>
  );
};

export default Favorite;

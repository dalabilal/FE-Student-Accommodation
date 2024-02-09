import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../hook/notification.hook";
import "./view-housing.css";
import { useUser } from "../../service/UserContext";
import AddTerms from "../../component/common/add-terms-form/AddTerms";

const ViewHousing = () => {
  const { id } = useParams();
  const [housingData, setHousingData] = useState(null);
  const [addTerms, setAddTerms] = useState(false);
  const { setNotification } = useNotification();
  const username = sessionStorage.getItem('username');
  const userId = sessionStorage.getItem('userID');
  const navigate = useNavigate();
  const { userRole, noUser ,setOwner , owner} = useUser();

  useEffect(() => {
    const fetchHousingData = async () => {
      try {
        const response = await fetch(`http://localhost:3005/all/housing/${id}`);
        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem("housingID", id);
          setOwner(data.ownerId);
          setHousingData(data);
        } else {
          // console.error('Failed to fetch housing data:', response.statusText);
          // setNotification({ message: 'Failed to fetch housing data', status: 'err' });
        }
      } catch (error) {
        // console.error('Error during fetch:', error.message);
        // setNotification({ message: 'Error during fetch', status: 'err' });
      }
    };

    fetchHousingData();
  }, [id, setOwner, setHousingData, setNotification]);

  if (!housingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-page-group-buttons">
      <div className="view-page-group">
        <img className="image-housing" src={housingData.image} alt="housing pic" />
        <div className="information">
          <h2>{housingData.name}</h2>
          <p className="discriptionParagraph" id="cardItem">
            {housingData.description}
          </p>
          <p id="cardItem">Number of room : {housingData.rooms}</p>
          <p id="cardItem">{housingData.location}</p>
          <p id="cardItem">Added by : {username}</p>
          <p id="cardItem">{housingData.phoneNumber}</p>
        </div>
      </div>
      <div className="buttons-container">
        {userRole === 'owner' ? ''
        : <button
          onClick={() => noUser ? navigate('/payment') : navigate('/signin')}
          id='cardB'
        >
          Book Now!
        </button>}

        {owner === userId && <button id='rentalTermsButton' onClick={() => setAddTerms(true)}>Add rental terms</button>}


        {addTerms && <AddTerms setPopup={setAddTerms} />}
      </div>
    </div>
  );
};

export default ViewHousing;

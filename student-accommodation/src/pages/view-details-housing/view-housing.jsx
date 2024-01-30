import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useNotification from '../../hook/notification.hook';
import './view-housing.css'

const imageUrl="https://th.bing.com/th/id/OIP.OfQ9D-ht_ihNi9sbI7mZlwHaEK?rs=1&pid=ImgDetMain"

const ViewHousing = () => {
    const { id } = useParams();
    const [housingData, setHousingData] = useState(null);
    const { setNotification } = useNotification();
    const username = sessionStorage.getItem('username');
    
    useEffect(() => {
        const fetchHousingData = async () => {
          try {
            const response = await fetch(`http://localhost:3005/all/housing/${id}`);
            if (response.ok) {
              const data = await response.json();
              setHousingData(data);
            } else {
              console.error('Failed to fetch housing data:', response.statusText);
              setNotification({ message: 'Failed to fetch housing data', status: 'err' });
            }
          } catch (error) {
            console.error('Error during fetch:', error.message);
            setNotification({ message: 'Error during fetch', status: 'err' });
          }
        };
    
        fetchHousingData();
      }, [id,setNotification]);
    
      if (!housingData) {
        return <div>Loading...</div>;
      }


  return (
    <div className="view-page-group">
            <img className="image-housing" src={imageUrl} alt='housing pic'/>
        <div className="information">
                   <h2>{housingData.name}</h2>
                   <p>{housingData.description}</p>
                   <p>Number of room : {housingData.rooms}</p>
                   <p>{housingData.location}</p>
                   <p>Added by : {username}</p>
                   <p>{housingData.phoneNumber}</p>
        </div>
        <div className="payment">

        </div>
    </div>
  )
}

export default ViewHousing

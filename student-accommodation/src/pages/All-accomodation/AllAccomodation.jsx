import React, { useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import Card from "../../component/Card/card";
import "./allAcommodation.css";
import { useUser } from "../../service/UserContext";
import AddHousingForm from "../../component/common/add-housing-form/AddHousing";

const SearchBar = ({ onUniversityChange }) => {
  const handleUniversityChange = (e) => {
    onUniversityChange(e.target.value);
  };

  return (
    <div className="searchContainer">
      <div className="input-wrapper">
        <select className="unisList" onChange={handleUniversityChange}>
          <option value="">All Universities</option>
          <option value="Palestine Polytechnic University">
            Palestine Polytechnic University
          </option>
          <option value="Hebron University">Hebron University</option>
          <option value="">Another University</option>
        </select>
      </div>
    </div>
  );
};

const AllAccomodation = () => {
  const { noUser, userRole, housingData } = useUser();
  const [popup, setPopup] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const filteredHousingData = selectedUniversity
    ? housingData.filter((housing) => housing.university === selectedUniversity)
    : housingData;

  const handleUniversityChange = (university) => {
    setSelectedUniversity(university);
  };

  return (
    <div className="all-acc">
      <div className="bar">
        <SearchBar onUniversityChange={handleUniversityChange} />
        {noUser && userRole === "owner" && (
          <button className="add-housing" onClick={() => setPopup(!popup)}>
            <Plus size={40} color="white" />
            <span>Add Housing</span>
          </button>
        )}
      </div>
      {popup && <AddHousingForm setPopup={setPopup} />}
      <div className="display-cards">
        {filteredHousingData.map((housing, index) => (
          <Card
            data={housing}
            key={housing._id}
            name={housing.name}
            description={housing.description}
            imageUrl="https://th.bing.com/th/id/OIP.OfQ9D-ht_ihNi9sbI7mZlwHaEK?rs=1&pid=ImgDetMain"
          />
        ))}
      </div>
    </div>
  );
};

export default AllAccomodation;

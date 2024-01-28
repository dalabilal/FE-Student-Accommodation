
import { Plus } from "@phosphor-icons/react/dist/ssr";
import Card from "../../component/Card/card";
import "./allAcommodation.css";
import { useState } from "react";
import { useUser } from "../../service/UserContext";
import AddHousingForm from "../../component/common/add-housing-form/AddHousing";


const SearchBar = () => {

  return (
    <div className="searchContainer">
      <div className="input-wrapper">
        <select className="unisList">
          <option>Palestine Polyticnech University</option>
          <option>Hebron University</option>
          <option>University</option>
        </select>
      </div>
    </div>
  );
};

const AllAccomodation = () => {
  const { noUser, userRole, housingData } = useUser();
  const [popup, setPopup] = useState(false);

  return (
    <div className="all-acc">
      <div className="bar">
        <SearchBar />
        {(noUser && userRole === 'owner') &&
          <button
            className="add-housing"
            onClick={() => setPopup(!popup)}
          >
            <Plus size={40} color="white" />
            <span>Add Housing</span>
          </button>
        }
      </div>
      {popup &&
        <AddHousingForm
          setPopup={setPopup}
        />
      }
      <div className="display-cards">
        {housingData?.map((housing, index) => (
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

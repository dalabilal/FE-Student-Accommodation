import Card from "../../component/Card/card";
import "./allAcommodation.css";
import { CaretCircleDown } from "@phosphor-icons/react";
import { useState } from "react";

const SearchBar = () => {
  const [toggle, setToggle] = useState(false);
  const handleTheClick = () => {
    setToggle(false);
  };
  return (
    <div className="searchContainer">
      <div className="input-wrapper">
        <input className="input" placeholder="search for university"></input>
        <CaretCircleDown
          id="CaretCircleDown"
          size={24}
          onClick={() => setToggle(!toggle)}
        />
      </div>
      {toggle && (
        <div className="unis">
          <ul>
            <li onClick={handleTheClick}>Palestine Polyticnech University</li>
            <li onClick={handleTheClick}>Hebron University</li>
            <li onClick={handleTheClick}>Any University</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const AllAccomodation = () => {
  return (
    <>
      <SearchBar />
      <div className="display-cards">
        <Card
          title="Hebron Stay"
          content="it is near to ppu....."
          imageUrl="https://th.bing.com/th/id/OIP.OfQ9D-ht_ihNi9sbI7mZlwHaEK?rs=1&pid=ImgDetMain"
        />
      </div>
    </>
  );
};

export default AllAccomodation;

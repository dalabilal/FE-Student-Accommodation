import Input from "../input/input.component";
import Textarea from "../textarea/textarea.component";
import sanitizeHtml from 'sanitize-html';
import React, { useState } from "react";
import "./addhousing.css";

const AddHousingForm = (props) => {
  const [selectedUniversity, setSelectedUniversity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizeOptions = {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
      allowedAttributes: {
        a: ["href"],
      },
      transformTags: {
        script: function (tagName, attribs) {
          console.log("invalid input")
          return { tagName: "div", text: "Script tag not allowed!" };
        },
      },
    };

    const name = sanitizeHtml(e.target.name.value, sanitizeOptions);
    const phoneNumber = sanitizeHtml(
      e.target.phoneNumber.value,
      sanitizeOptions
    );
    const location = sanitizeHtml(e.target.location.value, sanitizeOptions);
    const university = sanitizeHtml(selectedUniversity, sanitizeOptions);
    const rooms = sanitizeHtml(e.target.rooms.value, sanitizeOptions);
    const image = sanitizeHtml(e.target.image.value, sanitizeOptions);
    const description = sanitizeHtml(
      e.target.description.value,
      sanitizeOptions
    );
    const useID = sessionStorage.getItem("userID");
    const username = sessionStorage.getItem("username");

    const formData = {
      name: name,
      phoneNumber: phoneNumber,
      location: location,
      rooms: rooms,
      university: university,
      description: description,
      ownerId: useID,
      image :image,
      username:username,
    };

    const invalidInputDetected = Object.values(formData).some(
      (value) => typeof value === "string" && value.includes("Script tag not allowed!")
    );
  
    if (invalidInputDetected) {
      console.error("Invalid input detected. Form submission prevented.");
      return; // Prevent form submission
    }

    try {
      const response = await fetch("http://localhost:3005/all/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("formData", formData);
        console.log("Housing data submitted successfully");
        props.setPopup(false);
      } else {
        console.error("Failed to submit housing data");
        console.log("formData", formData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="plur-popup">
      <div className="popup-container show">
        <div className="xDiv">
          <h2 id="addHousingHeader">Add Your Housing details</h2>
          <span id="cancelAdd" onClick={() => props.setPopup(false)}>
            X
          </span>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/formData">
          <Input
            label="name"
            name="name"
            required
          />
          <Input
            label="phone number:"
            name="phoneNumber"
            required
          />
          <Input
            name="location"
            label="location"
            required
          />
          <Input
            label="rooms"
            type="number"
            name="rooms"
            required
          />
          <Input
            label="Image"
            type="text"
            name="image"
            required
          />
          <div className="searchContainer1">
            <div className="input-wrapper">
              <select
                className="unisList"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                <option value="">Select University</option>
                <option value="Palestine Polytechnic University">Palestine Polytechnic University</option>
                <option value="Hebron University">Hebron University</option>
                <option value="Another University">Another University</option>
              </select>
            </div>
          </div>
          <Textarea
            id="AddhousingDiscription"
            label="description"
            name="description"
            required
          />
          <div className="bottuns">
            <button id="addingButton" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHousingForm;
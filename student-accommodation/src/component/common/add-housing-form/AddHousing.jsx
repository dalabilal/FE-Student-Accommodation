import React from "react";
import Input from "../input/input.component";
import Textarea from "../textarea/textarea.component";
import sanitizeHtml from 'sanitize-html';
import "./addhousing.css";

const AddHousingForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define sanitization options
    const sanitizeOptions = {
      allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      allowedAttributes: {
        'a': ['href'],
      },
      transformTags: {
        'script': function (tagName, attribs) {
          alert('Script tag not allowed!');
          return { tagName: 'div', text: 'Script tag not allowed!' };
        },
      },
    };

    // Sanitize user inputs
    const name = sanitizeHtml(e.target.name.value, sanitizeOptions);
    const phoneNumber = sanitizeHtml(e.target.phoneNumber.value, sanitizeOptions);
    const location = sanitizeHtml(e.target.location.value, sanitizeOptions);
    const university = sanitizeHtml(e.target.university.value, sanitizeOptions);
    const rooms = sanitizeHtml(e.target.rooms.value, sanitizeOptions);
    const description = sanitizeHtml(e.target.description.value, sanitizeOptions);

    // Retrieve files (assuming multiple files)
    const files = Array.from(e.target.files.files);

    const formData = {
      name: name,
      phoneNumber: phoneNumber,
      location: location,
      rooms: rooms,
      university: university,
      description: description,
      files: files,
    };

    try {
      const response = await fetch("http://localhost:3005/all/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
          <h2>Add Your Housing details</h2>
          <span id="x" onClick={() => props.setPopup(false)}>
            X
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <Input label="name" name="name" required />
          <Input label="phone number:" name="phoneNumber" required />
          <Input name="location" label="location" required />
          <Input label="rooms" type="number" name="rooms" required />
          <Input label="university" name="university" required />
          <Textarea label="description" name="description" required />
          <div className="bottuns">
            <input id="choose" type="file" multiple name="files" required />
            <button id="add" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHousingForm;
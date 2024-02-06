import Input from "../input/input.component";
import Textarea from "../textarea/textarea.component";
import sanitizeHtml from "sanitize-html";
import "./addhousing.css";

const AddHousingForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizeOptions = {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "br"],
      allowedAttributes: {
        a: ["href"],
      },
      transformTags: {
        script: function (tagName, attribs) {
          alert("Script tag not allowed!");
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
    const university = sanitizeHtml(e.target.university.value, sanitizeOptions);
    const rooms = sanitizeHtml(e.target.rooms.value, sanitizeOptions);
    const description = sanitizeHtml(
      e.target.description.value,
      sanitizeOptions
    );
    const useID = sessionStorage.getItem("userID");

    const formData = {
      name: name,
      phoneNumber: phoneNumber,
      location: location,
      rooms: rooms,
      university: university,
      description: description,
      ownerId: useID,
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
          <Input label="name" name="name" required />
          <Input label="phone number:" name="phoneNumber" required />
          <Input name="location" label="location" required />
          <Input label="rooms" type="number" name="rooms" required />
          <Input label="university" name="university" required />
          <Textarea
            id="AddhousingDiscription"
            label="description"
            name="description"
            required
          />
          <div className="bottuns">
            <input id="choose" type="file" name="files" required />
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

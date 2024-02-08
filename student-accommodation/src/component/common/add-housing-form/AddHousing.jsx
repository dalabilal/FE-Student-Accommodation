import Input from "../input/input.component";
import Textarea from "../textarea/textarea.component";
import "./addhousing.css";

const AddHousingForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const phoneNumber = e.target.phoneNumber.value;
        const location = e.target.location.value;
        const university = e.target.university.value;
        const rooms = e.target.rooms.value;
        const description = e.target.description.value;
        const useID = sessionStorage.getItem("userID");

        // Check for malicious input
        if (
            hasMaliciousInput(name) ||
            hasMaliciousInput(phoneNumber) ||
            hasMaliciousInput(location) ||
            hasMaliciousInput(university) ||
            hasMaliciousInput(rooms) ||
            hasMaliciousInput(description)
        ) {
            console.error("Malicious input detected. Form submission aborted.");
            return;
        }

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

     // Function to check for malicious input
     const hasMaliciousInput = (input) => {
      // Check for common patterns of malicious input, such as SQL injection or XSS
      const maliciousPatterns = [
          /<script.*?>.*?<\/script>/i, // Check for script tags
          /on(load|click|hover|etc)=/i, // Check for event handlers
          /javascript:/i, // Check for JavaScript code
          /<.*?(\b|on\w+)=.*?>/i, // Check for other HTML attributes with event handlers
      ];

      return maliciousPatterns.some(pattern => pattern.test(input));
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

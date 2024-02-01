import Input from "../input/input.component";
import Textarea from "../textarea/textarea.component";
import sanitizeHtml from 'sanitize-html';
import "./addterms.css";
import { useUser } from "../../../service/UserContext";

const AddTerms = (props) => {
  const idparam = sessionStorage.getItem('housingID');

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const fees = sanitizeHtml(e.target.fee.value, sanitizeOptions);
    const term = sanitizeHtml(e.target.terms.value, sanitizeOptions);
    const useID = sessionStorage.getItem('userID');

    const termData = {
      fees : fees,
      term :term,
      housingId :idparam,
      ownerId : useID
    };

    try {
      const response = await fetch("http://localhost:3005/term/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(termData),
      });

      if (response.ok) {
        console.log("terms submitted successfully");
        props.setPopup(false);
      } else {
        console.error("Failed to add terms");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="plur-popup">
      <div className="popup-container show">
        <div className="xDiv">
          <h2>Add Your Terms details</h2>
          <span id="x" onClick={() => props.setPopup(false)}>
            X
          </span>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/formData">
          <Input
            label="fees Per month $"
            type="number"
            name="fee"
            required
          />
          <Textarea
            label="provide your  terms "
            name="terms"
            required
          />
          <div className="bottuns">
            <button id="add" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTerms;
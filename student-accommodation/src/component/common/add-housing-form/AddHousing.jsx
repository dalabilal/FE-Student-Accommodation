import './addhousing.css'

const AddHousingForm = (props) => {
    return (
        <div className="plur-popup">
            <div className="popup-container show">
                <span onClick={() => props.setPopup(false)}>X</span>
                popup
            </div>
        </div>
    )
}

export default AddHousingForm

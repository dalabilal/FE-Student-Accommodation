import { useState } from 'react'
import Input from '../input/input.component'
import Textarea from '../textarea/textarea.component'
import './addhousing.css'

const AddHousingForm = (props) => {


    const handleSubmit = async (e) => {
  
        e.preventDefault();
        const name = e.target.name.value;
        const phoneNumber = e.target.phoneNumber.value;
        const location = e.target.location.value;
        const university = e.target.university.value;
        const rooms = e.target.rooms.value;
        const description = e.target.description.value;
        const files = e.target.files.files;
        console.log("files" , files);


        const formData ={
            name: name,
            phoneNumber: phoneNumber,
            location: location,
            rooms: rooms,
            university: university,
            description: description,
            files: files,
        }

        try {
            const response = await fetch('http://localhost:3005/all/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Housing data submitted successfully');
                props.setPopup(false);
            } else {
                console.error('Failed to submit housing data');
                console.log("formData" , formData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="plur-popup">
            <div className="popup-container show">
                <span onClick={() => props.setPopup(false)}>X</span>
                <form onSubmit={handleSubmit}>
                    <Input
                        label='name'
                        name='name'
                        required
                    />
                    <Input
                        label='phone number:'
                        name='phoneNumber'
                        required
                    />
                    <Input
                        name='location'
                        label='location'
                        required
                    />
                    <Input
                        label='rooms'
                        type='number'
                        name='rooms'
                        required
                    />
                    <Input
                        label='university'
                        name='university'
                        required
                    />
                    <Textarea
                        label='describtion'
                        name="description"
                        required
                    />
                    <input
                        type='file'
                        multiple
                        name='files'
                        required
                    />
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddHousingForm

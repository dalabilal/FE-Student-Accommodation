import { ToastContainer } from 'react-toastify';
import './notification.css';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const Notification = () => {

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )

};


export default Notification;
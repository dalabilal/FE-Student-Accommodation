import { useState } from 'react';
import { toast } from 'react-toastify';

const useNotification = () => {
    const [notification, setNotification] = useState({
        message: 'Welcome',
        status: 'info'
    });

    const showNotification = (notification) => {
        setNotification(notification);
        return new Promise(() => {
            notify(notification);
        });
    };

    const notify = (notification) => {
        switch (notification.status) {
            case 'info':
                toast.info(notification.message || "Message", {
                    position: "bottom-right",
                    autoClose: notification.autoClose || 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: notification.theme || "light",
                });
                break;
            case 'error':
                toast.error(notification.message || "Message",{
                    position: notification.position || "bottom-right",
                    autoClose: notification.autoClose || 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: notification.theme || "light",
                });
                break;
            case 'warning':
                toast.warn(notification.message || "Message", {
                    position: "bottom-right",
                    autoClose: notification.autoClose || 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: notification.theme || "light",
                });
                break;
            case 'success':
                toast.success(notification.message || "Message", {
                    position: "bottom-right",
                    autoClose: notification.autoClose || 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: notification.theme || "light",
                });
                break;
            default:
                toast.info(notification.message || "Message", {
                    position: "bottom-right",
                    autoClose: notification.autoClose || 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: notification.theme || "light",
                });
                break;
        }
    };

    return {
        setNotification: showNotification,
        notification: notification
    };
};

export default useNotification;

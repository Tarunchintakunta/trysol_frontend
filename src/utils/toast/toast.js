import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

export const showToastSuccess = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
    style: {
      backgroundColor:'black',
      color:"white",
      width: '500px', // Set the desired width
      height: '80px', // Set the desired height
      fontSize: '16px', // Optional: adjust font size
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export const showToastError = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 4500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
    style: {
      backgroundColor:'black',
      width: '500px', // Set the desired width
      height: '80px', // Set the desired height
      fontSize: '16px', // Optional: adjust font size
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

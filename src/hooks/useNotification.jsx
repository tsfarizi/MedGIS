import { useState } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  const closeNotification = () => {
    setNotification({ message: '', type: 'success' });
  };

  return {
    notification,
    setNotification,
    closeNotification,
  };
};

export default useNotification;

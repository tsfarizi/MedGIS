import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, type, onClose }) => {
  const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [message, onClose]);

  return (
    <div
      className={`z-50 fixed bottom-4 left-4 p-4 text-white rounded-lg shadow-lg ${backgroundColor} transition-transform transform ${
        message ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-xl font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Notification;

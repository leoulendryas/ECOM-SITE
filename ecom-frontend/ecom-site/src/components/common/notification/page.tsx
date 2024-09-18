import { FC, useEffect } from 'react';
import { FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';

interface NotificationProps {
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ type, message, onClose }) => {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="mr-2" />;
      case 'info':
        return <FaInfoCircle className="mr-2" />;
      case 'warning':
        return <FaExclamationTriangle className="mr-2" />;
      case 'error':
        return <FaTimesCircle className="mr-2" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`fixed top-5 right-5 flex items-center justify-between p-4 rounded-lg shadow-lg ${getStyles()}`} 
      style={{ zIndex: 999999 }}
    >
      <div className="flex items-center">
        {getIcon()}
        <div>
          <strong className="font-semibold capitalize">{type}</strong>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button onClick={onClose} className="ml-4 text-xl">
        <FaTimes />
      </button>
    </div>
  );
};

export default Notification;

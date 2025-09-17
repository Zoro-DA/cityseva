import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ToastNotification = ({ message, type = 'success', isVisible, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getToastConfig = (type) => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'var(--color-success)',
          icon: 'CheckCircle'
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'var(--color-error)',
          icon: 'XCircle'
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'var(--color-warning)',
          icon: 'AlertTriangle'
        };
      case 'info':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'var(--color-primary)',
          icon: 'Info'
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          iconColor: 'var(--color-muted-foreground)',
          icon: 'Bell'
        };
    }
  };

  const config = getToastConfig(type);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-sm ${config?.bgColor} ${config?.borderColor}`}>
        <div className="flex-shrink-0">
          <Icon 
            name={config?.icon} 
            size={20} 
            color={config?.iconColor} 
            strokeWidth={2}
          />
        </div>
        
        <div className="flex-1">
          <p className={`text-sm font-medium ${config?.textColor}`}>
            {message}
          </p>
        </div>
        
        <button
          onClick={onClose}
          className={`flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors ${config?.textColor}`}
        >
          <Icon name="X" size={16} color="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
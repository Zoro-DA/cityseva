import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          borderColor: 'border-orange-200',
          icon: 'Clock'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          borderColor: 'border-yellow-200',
          icon: 'RefreshCw'
        };
      case 'completed':
        return {
          label: 'Completed',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
          icon: 'CheckCircle'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
          icon: 'XCircle'
        };
      default:
        return {
          label: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200',
          icon: 'HelpCircle'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span className={`inline-flex items-center space-x-1 ${sizeClasses} font-medium rounded-full border ${config?.bgColor} ${config?.textColor} ${config?.borderColor}`}>
      <Icon 
        name={config?.icon} 
        size={iconSize} 
        color="currentColor" 
        strokeWidth={2}
      />
      <span>{config?.label}</span>
    </span>
  );
};

export default StatusBadge;
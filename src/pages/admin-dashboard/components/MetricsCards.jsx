import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCards = ({ totalReports, pendingReports, inProgressReports, completedReports }) => {
  const metrics = [
    {
      id: 'total',
      title: 'Total Reports',
      value: totalReports,
      icon: 'FileText',
      bgColor: 'bg-blue-50',
      iconColor: 'var(--color-primary)',
      textColor: 'text-blue-900'
    },
    {
      id: 'pending',
      title: 'Pending',
      value: pendingReports,
      icon: 'Clock',
      bgColor: 'bg-orange-50',
      iconColor: 'var(--color-warning)',
      textColor: 'text-orange-900'
    },
    {
      id: 'progress',
      title: 'In Progress',
      value: inProgressReports,
      icon: 'RefreshCw',
      bgColor: 'bg-yellow-50',
      iconColor: '#EAB308',
      textColor: 'text-yellow-900'
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completedReports,
      icon: 'CheckCircle',
      bgColor: 'bg-green-50',
      iconColor: 'var(--color-success)',
      textColor: 'text-green-900'
    }
  ];

  const completionRate = totalReports > 0 ? Math.round((completedReports / totalReports) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric) => (
        <div key={metric?.id} className={`${metric?.bgColor} rounded-lg p-6 border border-gray-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{metric?.title}</p>
              <p className={`text-3xl font-bold ${metric?.textColor}`}>{metric?.value}</p>
              {metric?.id === 'completed' && (
                <p className="text-xs text-gray-500 mt-1">{completionRate}% completion rate</p>
              )}
            </div>
            <div className={`w-12 h-12 ${metric?.bgColor} rounded-lg flex items-center justify-center border border-gray-200`}>
              <Icon 
                name={metric?.icon} 
                size={24} 
                color={metric?.iconColor} 
                strokeWidth={2}
              />
            </div>
          </div>
          
          {metric?.id === 'completed' && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
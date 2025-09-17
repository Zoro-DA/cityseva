import React from 'react';
import Icon from '../../../components/AppIcon';

const MapStats = ({ reports, isVisible = true }) => {
  if (!isVisible) return null;

  const totalReports = reports?.length;
  const pendingReports = reports?.filter(r => r?.status === 'pending')?.length;
  const inProgressReports = reports?.filter(r => r?.status === 'in_progress')?.length;
  const completedReports = reports?.filter(r => r?.status === 'completed')?.length;

  const stats = [
    {
      label: 'Total Reports',
      value: totalReports,
      icon: 'FileText',
      color: 'var(--color-primary)',
      bgColor: 'var(--color-primary)'
    },
    {
      label: 'Pending',
      value: pendingReports,
      icon: 'Clock',
      color: 'var(--color-warning)',
      bgColor: 'var(--color-warning)'
    },
    {
      label: 'In Progress',
      value: inProgressReports,
      icon: 'RefreshCw',
      color: 'var(--color-accent)',
      bgColor: 'var(--color-accent)'
    },
    {
      label: 'Completed',
      value: completedReports,
      icon: 'CheckCircle',
      color: 'var(--color-success)',
      bgColor: 'var(--color-success)'
    }
  ];

  return (
    <div className="fixed top-24 left-4 z-40 pointer-events-none">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-civic-lg p-4 pointer-events-auto">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="BarChart3" size={16} color="var(--color-foreground)" />
          <h3 className="text-sm font-medium text-foreground">Report Statistics</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {stats?.map((stat, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${stat?.bgColor}20` }}
              >
                <Icon 
                  name={stat?.icon} 
                  size={14} 
                  color={stat?.color} 
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat?.label}</p>
                <p className="text-sm font-semibold text-foreground">{stat?.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Insights */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Resolution Rate</span>
            <span className="font-medium text-foreground">
              {totalReports > 0 ? Math.round((completedReports / totalReports) * 100) : 0}%
            </span>
          </div>
          <div className="mt-1 w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-success h-1.5 rounded-full transition-all duration-300"
              style={{ 
                width: `${totalReports > 0 ? (completedReports / totalReports) * 100 : 0}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapStats;
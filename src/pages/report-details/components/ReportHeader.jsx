import React from 'react';
import Icon from '../../../components/AppIcon';

const ReportHeader = ({ report }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'in_progress':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'rejected':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'Clock';
      case 'in_progress':
        return 'RefreshCw';
      case 'completed':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'road':
        return 'Car';
      case 'garbage':
        return 'Trash2';
      case 'water':
        return 'Droplets';
      case 'electricity':
        return 'Zap';
      case 'drainage':
        return 'Waves';
      case 'streetlight':
        return 'Lightbulb';
      case 'park':
        return 'Trees';
      default:
        return 'AlertTriangle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-civic">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
        {/* Main Header Info */}
        <div className="flex-1">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon 
                name={getCategoryIcon(report?.category)} 
                size={24} 
                color="var(--color-primary)" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-foreground mb-2 break-words">
                {report?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{report?.city}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>{formatDate(report?.created_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Hash" size={16} />
                  <span>#{report?.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex-shrink-0">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${getStatusColor(report?.status)}`}>
            <Icon 
              name={getStatusIcon(report?.status)} 
              size={16} 
            />
            <span className="font-medium">{getStatusText(report?.status)}</span>
          </div>
        </div>
      </div>
      {/* Category and Priority */}
      <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 px-3 py-1 bg-muted/50 rounded-md">
          <Icon name="Tag" size={14} />
          <span className="text-sm font-medium text-foreground capitalize">
            {report?.category?.replace('_', ' ')}
          </span>
        </div>
        
        {report?.priority && (
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-md ${
            report?.priority === 'high' ? 'bg-error/10 text-error' :
            report?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
          }`}>
            <Icon name="AlertTriangle" size={14} />
            <span className="text-sm font-medium capitalize">{report?.priority} Priority</span>
          </div>
        )}

        {report?.updated_at && report?.updated_at !== report?.created_at && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="RefreshCw" size={14} />
            <span>Updated: {formatDate(report?.updated_at)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportHeader;
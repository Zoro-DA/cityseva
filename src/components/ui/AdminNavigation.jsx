import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Select from './Select';
import Input from './Input';
import Icon from '../AppIcon';

const AdminNavigation = ({ 
  onFilterChange, 
  onStatusFilter, 
  onDateFilter,
  totalReports = 0,
  pendingReports = 0,
  resolvedReports = 0 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');

  const statusOptions = [
    { value: 'all', label: 'All Reports' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleStatusChange = (value) => {
    setActiveFilter(value);
    if (onStatusFilter) {
      onStatusFilter(value);
    }
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    if (onFilterChange) {
      onFilterChange({ search: value, status: activeFilter, dateRange });
    }
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    if (onDateFilter) {
      onDateFilter(value);
    }
  };

  const handleExportData = () => {
    // Export functionality placeholder
    console.log('Exporting data...');
  };

  const handleRefreshData = () => {
    // Refresh functionality placeholder
    console.log('Refreshing data...');
    window.location?.reload();
  };

  const isOnDashboard = location?.pathname === '/admin-dashboard';

  if (!isOnDashboard) {
    return null;
  }

  return (
    <div className="bg-card border-b border-border shadow-civic">
      {/* Stats Overview */}
      <div className="px-6 py-4 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reports</p>
              <p className="text-2xl font-semibold text-foreground">{totalReports}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-foreground">{pendingReports}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-semibold text-foreground">{resolvedReports}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search reports, locations, or IDs..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full"
              />
            </div>
            
            <div className="flex space-x-3">
              <Select
                options={statusOptions}
                value={activeFilter}
                onChange={handleStatusChange}
                placeholder="Filter by status"
                className="min-w-[140px]"
              />
              
              <Select
                options={dateRangeOptions}
                value={dateRange}
                onChange={handleDateRangeChange}
                placeholder="Date range"
                className="min-w-[120px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleRefreshData}
              iconName="RefreshCw"
              iconPosition="left"
              iconSize={16}
              className="whitespace-nowrap"
            >
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="whitespace-nowrap"
            >
              <span className="hidden sm:inline">Export</span>
            </Button>
            
            <Button
              variant="default"
              onClick={() => navigate('/home-map-view')}
              iconName="Map"
              iconPosition="left"
              iconSize={16}
              className="whitespace-nowrap"
            >
              <span className="hidden sm:inline">View Map</span>
              <span className="sm:hidden">Map</span>
            </Button>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {(activeFilter !== 'all' || searchTerm || dateRange) && (
        <div className="px-6 py-3 bg-muted/30 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">Active filters:</span>
            
            {activeFilter !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                {statusOptions?.find(opt => opt?.value === activeFilter)?.label}
                <button
                  onClick={() => handleStatusChange('all')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent-foreground rounded-md text-xs font-medium">
                Search: "{searchTerm}"
                <button
                  onClick={() => {
                    setSearchTerm('');
                    if (onFilterChange) onFilterChange({ search: '', status: activeFilter, dateRange });
                  }}
                  className="ml-1 hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {dateRange && (
              <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary-foreground rounded-md text-xs font-medium">
                {dateRangeOptions?.find(opt => opt?.value === dateRange)?.label}
                <button
                  onClick={() => handleDateRangeChange('')}
                  className="ml-1 hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNavigation;
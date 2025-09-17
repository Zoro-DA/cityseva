import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import StatusBadge from './StatusBadge';

const ReportsTable = ({ reports, onStatusUpdate, onBulkUpdate, selectedReports, onSelectionChange }) => {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: 'created_at', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedReports = React.useMemo(() => {
    let sortableReports = [...reports];
    if (sortConfig?.key) {
      sortableReports?.sort((a, b) => {
        if (sortConfig?.key === 'created_at') {
          const aDate = new Date(a[sortConfig.key]);
          const bDate = new Date(b[sortConfig.key]);
          return sortConfig?.direction === 'asc' ? aDate - bDate : bDate - aDate;
        }
        
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableReports;
  }, [reports, sortConfig]);

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(reports?.map(report => report?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectReport = (reportId, checked) => {
    if (checked) {
      onSelectionChange([...selectedReports, reportId]);
    } else {
      onSelectionChange(selectedReports?.filter(id => id !== reportId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      'roads': 'Road',
      'water': 'Droplets',
      'electricity': 'Zap',
      'garbage': 'Trash2',
      'drainage': 'Waves',
      'streetlights': 'Lightbulb',
      'parks': 'Trees',
      'traffic': 'Car',
      'other': 'AlertCircle'
    };
    return categoryIcons?.[category] || 'AlertCircle';
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'pending': 'in_progress',
      'in_progress': 'completed',
      'completed': 'completed',
      'rejected': 'pending'
    };
    return statusFlow?.[currentStatus] || 'pending';
  };

  const getStatusActionLabel = (currentStatus) => {
    const labels = {
      'pending': 'Start Progress',
      'in_progress': 'Mark Complete',
      'completed': 'Completed',
      'rejected': 'Reopen'
    };
    return labels?.[currentStatus] || 'Update';
  };

  const isAllSelected = selectedReports?.length === reports?.length && reports?.length > 0;
  const isIndeterminate = selectedReports?.length > 0 && selectedReports?.length < reports?.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-6 py-4">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('created_at')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Date</span>
                  <Icon 
                    name={sortConfig?.key === 'created_at' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('city')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>City</span>
                  <Icon 
                    name={sortConfig?.key === 'city' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Category</span>
                  <Icon 
                    name={sortConfig?.key === 'category' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortConfig?.key === 'status' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedReports?.map((report) => (
              <tr key={report?.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Checkbox
                    checked={selectedReports?.includes(report?.id)}
                    onChange={(e) => handleSelectReport(report?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(report?.created_at)}</div>
                  <div className="text-xs text-gray-500">{formatTime(report?.created_at)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={report?.photo_url}
                        alt={report?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{report?.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{report?.description}</p>
                      <p className="text-xs text-gray-400 mt-1">ID: {report?.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
                    <span className="text-sm text-gray-900 capitalize">{report?.city}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Icon name={getCategoryIcon(report?.category)} size={14} color="var(--color-muted-foreground)" />
                    <span className="text-sm text-gray-900 capitalize">{report?.category?.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={report?.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/report-details?id=${encodeURIComponent(report?.id)}`)}
                      iconName="Eye"
                      iconPosition="left"
                      iconSize={14}
                    >
                      View
                    </Button>
                    {report?.status !== 'completed' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => onStatusUpdate(report?.id, getNextStatus(report?.status))}
                        iconName={report?.status === 'pending' ? 'Play' : 'CheckCircle'}
                        iconPosition="left"
                        iconSize={14}
                      >
                        {getStatusActionLabel(report?.status)}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {sortedReports?.map((report) => (
          <div key={report?.id} className="border-b border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedReports?.includes(report?.id)}
                onChange={(e) => handleSelectReport(report?.id, e?.target?.checked)}
                className="mt-1"
              />
              
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={report?.photo_url}
                  alt={report?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{report?.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{report?.description}</p>
                  </div>
                  <StatusBadge status={report?.status} size="sm" />
                </div>
                
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span className="capitalize">{report?.city}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name={getCategoryIcon(report?.category)} size={12} />
                    <span className="capitalize">{report?.category?.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(report?.created_at)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/report-details?id=${encodeURIComponent(report?.id)}`)}
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={12}
                  >
                    View
                  </Button>
                  {report?.status !== 'completed' && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onStatusUpdate(report?.id, getNextStatus(report?.status))}
                      iconName={report?.status === 'pending' ? 'Play' : 'CheckCircle'}
                      iconPosition="left"
                      iconSize={12}
                    >
                      {getStatusActionLabel(report?.status)}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {reports?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActionsBar = ({ selectedCount, onBulkStatusUpdate, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'pending', label: 'Mark as Pending' },
    { value: 'in_progress', label: 'Mark as In Progress' },
    { value: 'completed', label: 'Mark as Completed' },
    { value: 'rejected', label: 'Mark as Rejected' }
  ];

  const handleApplyAction = () => {
    if (selectedAction) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmAction = () => {
    if (onBulkStatusUpdate && selectedAction) {
      onBulkStatusUpdate(selectedAction);
      setSelectedAction('');
      setShowConfirmation(false);
    }
  };

  const handleCancelAction = () => {
    setShowConfirmation(false);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">
                {selectedCount} report{selectedCount > 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-blue-700">
                Choose an action to apply to all selected reports
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Select Action"
              className="min-w-[160px]"
            />
            
            <Button
              variant="default"
              onClick={handleApplyAction}
              disabled={!selectedAction}
              iconName="Play"
              iconPosition="left"
              iconSize={14}
            >
              Apply
            </Button>
            
            <Button
              variant="outline"
              onClick={onClearSelection}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Bulk Action</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-700">
                Are you sure you want to{' '}
                <span className="font-medium">
                  {actionOptions?.find(opt => opt?.value === selectedAction)?.label?.toLowerCase()}
                </span>{' '}
                for <span className="font-medium">{selectedCount}</span> selected report{selectedCount > 1 ? 's' : ''}?
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleCancelAction}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleConfirmAction}
                iconName="Check"
                iconPosition="left"
                iconSize={16}
              >
                Confirm Action
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsBar;
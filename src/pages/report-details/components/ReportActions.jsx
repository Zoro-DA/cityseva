import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReportActions = ({ report }) => {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);

  const handleReportSimilar = () => {
    // In a real app, this would open a report form with pre-filled category and location
    navigate('/home-map-view');
  };

  const handleShareReport = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `City Seva Report: ${report?.title}`,
          text: `Check out this civic issue report in ${report?.city}`,
          url: window.location?.href
        });
      } else {
        // Fallback to clipboard
        await navigator.clipboard?.writeText(window.location?.href);
        // In a real app, you'd show a toast notification here
        alert('Report link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleBackToMap = () => {
    navigate('/home-map-view');
  };

  const handleContactDepartment = () => {
    if (report?.contact_info?.phone) {
      window.open(`tel:${report?.contact_info?.phone}`, '_self');
    } else if (report?.contact_info?.email) {
      window.open(`mailto:${report?.contact_info?.email}?subject=Regarding Report ${report?.id}`, '_self');
    } else {
      // Generic municipal contact
      alert('Contact information will be available once the report is assigned to a department.');
    }
  };

  const canReportSimilar = report?.status !== 'completed';
  const hasContactInfo = report?.contact_info && (report?.contact_info?.phone || report?.contact_info?.email);

  return (
    <div className="bg-card border border-border rounded-lg shadow-civic">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Settings" size={20} />
          <span>Actions</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          What would you like to do?
        </p>
      </div>
      {/* Action Buttons */}
      <div className="p-6 space-y-4">
        {/* Primary Actions */}
        <div className="space-y-3">
          {canReportSimilar && (
            <Button
              variant="default"
              onClick={handleReportSimilar}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Report Similar Issue
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleShareReport}
            loading={isSharing}
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Share This Report
          </Button>

          {hasContactInfo && (
            <Button
              variant="outline"
              onClick={handleContactDepartment}
              iconName="Phone"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Contact Department
            </Button>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-4"></div>

        {/* Secondary Actions */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            onClick={handleBackToMap}
            iconName="ArrowLeft"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Back to Map
          </Button>
        </div>

        {/* Report Info */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                This report was submitted on {new Date(report.created_at)?.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}.
              </p>
              <p>
                Report ID: <span className="font-mono font-medium">{report?.id}</span>
              </p>
              {report?.status === 'completed' && (
                <p className="mt-2 text-success">
                  ✓ This issue has been resolved by the municipal authorities.
                </p>
              )}
              {report?.status === 'in_progress' && (
                <p className="mt-2 text-primary">
                  🔄 This issue is currently being addressed by the authorities.
                </p>
              )}
              {report?.status === 'pending' && (
                <p className="mt-2 text-warning">
                  ⏳ This report is pending review by the municipal authorities.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportActions;
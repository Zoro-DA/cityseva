import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FloatingActionButton = ({ onReportIssue, onAdminLogin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainAction = () => {
    if (onReportIssue) {
      onReportIssue();
    }
  };

  const handleAdminAction = () => {
    if (onAdminLogin) {
      onAdminLogin();
    }
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Desktop Version - Top Right */}
      <div className="hidden lg:block fixed top-24 right-6 z-40">
        <div className="flex flex-col space-y-3">
          <Button
            variant="default"
            onClick={handleMainAction}
            iconName="Plus"
            iconPosition="left"
            iconSize={20}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-civic-lg px-6 py-3 text-base font-medium rounded-lg transition-civic"
          >
            Report an Issue
          </Button>
          
          <Button
            variant="outline"
            onClick={handleAdminAction}
            iconName="Shield"
            iconPosition="left"
            iconSize={18}
            className="bg-card hover:bg-muted shadow-civic px-4 py-2 text-sm rounded-lg transition-civic"
          >
            Admin Login
          </Button>
        </div>
      </div>

      {/* Mobile Version - Bottom Right with Expandable Menu */}
      <div className="lg:hidden fixed bottom-6 right-4 z-40">
        <div className="flex flex-col items-end space-y-3">
          {/* Expanded Menu Items */}
          {isExpanded && (
            <div className="flex flex-col space-y-2 animate-in slide-in-from-bottom-2 duration-200">
              <Button
                variant="outline"
                onClick={handleAdminAction}
                iconName="Shield"
                size="icon"
                className="w-12 h-12 rounded-full bg-card hover:bg-muted shadow-civic"
              >
                <Icon name="Shield" size={20} color="var(--color-foreground)" />
              </Button>
              
              <div className="bg-card px-3 py-1 rounded-full shadow-civic">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Admin Login
                </span>
              </div>
            </div>
          )}

          {/* Main Action Button */}
          <div className="flex items-center space-x-2">
            {isExpanded && (
              <div className="bg-card px-3 py-1 rounded-full shadow-civic">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Report Issue
                </span>
              </div>
            )}
            
            <Button
              variant="default"
              onClick={isExpanded ? handleMainAction : toggleExpanded}
              size="icon"
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-civic-lg transition-civic"
            >
              <Icon 
                name={isExpanded ? "Plus" : "Menu"} 
                size={24} 
                color="var(--color-primary-foreground)"
                className={isExpanded ? "rotate-45 transition-transform duration-200" : "transition-transform duration-200"}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay to close expanded menu */}
      {isExpanded && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/20"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default FloatingActionButton;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

import Icon from '../AppIcon';

const MapOverlayControls = ({ onSearch, onReportIssue }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onSearch && searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
    }
  };

  const handleReportClick = () => {
    if (onReportIssue) {
      onReportIssue();
    } else {
      // Default behavior - could navigate to report form
      console.log('Report issue clicked');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="fixed top-20 left-4 right-4 z-40 pointer-events-none">
      <div className="max-w-md mx-auto space-y-3 pointer-events-auto">
        {/* Search Bar */}
        <div className={`bg-card shadow-civic-lg rounded-lg border border-border transition-civic ${
          isSearchFocused ? 'ring-2 ring-primary/20' : ''
        }`}>
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center">
              <div className="pl-4 pr-2">
                <Icon 
                  name="Search" 
                  size={20} 
                  color="var(--color-muted-foreground)" 
                />
              </div>
              <input
                type="text"
                placeholder="Search locations, reports, or areas..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="flex-1 py-3 pr-12 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 p-1 hover:bg-muted rounded-full transition-civic"
                >
                  <Icon 
                    name="X" 
                    size={16} 
                    color="var(--color-muted-foreground)" 
                  />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Report Issue Button */}
        <div className="flex justify-center">
          <Button
            variant="default"
            onClick={handleReportClick}
            iconName="Plus"
            iconPosition="left"
            iconSize={20}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-civic-lg px-6 py-3 text-base font-medium rounded-lg transition-civic"
          >
            Report an Issue
          </Button>
        </div>
      </div>

      {/* Quick Action Buttons - Mobile Optimized */}
      <div className="fixed bottom-6 right-4 flex flex-col space-y-3 pointer-events-auto lg:hidden">
        <Button
          variant="default"
          onClick={handleReportClick}
          iconName="Plus"
          size="icon"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-civic-lg"
        >
          <Icon name="Plus" size={24} color="var(--color-primary-foreground)" />
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/home-map-view')}
          size="icon"
          className="w-12 h-12 rounded-full bg-card hover:bg-muted shadow-civic"
        >
          <Icon name="Home" size={20} color="var(--color-foreground)" />
        </Button>
      </div>

      {/* Search Results Overlay - Placeholder for future implementation */}
      {searchQuery && isSearchFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-civic-lg max-h-64 overflow-y-auto">
          <div className="p-4 text-center text-muted-foreground">
            <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Search functionality will be integrated with map data</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapOverlayControls;
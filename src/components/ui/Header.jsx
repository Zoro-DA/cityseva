import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';
import { onAuth, logout } from '../../lib/auth';
import { userIsAdmin } from '../../lib/admin';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsub = onAuth(async (user) => {
      if (!user) { setIsAuthenticated(false); return; }
      setIsAuthenticated(true);
    });
    return () => unsub();
  }, [location?.pathname]);

  const handleLogoClick = () => {
    navigate('/home-map-view');
  };

  const handleAdminClick = () => {
    if (isAuthenticated) {
      navigate('/admin-dashboard');
    } else {
      navigate('/admin-login');
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/home-map-view');
  };

  const isAdminRoute = location?.pathname?.includes('/admin');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-civic">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div 
          className="flex items-center cursor-pointer transition-civic hover:opacity-80"
          onClick={handleLogoClick}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon 
                name="Building2" 
                size={24} 
                color="var(--color-primary-foreground)" 
                strokeWidth={2}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-semibold text-foreground leading-tight">
                City Seva
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                Civic Engagement Platform
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex items-center space-x-4">
          {/* Home Navigation - Only show if not on home page */}
          {location?.pathname !== '/home-map-view' && (
            <Button
              variant="ghost"
              onClick={handleLogoClick}
              iconName="Map"
              iconPosition="left"
              iconSize={18}
              className="hidden sm:flex"
            >
              Map View
            </Button>
          )}

          {/* Admin Section */}
          {isAdminRoute ? (
            <div className="flex items-center space-x-2">
              {isAuthenticated && (
                <>
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-md">
                    <Icon name="Shield" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">Admin</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="text-sm"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          ) : (
            <Button
              variant={isAuthenticated ? "default" : "outline"}
              onClick={handleAdminClick}
              iconName="Shield"
              iconPosition="left"
              iconSize={18}
              className="transition-civic"
            >
              <span className="hidden sm:inline">
                {isAuthenticated ? 'Dashboard' : 'Admin Login'}
              </span>
              <span className="sm:hidden">Admin</span>
            </Button>
          )}
        </div>
      </div>
      {/* Mobile Navigation Indicator */}
      {location?.pathname !== '/home-map-view' && (
        <div className="sm:hidden px-4 py-2 bg-muted/50 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Navigation" size={14} />
            <span>
              {location?.pathname === '/report-details' && 'Report Details'}
              {location?.pathname === '/admin-login' && 'Admin Login'}
              {location?.pathname === '/admin-dashboard' && 'Admin Dashboard'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
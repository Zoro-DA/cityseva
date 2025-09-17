import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import TrustIndicators from './components/TrustIndicators';
import LoginBackground from './components/LoginBackground';

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content Area */}
      <div className="relative pt-16 min-h-screen">
        <LoginBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                City Seva Administration
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Secure access portal for municipal administrators and government officials 
                managing civic reports across Indian cities
              </p>
            </div>

            {/* Login Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Login Form */}
              <div className="order-2 lg:order-1">
                <LoginForm />
              </div>

              {/* Trust Indicators */}
              <div className="order-1 lg:order-2">
                <TrustIndicators />
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-16 text-center">
              <div className="bg-card rounded-lg shadow-civic border border-border p-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Secure Government Platform
                </h3>
                <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                  City Seva provides a comprehensive civic engagement platform that enables 
                  efficient management of citizen reports, streamlined communication between 
                  municipal departments, and transparent tracking of issue resolution across 
                  Indian cities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-primary">24/7</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">Always Available</h4>
                    <p className="text-sm text-muted-foreground">
                      Round-the-clock access for emergency response
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-success">100+</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">Cities Connected</h4>
                    <p className="text-sm text-muted-foreground">
                      Serving municipalities across India
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-accent-foreground">99.9%</span>
                    </div>
                    <h4 className="font-medium text-foreground mb-1">Uptime Guarantee</h4>
                    <p className="text-sm text-muted-foreground">
                      Reliable service for critical operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-card border-t border-border mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                © {new Date()?.getFullYear()} City Seva - Government of India Initiative
              </p>
              <p className="text-xs text-muted-foreground">
                Developed under Digital India Program | All rights reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLogin;
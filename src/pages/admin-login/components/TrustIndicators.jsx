import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const certifications = [
    {
      id: 1,
      name: "Government of India",
      description: "Certified Digital Platform",
      icon: "Shield",
      verified: true
    },
    {
      id: 2,
      name: "Digital India Initiative",
      description: "Approved Civic Platform",
      icon: "CheckCircle",
      verified: true
    },
    {
      id: 3,
      name: "Municipal Corporation",
      description: "Authorized Service Provider",
      icon: "Building2",
      verified: true
    }
  ];

  const securityFeatures = [
    {
      id: 1,
      name: "SSL Encrypted",
      description: "256-bit encryption",
      icon: "Lock"
    },
    {
      id: 2,
      name: "Data Protection",
      description: "GDPR compliant",
      icon: "Database"
    },
    {
      id: 3,
      name: "Secure Authentication",
      description: "Multi-factor ready",
      icon: "Key"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Government Certifications */}
      <div className="bg-card rounded-lg shadow-civic border border-border p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Government Certified Platform
          </h3>
          <p className="text-sm text-muted-foreground">
            Trusted by municipal authorities across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={cert?.icon} size={20} color="var(--color-success)" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground truncate">
                    {cert?.name}
                  </p>
                  {cert?.verified && (
                    <Icon name="BadgeCheck" size={16} color="var(--color-success)" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="bg-card rounded-lg shadow-civic border border-border p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Enterprise Security
          </h3>
          <p className="text-sm text-muted-foreground">
            Your credentials are protected with industry-standard security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityFeatures?.map((feature) => (
            <div key={feature?.id} className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {feature?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-muted/30 rounded-lg border border-border p-6">
        <div className="text-center">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Need Help Accessing Your Account?
          </h4>
          <p className="text-xs text-muted-foreground mb-4">
            Contact your system administrator or IT support team for assistance
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={14} />
              <span>1800-XXX-XXXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={14} />
              <span>support@cityseva.gov.in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
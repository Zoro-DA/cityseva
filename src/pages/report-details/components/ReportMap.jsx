import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportMap = ({ report }) => {
  const handleOpenInGoogleMaps = () => {
    const { lat, lng } = report?.coordinates;
    const url = `https://www.google.com/maps?q=${lat},${lng}&z=16`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGetDirections = () => {
    const { lat, lng } = report?.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-civic overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Map" size={20} />
          <span>Location</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Exact location of the reported issue
        </p>
      </div>
      {/* Map Container */}
      <div className="relative">
        <div className="aspect-square bg-muted overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`Location of ${report?.title}`}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${report?.coordinates?.lat},${report?.coordinates?.lng}&z=16&output=embed`}
            className="border-0"
          />
        </div>

        {/* Map Overlay Info */}
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-civic">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
              <span className="font-medium text-foreground">{report?.city}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {report?.coordinates?.lat?.toFixed(6)}, {report?.coordinates?.lng?.toFixed(6)}
            </div>
          </div>
        </div>
      </div>
      {/* Map Actions */}
      <div className="p-4 space-y-3">
        <Button
          variant="default"
          onClick={handleOpenInGoogleMaps}
          iconName="ExternalLink"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Open in Google Maps
        </Button>
        
        <Button
          variant="outline"
          onClick={handleGetDirections}
          iconName="Navigation"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Get Directions
        </Button>

        {/* Location Details */}
        <div className="pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Latitude</span>
              <p className="font-mono text-foreground">{report?.coordinates?.lat?.toFixed(6)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Longitude</span>
              <p className="font-mono text-foreground">{report?.coordinates?.lng?.toFixed(6)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportMap;
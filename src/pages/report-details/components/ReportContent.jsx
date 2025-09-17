import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ReportContent = ({ report }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg shadow-civic overflow-hidden">
      {/* Report Image */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={report?.photo_url}
          alt={`Report: ${report?.title}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-2 text-muted-foreground">
              <Icon name="Image" size={48} className="opacity-50" />
              <span className="text-sm">Loading image...</span>
            </div>
          </div>
        )}
        
        {/* Image Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Icon name="Camera" size={16} />
              <span className="text-sm">Reported by citizen</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span className="text-sm">{report?.coordinates?.lat?.toFixed(4)}, {report?.coordinates?.lng?.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Report Description */}
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="FileText" size={20} />
            <span>Description</span>
          </h2>
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {report?.description}
            </p>
          </div>
        </div>

        {/* Additional Details */}
        {report?.additional_info && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Info" size={16} />
              <span>Additional Information</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              {report?.additional_info}
            </p>
          </div>
        )}

        {/* Contact Information */}
        {report?.contact_info && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Phone" size={16} />
              <span>Municipal Department Contact</span>
            </h3>
            <div className="space-y-1 text-sm">
              {report?.contact_info?.department && (
                <p className="text-foreground font-medium">{report?.contact_info?.department}</p>
              )}
              {report?.contact_info?.phone && (
                <p className="text-muted-foreground">Phone: {report?.contact_info?.phone}</p>
              )}
              {report?.contact_info?.email && (
                <p className="text-muted-foreground">Email: {report?.contact_info?.email}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportContent;
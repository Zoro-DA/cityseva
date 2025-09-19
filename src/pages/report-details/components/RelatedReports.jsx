import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { fetchReports } from '../../../lib/data';

const RelatedReports = ({ currentReportId, city, category }) => {
  const navigate = useNavigate();
  const [relatedReports, setRelatedReports] = useState([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const allReports = await fetchReports();
        const filtered = allReports
          .filter(r => r.id !== currentReportId) // exclude current report
          .filter(r => r.city === city || r.category === category) // match city or category
          .slice(0, 3); // limit to 3 like mockup
        setRelatedReports(filtered);
      } catch (err) {
        console.error('Failed to fetch related reports:', err);
      }
    };
    loadRelated();
  }, [currentReportId, city, category]);

  if (!relatedReports.length) {
    return null; // or show "No related reports"
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-civic overflow-hidden mt-6">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="List" size={20} />
          <span>Related Reports</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Other issues reported in {city}
        </p>
      </div>

      <div className="divide-y divide-border">
        {relatedReports.map(report => (
          <div
            key={report.id}
            className="flex items-start space-x-3 p-4 cursor-pointer hover:bg-muted/30"
            onClick={() => navigate(`/report-details?id=${report.id}`)}
          >
            <Image
              src={report.photo_url}
              alt={report.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{report.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {report.description}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  {report.category}
                </span>
                {report.created_at && (
                  <span>{new Date(report.created_at).toLocaleDateString()}</span>
                )}
                <span className="flex items-center gap-1">
                  <Icon name="AlertTriangle" size={14} />
                  {report.priority}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-primary ml-auto capitalize">
              {report.status}
            </span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border text-center">
        <Button
          variant="ghost"
          onClick={() => navigate(`/home-map-view?city=${city}`)}
        >
          <Icon name="Map" size={16} className="mr-2" />
          View All Reports on Map
        </Button>
      </div>
    </div>
  );
};

export default RelatedReports;

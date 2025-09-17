import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedReports = ({ currentReportId, city, category }) => {
  const navigate = useNavigate();

  // Mock related reports data
  const relatedReports = [
    {
      id: "RPT-2024-0892",
      title: "Broken streetlight near bus stop",
      description: "The streetlight has been flickering for weeks and now completely stopped working.",
      category: "streetlight",
      city: "Mumbai",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      photo_url: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "pending",
      created_at: "2024-09-10T14:30:00Z",
      priority: "medium"
    },
    {
      id: "RPT-2024-0893",
      title: "Pothole causing traffic issues",
      description: "Large pothole on main road causing vehicles to swerve dangerously.",
      category: "road",
      city: "Mumbai",
      coordinates: { lat: 19.0825, lng: 72.8811 },
      photo_url: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "in_progress",
      created_at: "2024-09-09T09:15:00Z",
      priority: "high"
    },
    {
      id: "RPT-2024-0894",
      title: "Garbage not collected for 3 days",
      description: "Residential area garbage bins overflowing, creating hygiene issues.",
      category: "garbage",
      city: "Mumbai",
      coordinates: { lat: 19.0896, lng: 72.8656 },
      photo_url: "https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "pending",
      created_at: "2024-09-08T16:45:00Z",
      priority: "medium"
    }
  ]?.filter(report => report?.id !== currentReportId);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 text-warning';
      case 'in_progress':
        return 'bg-primary/10 text-primary';
      case 'completed':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'road':
        return 'Car';
      case 'garbage':
        return 'Trash2';
      case 'water':
        return 'Droplets';
      case 'electricity':
        return 'Zap';
      case 'drainage':
        return 'Waves';
      case 'streetlight':
        return 'Lightbulb';
      case 'park':
        return 'Trees';
      default:
        return 'AlertTriangle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleReportClick = (reportId) => {
    // In a real app, this would navigate to the specific report
    navigate(`/report-details?id=${reportId}`);
  };

  const handleViewAllReports = () => {
    navigate('/home-map-view');
  };

  if (relatedReports?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-civic">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="MapPin" size={20} />
          <span>Related Reports</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Other issues reported in {city}
        </p>
      </div>
      {/* Related Reports List */}
      <div className="p-6 space-y-4">
        {relatedReports?.map((report) => (
          <div
            key={report?.id}
            className="flex space-x-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-civic cursor-pointer"
            onClick={() => handleReportClick(report?.id)}
          >
            {/* Report Image */}
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={report?.photo_url}
                alt={report?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Report Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-2">
                  {report?.title}
                </h3>
                <div className={`px-2 py-1 rounded-md text-xs font-medium ml-2 flex-shrink-0 ${getStatusColor(report?.status)}`}>
                  {report?.status?.replace('_', ' ')}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {report?.description}
              </p>
              
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name={getCategoryIcon(report?.category)} size={12} />
                  <span className="capitalize">{report?.category}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{formatDate(report?.created_at)}</span>
                </div>
                {report?.priority && (
                  <div className={`flex items-center space-x-1 ${
                    report?.priority === 'high' ? 'text-error' :
                    report?.priority === 'medium'? 'text-warning' : 'text-success'
                  }`}>
                    <Icon name="AlertTriangle" size={12} />
                    <span className="capitalize">{report?.priority}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="flex items-center">
              <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="p-6 pt-0">
        <Button
          variant="outline"
          onClick={handleViewAllReports}
          iconName="Map"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          View All Reports on Map
        </Button>
      </div>
    </div>
  );
};

export default RelatedReports;
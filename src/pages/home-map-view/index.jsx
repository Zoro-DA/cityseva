import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
import MapStats from './components/MapStats';
import { fetchReports } from '../../lib/data';

const HomeMapView = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
const [isLoading, setIsLoading] = useState(true);
  const [showStats, setShowStats] = useState(true);

  // Mock reports data
  const mockReports = [
    {
      id: "1",
      title: "Pothole on Main Road causing traffic issues",
      description: "Large pothole near the traffic signal is causing vehicles to swerve dangerously. Multiple vehicles have been damaged due to this road condition.",
      category: "roads",
      city: "mumbai",
      coordinates: { lat: 19.0760, lng: 72.8777 },
      photo_url: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "pending",
      created_at: "2025-01-10T10:30:00Z",
      updated_at: "2025-01-10T10:30:00Z"
    },
    {
      id: "2",
      title: "Garbage not collected for 3 days",
      description: "Residential area garbage has not been collected for the past 3 days. The smell is becoming unbearable and attracting stray animals.",
      category: "garbage",
      city: "delhi",
      coordinates: { lat: 28.6139, lng: 77.2090 },
      photo_url: "https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "in_progress",
      created_at: "2025-01-09T14:15:00Z",
      updated_at: "2025-01-11T09:20:00Z"
    },
    {
      id: "3",
      title: "Water supply disruption in residential area",
      description: "No water supply for the past 2 days in the entire residential complex. Residents are facing severe inconvenience.",
      category: "water",
      city: "bangalore",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      photo_url: "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "completed",
      created_at: "2025-01-08T08:45:00Z",
      updated_at: "2025-01-12T16:30:00Z"
    },
    {
      id: "4",
      title: "Street lights not working",
      description: "Multiple street lights are not functioning in the residential area, making it unsafe for pedestrians during night hours.",
      category: "streetlights",
      city: "hyderabad",
      coordinates: { lat: 17.3850, lng: 78.4867 },
      photo_url: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "pending",
      created_at: "2025-01-11T19:20:00Z",
      updated_at: "2025-01-11T19:20:00Z"
    },
    {
      id: "5",
      title: "Drainage system blocked causing waterlogging",
      description: "Heavy rains have caused severe waterlogging due to blocked drainage system. Water is entering residential buildings.",
      category: "drainage",
      city: "chennai",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      photo_url: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "in_progress",
      created_at: "2025-01-07T12:00:00Z",
      updated_at: "2025-01-10T14:45:00Z"
    },
    {
      id: "6",
      title: "Traffic signal malfunction at busy intersection",
      description: "Traffic signal is not working properly at the main intersection, causing traffic congestion and safety concerns.",
      category: "traffic",
      city: "pune",
      coordinates: { lat: 18.5204, lng: 73.8567 },
      photo_url: "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "pending",
      created_at: "2025-01-12T07:30:00Z",
      updated_at: "2025-01-12T07:30:00Z"
    },
    {
      id: "7",
      title: "Park maintenance required",
      description: "Public park equipment is damaged and needs immediate attention. Children\'s play area is unsafe for use.",
      category: "parks",
      city: "ahmedabad",
      coordinates: { lat: 23.0225, lng: 72.5714 },
      photo_url: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "completed",
      created_at: "2025-01-05T11:15:00Z",
      updated_at: "2025-01-09T15:20:00Z"
    },
    {
      id: "8",
      title: "Electricity pole damaged after storm",
      description: "Electrical pole is leaning dangerously after the recent storm. There\'s risk of power lines falling and causing accidents.",
      category: "electricity",
      city: "kolkata",
      coordinates: { lat: 22.5726, lng: 88.3639 },
      photo_url: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "in_progress",
      created_at: "2025-01-06T16:45:00Z",
      updated_at: "2025-01-08T10:30:00Z"
    }
  ];

  useEffect(() => {
  const loadReports = async () => {
    setIsLoading(true);
    try {
      const rows = await fetchReports();
      setReports(rows);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setIsLoading(false);
    }
  };
  loadReports();
}, []);;
const handleMarkerClick = (report) => {
    // Navigate to report details page
    navigate(`/report-details?id=${report.id}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const toggleStats = () => {
    setShowStats(!showStats);
  };

  return (
    <>
      <Helmet>
        <title>City Seva - Report Civic Issues | Interactive Map</title>
        <meta 
          name="description" 
          content="Report and track civic issues in your city through our interactive map. Help improve your community by reporting problems like road damage, garbage collection, water supply issues, and more." 
        />
        <meta name="keywords" content="civic issues, city problems, report issues, municipal services, India, citizen engagement" />
        <meta property="og:title" content="City Seva - Report Civic Issues" />
        <meta property="og:description" content="Interactive platform for reporting and tracking civic issues across Indian cities" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 h-screen">
          {/* Search Bar Overlay */}
          <div className="fixed top-20 left-4 right-4 z-40 pointer-events-none">
            <div className="max-w-md mx-auto pointer-events-auto">
              <SearchBar 
                onSearch={handleSearch}
                onClear={handleSearchClear}
                placeholder="Search reports, locations, or categories..."
              />
            </div>
          </div>

          {/* Map Container */}
          <div className="relative w-full h-full">
            <MapContainer
              reports={reports}
              onMarkerClick={handleMarkerClick}
              searchQuery={searchQuery}
            />
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
                <div className="bg-card p-6 rounded-lg shadow-civic-lg">
                  <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <div>
                      <p className="text-lg font-medium text-foreground">Loading City Seva</p>
                      <p className="text-sm text-muted-foreground">Fetching civic reports...</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Statistics */}
          <MapStats 
            reports={reports} 
            isVisible={showStats && !isLoading}
          />

          {/* Floating Action Buttons */}{/* Stats Toggle Button - Desktop Only */}
          <div className="hidden lg:block fixed bottom-6 left-4 z-40">
            <button
              onClick={toggleStats}
              className="bg-card hover:bg-muted border border-border rounded-lg p-2 shadow-civic transition-civic"
              title={showStats ? 'Hide Statistics' : 'Show Statistics'}
            >
              <div className="w-5 h-5 text-muted-foreground">
                {showStats ? '📊' : '📈'}
              </div>
            </button>
          </div>
        </main>

        
      </div>
    </>
  );
};

export default HomeMapView;
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ReportHeader from './components/ReportHeader';
import ReportContent from './components/ReportContent';
import ReportMap from './components/ReportMap';
import RelatedReports from './components/RelatedReports';
import ReportActions from './components/ReportActions';
import Icon from '../../components/AppIcon';
import { fetchReportById } from '../../lib/data';

// const location = useLocation();
// const stateReport = location.state?.report ?? null;

const ReportDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const reportId = searchParams?.get('id') || 'RPT-2024-0891';
    
    // Simulate API call
  // if (stateReport) {
  //   setReport(stateReport);
  //   setLoading(false);
  //   // hydrate in background (optional)
  //   (async () => {
  //     try {
  //       const fresh = await fetchReportById(stateReport.id);
  //       if (fresh) setReport(fresh);
  //     } catch {}
  //   })();
  //   return;
  // }

  // Fallback: fetch by id
  const fetchReport = async () => {
    setLoading(true);
    try {
      const foundReport = await fetchReportById(reportId);
      if (foundReport) setReport(foundReport);
      else setError('Report not found');
    } catch (err) {
      console.error(err);
      setError('Failed to load report details');
    } finally {
      setLoading(false);
    }
  };
  if (reportId) fetchReport();
}, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Loading report details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="AlertTriangle" size={32} color="var(--color-error)" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Report Not Found</h2>
                <p className="text-muted-foreground max-w-md">
                  {error || 'The report you are looking for does not exist or has been removed.'}
                </p>
                <button
                  onClick={() => navigate('/home-map-view')}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-civic"
                >
                  <Icon name="ArrowLeft" size={16} />
                  <span>Back to Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button
              onClick={() => navigate('/home-map-view')}
              className="hover:text-foreground transition-civic flex items-center space-x-1"
            >
              <Icon name="Map" size={14} />
              <span>Map View</span>
            </button>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">Report Details</span>
          </div>

          {/* Report Header */}
          <div className="mb-8">
            <ReportHeader report={report} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ReportContent report={report} />
              <div className="lg:hidden">
                <ReportMap report={report} />
              </div>
              <RelatedReports 
                currentReportId={report?.id}
                city={report?.city}
                category={report?.category}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <div className="hidden lg:block">
                <ReportMap report={report} />
              </div>
              <ReportActions report={report} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricsCards from './components/MetricsCards';
import FilterToolbar from './components/FilterToolbar';
import ReportsTable from './components/ReportsTable';
import BulkActionsBar from './components/BulkActionsBar';
import ToastNotification from './components/ToastNotification';
import { fetchReports, updateReportStatus } from '../../lib/data';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [toast, setToast] = useState({ message: '', type: 'success', isVisible: false });

  // Mock data for reports
  useEffect(() => {
    // If you still keep localStorage gate, leave it; otherwise rely on route guard.
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin-login');
      return;
    }
    (async () => {
      try {
        const rows = await fetchReports();
        setReports(rows);
        setFilteredReports(rows);
      } catch (e) {
        console.error('Failed to load reports', e);
      }
    })();
  }, [navigate]);

  const handleFilterChange = (filters) => {
    let filtered = [...reports];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(report =>
        report?.title?.toLowerCase()?.includes(searchTerm) ||
        report?.description?.toLowerCase()?.includes(searchTerm) ||
        report?.id?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply city filter
    if (filters?.city && filters?.city !== 'all') {
      filtered = filtered?.filter(report => report?.city === filters?.city);
    }

    // Apply category filter
    if (filters?.category && filters?.category !== 'all') {
      filtered = filtered?.filter(report => report?.category === filters?.category);
    }

    // Apply status filter
    if (filters?.status && filters?.status !== 'all') {
      filtered = filtered?.filter(report => report?.status === filters?.status);
    }

    setFilteredReports(filtered);
    setSelectedReports([]); // Clear selection when filters change
  };

  const handleStatusUpdate = async (reportId, newStatus) => {
    // optimistic update
    const prevReports = [...reports];
    const prevFiltered = [...filteredReports];
    setReports(prevReports.map(r => r.id === reportId ? { ...r, status: newStatus, updated_at: new Date().toISOString() } : r));
    setFilteredReports(prevFiltered.map(r => r.id === reportId ? { ...r, status: newStatus, updated_at: new Date().toISOString() } : r));

    try {
      await updateReportStatus(reportId, newStatus);
      showToast(`Report ${reportId} status updated to ${newStatus.replace('_', ' ')}`, 'success');
    } catch (e) {
      console.error('Failed to update status', e);
      // rollback
      setReports(prevReports);
      setFilteredReports(prevFiltered);
      showToast('Failed to update status. Please try again.', 'error');
    }
  };

  const handleBulkStatusUpdate = (newStatus) => {
    const updatedReports = reports?.map(report =>
      selectedReports?.includes(report?.id)
        ? { ...report, status: newStatus, updated_at: new Date()?.toISOString() }
        : report
    );

    setReports(updatedReports);
    setFilteredReports(updatedReports?.filter(report => 
      filteredReports?.some(filtered => filtered?.id === report?.id)
    ));

    showToast(`${selectedReports?.length} reports updated to ${newStatus?.replace('_', ' ')}`, 'success');
    setSelectedReports([]);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  // Calculate metrics
  const totalReports = reports?.length;
  const pendingReports = reports?.filter(report => report?.status === 'pending')?.length;
  const inProgressReports = reports?.filter(report => report?.status === 'in_progress')?.length;
  const completedReports = reports?.filter(report => report?.status === 'completed')?.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Manage and track civic reports across Indian cities
            </p>
          </div>

          {/* Metrics Cards */}
          <MetricsCards
            totalReports={totalReports}
            pendingReports={pendingReports}
            inProgressReports={inProgressReports}
            completedReports={completedReports}
          />

          {/* Filter Toolbar */}
          <FilterToolbar
            onFilterChange={handleFilterChange}
            resultCount={filteredReports?.length}
          />

          {/* Bulk Actions Bar */}
          <BulkActionsBar
            selectedCount={selectedReports?.length}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onClearSelection={() => setSelectedReports([])}
          />

          {/* Reports Table */}
          <ReportsTable reports={filteredReports} onStatusUpdate={handleStatusUpdate} selectedReports={selectedReports} onSelectionChange={setSelectedReports}
            onStatusUpdate={handleStatusUpdate}
            onBulkUpdate={handleBulkStatusUpdate}
            selectedReports={selectedReports}
            onSelectionChange={setSelectedReports}
          />
        </div>
      </main>
      {/* Toast Notification */}
      <ToastNotification
        message={toast?.message}
        type={toast?.type}
        isVisible={toast?.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default AdminDashboard;
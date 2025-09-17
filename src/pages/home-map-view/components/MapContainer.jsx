import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapContainer = ({ reports, onMarkerClick, searchQuery }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  // India bounds
  const INDIA_BOUNDS = [
    [68.1097, 6.4627], // Southwest coordinates
    [97.3954, 35.5133]  // Northeast coordinates
  ];

  useEffect(() => {
    if (map?.current) return; // Initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm-tiles'
          }
        ]
      },
      center: [78.9629, 20.5937], // Center of India
      zoom: 5,
      maxBounds: INDIA_BOUNDS,
      minZoom: 4,
      maxZoom: 18
    });

    // Add navigation controls
    map?.current?.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Fit to India bounds on load
    map?.current?.on('load', () => {
      map?.current?.fitBounds(INDIA_BOUNDS, {
        padding: 20
      });
      setMapLoaded(true);
    });

    return () => {
      if (map?.current) {
        map?.current?.remove();
      }
    };
  }, []);

  // Update markers when reports change
  useEffect(() => {
    if (!mapLoaded || !map?.current) return;

    // Clear existing markers
    markers?.current?.forEach(marker => marker?.remove());
    markers.current = [];

    // Filter reports based on search query
    const filteredReports = reports?.filter(report => {
      if (!searchQuery) return true;
      const query = searchQuery?.toLowerCase();
      return report?.title?.toLowerCase()?.includes(query) ||
             report?.description?.toLowerCase()?.includes(query) ||
             report?.city?.toLowerCase()?.includes(query) ||
             report?.category?.toLowerCase()?.includes(query);
    });

    // Add new markers
    filteredReports?.forEach(report => {
      const el = document.createElement('div');
      el.className = 'marker-container';
      el.innerHTML = `
        <div class="w-12 h-12 rounded-full border-2 border-white shadow-lg cursor-pointer overflow-hidden bg-card hover:scale-110 transition-transform duration-200" style="background-color: ${getStatusColor(report?.status)}">
          <img src="${report?.photo_url}" alt="${report?.title}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="w-full h-full flex items-center justify-center text-white font-bold text-xs" style="display: none;">
            ${report?.category?.charAt(0)?.toUpperCase()}
          </div>
        </div>
      `;

      const marker = new maplibregl.Marker(el)?.setLngLat([report?.coordinates?.lng, report?.coordinates?.lat])?.addTo(map?.current);

      // Add popup
      const popup = new maplibregl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false
      })?.setHTML(`
        <div class="p-3 min-w-[280px]">
          <div class="flex items-start space-x-3 mb-3">
            <img src="${report?.photo_url}" alt="${report?.title}" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" onerror="this.style.display='none'" />
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">${report?.title}</h3>
              <p class="text-xs text-gray-600 mb-2 line-clamp-2">${report?.description}</p>
              <div class="flex items-center space-x-2 mb-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style="background-color: ${getStatusColor(report?.status)}20; color: ${getStatusColor(report?.status)}">
                  ${report?.status?.replace('_', ' ')?.toUpperCase()}
                </span>
                <span class="text-xs text-gray-500">${report?.category}</span>
              </div>
              <p class="text-xs text-gray-500">${report?.city} • ${formatDate(report?.created_at)}</p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button onClick="window.handleViewDetails('${report?.id}')" class="flex-1 bg-blue-600 text-white text-xs py-2 px-3 rounded-md hover:bg-blue-700 transition-colors">
              View Details
            </button>
            <button onClick="window.open('https://www.google.com/maps?q=${report?.coordinates?.lat},${report?.coordinates?.lng}', '_blank')" class="flex-1 bg-gray-100 text-gray-700 text-xs py-2 px-3 rounded-md hover:bg-gray-200 transition-colors">
              Open in Maps
            </button>
          </div>
        </div>
      `);

      marker?.setPopup(popup);
      
      el?.addEventListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(report);
        }
      });

      markers?.current?.push(marker);
    });

    // Add global handler for view details
    window.handleViewDetails = (reportId) => {
      if (onMarkerClick) {
        const report = reports?.find(r => r?.id === reportId);
        if (report) {
          onMarkerClick(report);
        }
      }
    };

  }, [reports, searchQuery, mapLoaded, onMarkerClick]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'in_progress': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-muted/50 flex items-center justify-center">
          <div className="bg-card p-4 rounded-lg shadow-civic">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">Loading map...</span>
            </div>
          </div>
        </div>
      )}

      {/* Map attribution */}
      <div className="absolute bottom-2 right-2 bg-card/90 px-2 py-1 rounded text-xs text-muted-foreground">
        © OpenStreetMap contributors
      </div>
    </div>
  );
};

export default MapContainer;
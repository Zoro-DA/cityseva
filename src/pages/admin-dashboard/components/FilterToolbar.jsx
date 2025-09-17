import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterToolbar = ({ onFilterChange, resultCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'lucknow', label: 'Lucknow' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'roads', label: 'Roads & Infrastructure' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'garbage', label: 'Garbage Collection' },
    { value: 'drainage', label: 'Drainage' },
    { value: 'streetlights', label: 'Street Lights' },
    { value: 'parks', label: 'Parks & Recreation' },
    { value: 'traffic', label: 'Traffic Management' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    applyFilters({ search: value, city: selectedCity, category: selectedCategory, status: selectedStatus });
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    applyFilters({ search: searchTerm, city: value, category: selectedCategory, status: selectedStatus });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    applyFilters({ search: searchTerm, city: selectedCity, category: value, status: selectedStatus });
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    applyFilters({ search: searchTerm, city: selectedCity, category: selectedCategory, status: value });
  };

  const applyFilters = (filters) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedCategory('all');
    setSelectedStatus('all');
    applyFilters({ search: '', city: 'all', category: 'all', status: 'all' });
  };

  const hasActiveFilters = searchTerm || selectedCity !== 'all' || selectedCategory !== 'all' || selectedStatus !== 'all';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <Input
            type="search"
            placeholder="Search reports, locations, or IDs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={handleCityChange}
            placeholder="Select City"
            className="min-w-[140px]"
          />
          
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            placeholder="Select Category"
            className="min-w-[160px]"
          />
          
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            placeholder="Select Status"
            className="min-w-[140px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear Filters
            </Button>
          )}
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>
      {/* Results Count and Active Filters */}
      {(hasActiveFilters || resultCount !== undefined) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Icon name="Filter" size={16} />
              <span>
                {resultCount !== undefined ? `${resultCount} reports found` : 'Filters applied'}
              </span>
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center space-x-2">
                {searchTerm && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                    Search: "{searchTerm}"
                  </span>
                )}
                {selectedCity !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                    {cityOptions?.find(opt => opt?.value === selectedCity)?.label}
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium">
                    {categoryOptions?.find(opt => opt?.value === selectedCategory)?.label}
                  </span>
                )}
                {selectedStatus !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 rounded-md text-xs font-medium">
                    {statusOptions?.find(opt => opt?.value === selectedStatus)?.label}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;
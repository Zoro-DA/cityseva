import React, { useState, useEffect } from 'react';


import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, onClear, placeholder = "Search reports, locations, or categories..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Mock suggestions data
  const mockSuggestions = [
    { id: 1, text: 'Road damage in Mumbai', type: 'report', icon: 'AlertTriangle' },
    { id: 2, text: 'Garbage collection', type: 'category', icon: 'Trash2' },
    { id: 3, text: 'Water supply issues', type: 'category', icon: 'Droplets' },
    { id: 4, text: 'Delhi', type: 'location', icon: 'MapPin' },
    { id: 5, text: 'Street lights not working', type: 'report', icon: 'Lightbulb' },
    { id: 6, text: 'Bangalore', type: 'location', icon: 'MapPin' },
    { id: 7, text: 'Drainage problems', type: 'category', icon: 'Waves' },
    { id: 8, text: 'Traffic signal malfunction', type: 'report', icon: 'Traffic' }
  ];

  useEffect(() => {
    if (searchQuery?.trim() && isFocused) {
      // Filter suggestions based on search query
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )?.slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, isFocused]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.text);
    setSuggestions([]);
    setIsFocused(false);
    if (onSearch) {
      onSearch(suggestion?.text);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setSuggestions([]);
    if (onClear) {
      onClear();
    }
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSuggestions([]);
    setIsFocused(false);
    if (onSearch && searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'report': return 'FileText';
      case 'category': return 'Tag';
      case 'location': return 'MapPin';
      default: return 'Search';
    }
  };

  const getSuggestionTypeLabel = (type) => {
    switch (type) {
      case 'report': return 'Report';
      case 'category': return 'Category';
      case 'location': return 'Location';
      default: return '';
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`bg-card shadow-civic-lg rounded-lg border border-border transition-civic ${
          isFocused ? 'ring-2 ring-primary/20 border-primary' : ''
        }`}>
          <div className="flex items-center">
            <div className="pl-4 pr-2">
              <Icon 
                name="Search" 
                size={20} 
                color="var(--color-muted-foreground)" 
              />
            </div>
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                // Delay hiding suggestions to allow clicks
                setTimeout(() => setIsFocused(false), 200);
              }}
              className="flex-1 py-3 pr-12 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 p-1 hover:bg-muted rounded-full transition-civic"
              >
                <Icon 
                  name="X" 
                  size={16} 
                  color="var(--color-muted-foreground)" 
                />
              </button>
            )}
          </div>
        </div>
      </form>
      {/* Search Suggestions */}
      {suggestions?.length > 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-civic-lg max-h-64 overflow-y-auto z-50">
          <div className="py-2">
            {suggestions?.map((suggestion) => (
              <button
                key={suggestion?.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-muted transition-civic flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon 
                    name={getSuggestionIcon(suggestion?.type)} 
                    size={16} 
                    color="var(--color-muted-foreground)" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {suggestion?.text}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getSuggestionTypeLabel(suggestion?.type)}
                  </p>
                </div>
                <Icon 
                  name="ArrowUpRight" 
                  size={14} 
                  color="var(--color-muted-foreground)" 
                />
              </button>
            ))}
          </div>
          
          <div className="border-t border-border px-4 py-2">
            <p className="text-xs text-muted-foreground text-center">
              Press Enter to search for "{searchQuery}"
            </p>
          </div>
        </div>
      )}
      {/* No Results */}
      {searchQuery && suggestions?.length === 0 && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-civic-lg z-50">
          <div className="p-4 text-center">
            <Icon 
              name="Search" 
              size={24} 
              color="var(--color-muted-foreground)" 
              className="mx-auto mb-2 opacity-50" 
            />
            <p className="text-sm text-muted-foreground">
              No suggestions found for "{searchQuery}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Press Enter to search anyway
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
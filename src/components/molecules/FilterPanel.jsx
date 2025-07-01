import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

const FilterPanel = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  
  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa'];
  const amenities = ['Pool', 'Gym', 'Parking', 'Garden', 'Balcony', 'Fireplace', 'Elevator'];
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleArrayFilter = (key, value) => {
    const current = localFilters[key] || [];
    const newArray = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    handleFilterChange(key, newArray);
  };
  
  const clearFilters = () => {
    const clearedFilters = {
      priceMin: '',
      priceMax: '',
      propertyTypes: [],
      bedroomsMin: '',
      bathroomsMin: '',
      amenities: [],
      keywords: ''
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  
  const activeFiltersCount = Object.values(localFilters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== '' && value !== null && value !== undefined
  ).length;
  
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${isOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Badge variant="primary">{activeFiltersCount}</Badge>
            )}
            <Button variant="ghost" size="sm" onClick={onToggle} className="lg:hidden">
              <ApperIcon name="X" size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="Min Price"
              value={localFilters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={localFilters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>
        
        {/* Property Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Property Type</label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map(type => (
              <button
                key={type}
                onClick={() => handleArrayFilter('propertyTypes', type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  (localFilters.propertyTypes || []).includes(type)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Bedrooms</label>
            <select
              value={localFilters.bedroomsMin}
              onChange={(e) => handleFilterChange('bedroomsMin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Bathrooms</label>
            <select
              value={localFilters.bathroomsMin}
              onChange={(e) => handleFilterChange('bathroomsMin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
        
        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
          <div className="space-y-2">
            {amenities.map(amenity => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={(localFilters.amenities || []).includes(amenity)}
                  onChange={() => handleArrayFilter('amenities', amenity)}
                  className="rounded border-gray-300 text-primary focus:ring-primary/50"
                />
                <span className="ml-2 text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
          <input
            type="text"
            placeholder="e.g., modern, renovated, waterfront"
            value={localFilters.keywords}
            onChange={(e) => handleFilterChange('keywords', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
        
        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
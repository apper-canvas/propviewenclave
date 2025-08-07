import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/molecules/SearchBar';
import FilterPanel from '@/components/molecules/FilterPanel';
import PropertyMap from '@/components/organisms/PropertyMap';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { propertyService } from '@/services/api/propertyService';
import { savedPropertiesService } from '@/services/api/savedPropertiesService';

const MapView = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyTypes: [],
    bedroomsMin: '',
    bathroomsMin: '',
    amenities: [],
    keywords: ''
  });
  
  useEffect(() => {
    loadProperties();
    loadSavedProperties();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [properties, filters, searchTerm]);
  
  const loadProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await propertyService.getAll();
      setProperties(data);
    } catch (err) {
      setError('Failed to load properties. Please try again.');
      console.error('Error loading properties:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const loadSavedProperties = async () => {
    try {
      const data = await savedPropertiesService.getAll();
      setSavedProperties(data);
    } catch (err) {
      console.error('Error loading saved properties:', err);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...properties];
    
    // Apply search term
if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof property.address_c === 'object' && 
          (property.address_c?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           property.address_c?.state?.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    // Apply filters
if (filters.priceMin) {
      filtered = filtered.filter(property => property.price_c >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price_c <= parseInt(filters.priceMax));
    }
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => filters.propertyTypes.includes(property.propertyType_c));
    }
    if (filters.bedroomsMin) {
      filtered = filtered.filter(property => property.bedrooms_c >= parseInt(filters.bedroomsMin));
    }
    if (filters.bathroomsMin) {
      filtered = filtered.filter(property => property.bathrooms_c >= parseInt(filters.bathroomsMin));
    }
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property => {
        const amenities = typeof property.amenities_c === 'string' 
          ? property.amenities_c.split(',').map(a => a.trim())
          : Array.isArray(property.amenities_c) 
          ? property.amenities_c 
          : [];
        return filters.amenities.some(amenity => amenities.includes(amenity));
      });
    }
if (filters.keywords) {
      filtered = filtered.filter(property => {
        const amenities = typeof property.amenities_c === 'string' 
          ? property.amenities_c.split(',').map(a => a.trim())
          : Array.isArray(property.amenities_c) 
          ? property.amenities_c 
          : [];
        return property.description_c?.toLowerCase().includes(filters.keywords.toLowerCase()) ||
          amenities.some(amenity => 
            amenity.toLowerCase().includes(filters.keywords.toLowerCase())
          );
      });
    }
    
    setFilteredProperties(filtered);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handlePropertySelect = (property) => {
    navigate(`/property/${property.Id}`);
  };
  
  const clearAllFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      propertyTypes: [],
      bedroomsMin: '',
      bathroomsMin: '',
      amenities: [],
      keywords: ''
    });
    setSearchTerm('');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadProperties} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Map View
          </h1>
          
          {/* Search Bar */}
          <div className="mb-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by location..."
            />
          </div>
          
          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="Filter" size={16} />
                <span>Filters</span>
              </Button>
              
              <span className="text-gray-600">
                {filteredProperties.length} properties shown
              </span>
            </div>
            
            {searchTerm && (
              <Button
                variant="ghost"
                onClick={() => setSearchTerm('')}
                className="text-sm"
              >
                Clear search
              </Button>
            )}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-300px)]">
          {/* Filters */}
          {isFilterOpen && (
            <div className="lg:w-80 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
          )}
          
          {/* Map */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <Empty
                  title="No properties found"
                  message="Try adjusting your search criteria or filters to find more properties."
                  actionLabel="Clear All Filters"
                  onAction={clearAllFilters}
                  icon="Map"
                />
              </div>
            ) : (
              <PropertyMap
                properties={filteredProperties}
                onPropertySelect={handlePropertySelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
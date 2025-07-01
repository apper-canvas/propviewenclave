import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SearchBar from '@/components/molecules/SearchBar';
import FilterPanel from '@/components/molecules/FilterPanel';
import ViewToggle from '@/components/molecules/ViewToggle';
import SortDropdown from '@/components/molecules/SortDropdown';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import PropertyList from '@/components/organisms/PropertyList';
import PropertyMap from '@/components/organisms/PropertyMap';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { propertyService } from '@/services/api/propertyService';
import { savedPropertiesService } from '@/services/api/savedPropertiesService';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('grid');
  const [currentSort, setCurrentSort] = useState('newest');
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
    applyFiltersAndSort();
  }, [properties, filters, searchTerm, currentSort]);
  
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
  
  const applyFiltersAndSort = () => {
    let filtered = [...properties];
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters.priceMin) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.priceMax));
    }
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => filters.propertyTypes.includes(property.propertyType));
    }
    if (filters.bedroomsMin) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedroomsMin));
    }
    if (filters.bathroomsMin) {
      filtered = filtered.filter(property => property.bathrooms >= parseInt(filters.bathroomsMin));
    }
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.some(amenity => property.amenities.includes(amenity))
      );
    }
    if (filters.keywords) {
      filtered = filtered.filter(property =>
        property.description.toLowerCase().includes(filters.keywords.toLowerCase()) ||
        property.amenities.some(amenity => 
          amenity.toLowerCase().includes(filters.keywords.toLowerCase())
        )
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.listingDate) - new Date(a.listingDate);
        case 'oldest':
          return new Date(a.listingDate) - new Date(b.listingDate);
        case 'bedrooms-desc':
          return b.bedrooms - a.bedrooms;
        case 'sqft-desc':
          return b.squareFeet - a.squareFeet;
        default:
          return 0;
      }
    });
    
    setFilteredProperties(filtered);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleSaveProperty = async (property) => {
    try {
      const isCurrentlySaved = savedProperties.some(saved => saved.Id === property.Id);
      
      if (isCurrentlySaved) {
        await savedPropertiesService.delete(property.Id);
        setSavedProperties(prev => prev.filter(saved => saved.Id !== property.Id));
      } else {
        await savedPropertiesService.create(property);
        setSavedProperties(prev => [...prev, property]);
      }
    } catch (err) {
      toast.error('Failed to update saved properties');
      console.error('Error saving property:', err);
    }
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
  
  const renderContent = () => {
    if (loading) {
      return <Loading type={currentView} />;
    }
    
    if (error) {
      return <Error message={error} onRetry={loadProperties} />;
    }
    
    if (filteredProperties.length === 0) {
      return (
        <Empty
          title="No properties found"
          message="Try adjusting your search criteria or filters to find more properties."
          actionLabel="Clear All Filters"
          onAction={clearAllFilters}
          icon="Home"
        />
      );
    }
    
    switch (currentView) {
      case 'list':
        return (
          <PropertyList
            properties={filteredProperties}
            onSaveProperty={handleSaveProperty}
            savedProperties={savedProperties}
          />
        );
      case 'map':
        return (
          <PropertyMap
            properties={filteredProperties}
            onPropertySelect={(property) => console.log('Selected property:', property)}
          />
        );
      default:
        return (
          <PropertyGrid
            properties={filteredProperties}
            onSaveProperty={handleSaveProperty}
            savedProperties={savedProperties}
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Find Your Perfect Home
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing properties in your dream location with our comprehensive real estate platform
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by city, neighborhood, or property type..."
              className="bg-white/10 backdrop-blur-md rounded-xl p-2"
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Filter" size={16} />
                <span>Filters</span>
              </Button>
            </div>
            
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>
          
          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {filteredProperties.length} Properties Found
                </h2>
                {searchTerm && (
                  <p className="text-gray-600 mt-1">
                    Showing results for "{searchTerm}"
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <SortDropdown
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                />
                <ViewToggle
                  currentView={currentView}
                  onViewChange={setCurrentView}
                />
              </div>
            </div>
            
            {/* Results Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
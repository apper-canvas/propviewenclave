import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Card from '@/components/atoms/Card';
import ImageGallery from '@/components/molecules/ImageGallery';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { propertyService } from '@/services/api/propertyService';
import { savedPropertiesService } from '@/services/api/savedPropertiesService';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    loadProperty();
    checkIfSaved();
  }, [id]);
  
  const loadProperty = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await propertyService.getById(parseInt(id));
      setProperty(data);
    } catch (err) {
      setError('Failed to load property details. Please try again.');
      console.error('Error loading property:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const checkIfSaved = async () => {
    try {
      const savedProperties = await savedPropertiesService.getAll();
      setIsSaved(savedProperties.some(saved => saved.Id === parseInt(id)));
    } catch (err) {
      console.error('Error checking saved status:', err);
    }
  };
  
  const handleSaveProperty = async () => {
    try {
      if (isSaved) {
        await savedPropertiesService.delete(parseInt(id));
        setIsSaved(false);
        toast.success('Property removed from saved list');
      } else {
        await savedPropertiesService.create(property);
        setIsSaved(true);
        toast.success('Property saved successfully!');
      }
    } catch (err) {
      toast.error('Failed to update saved properties');
      console.error('Error saving property:', err);
    }
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading type="detail" />
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperty} />
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2"
      >
        <ApperIcon name="ArrowLeft" size={16} />
        <span>Back to Results</span>
      </Button>
      
      {/* Property Images */}
      <div className="mb-8">
        <ImageGallery images={property.images} title={property.title} />
      </div>
      
      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-display font-bold text-gray-900">
                  {property.title}
                </h1>
                <Badge variant="primary">{property.propertyType}</Badge>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <ApperIcon name="MapPin" size={16} className="mr-2" />
                <span>{property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}</span>
              </div>
              <div className="text-4xl font-display font-bold text-primary">
                {formatPrice(property.price)}
              </div>
            </div>
            
            <Button
              variant={isSaved ? "danger" : "outline"}
              onClick={handleSaveProperty}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Heart" size={16} fill={isSaved ? "currentColor" : "none"} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </Button>
          </div>
          
          {/* Key Features */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              Property Features
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Bed" className="text-primary" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">Bedrooms</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Bath" className="text-primary" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">Bathrooms</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Square" className="text-primary" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.squareFeet.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Square Feet</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ApperIcon name="Calendar" className="text-primary" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{property.yearBuilt}</div>
                <div className="text-sm text-gray-600">Year Built</div>
              </div>
            </div>
          </Card>
          
          {/* Description */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </Card>
          
          {/* Amenities */}
          <Card className="p-6">
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities.map(amenity => (
                <div key={amenity} className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="text-success" size={16} />
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card className="p-6">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Contact Agent
            </h3>
            <div className="space-y-4">
              <Button variant="primary" className="w-full">
                <ApperIcon name="Phone" size={16} className="mr-2" />
                Call Agent
              </Button>
              <Button variant="outline" className="w-full">
                <ApperIcon name="Mail" size={16} className="mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="w-full">
                <ApperIcon name="Calendar" size={16} className="mr-2" />
                Schedule Tour
              </Button>
            </div>
          </Card>
          
          {/* Property Details */}
          <Card className="p-6">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Property Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span className="text-gray-900 font-medium">{property.propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year Built</span>
                <span className="text-gray-900 font-medium">{property.yearBuilt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Square Feet</span>
                <span className="text-gray-900 font-medium">{property.squareFeet.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per sqft</span>
                <span className="text-gray-900 font-medium">
                  ${Math.round(property.price / property.squareFeet).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Listed</span>
                <span className="text-gray-900 font-medium">
                  {format(new Date(property.listingDate), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </Card>
          
          {/* Map Preview */}
          <Card className="p-6">
            <h3 className="text-lg font-display font-semibold text-gray-900 mb-4">
              Location
            </h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ApperIcon name="MapPin" size={32} className="text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Interactive Map</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>{property.address.street}</p>
              <p>{property.address.city}, {property.address.state} {property.address.zipCode}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const PropertyList = ({ properties, onSaveProperty, savedProperties = [] }) => {
  const navigate = useNavigate();
  
  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };
  
  const handleSaveClick = (e, property) => {
    e.stopPropagation();
    onSaveProperty(property);
    const isSaved = savedProperties.some(saved => saved.Id === property.Id);
    toast.success(isSaved ? 'Property removed from saved list' : 'Property saved successfully!');
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {properties.map((property, index) => {
        const isSaved = savedProperties.some(saved => saved.Id === property.Id);
        
        return (
          <motion.div
            key={property.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card hover className="cursor-pointer" onClick={() => handlePropertyClick(property.Id)}>
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-80 h-48 sm:h-auto">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" className="text-white bg-primary">
                      {property.propertyType}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-primary mb-1">
                        {formatPrice(property.price)}
                      </h3>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {property.title}
                      </h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleSaveClick(e, property)}
                      className={`p-2 rounded-full ${isSaved ? 'text-danger' : 'text-gray-400 hover:text-danger'}`}
                    >
                      <ApperIcon name="Heart" size={20} fill={isSaved ? "currentColor" : "none"} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <ApperIcon name="MapPin" size={16} className="mr-2" />
                    <span>{property.address.street}, {property.address.city}</span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-gray-700 mb-4">
                    <div className="flex items-center">
                      <ApperIcon name="Bed" size={16} className="mr-2" />
                      <span>{property.bedrooms} bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Bath" size={16} className="mr-2" />
                      <span>{property.bathrooms} bathrooms</span>
                    </div>
                    <div className="flex items-center">
                      <ApperIcon name="Square" size={16} className="mr-2" />
                      <span>{property.squareFeet.toLocaleString()} sqft</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {property.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map(amenity => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="default" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PropertyList;
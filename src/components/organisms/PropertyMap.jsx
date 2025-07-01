import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';

const PropertyMap = ({ properties, onPropertySelect }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  
  useEffect(() => {
    if (properties.length > 0) {
      // Calculate center based on properties
      const avgLat = properties.reduce((sum, prop) => sum + prop.coordinates.lat, 0) / properties.length;
      const avgLng = properties.reduce((sum, prop) => sum + prop.coordinates.lng, 0) / properties.length;
      setMapCenter({ lat: avgLat, lng: avgLng });
    }
  }, [properties]);
  
  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
    onPropertySelect?.(property);
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
    <div className="relative w-full h-96 lg:h-full bg-gray-200 rounded-lg overflow-hidden">
      {/* Map placeholder with property markers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="Map" size={48} className="text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Interactive Map View</p>
          <p className="text-sm text-gray-500">Showing {properties.length} properties</p>
        </div>
      </div>
      
      {/* Property markers */}
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="absolute cursor-pointer"
          style={{
            left: `${20 + (index % 5) * 15}%`,
            top: `${20 + Math.floor(index / 5) * 20}%`,
          }}
          onClick={() => handleMarkerClick(property)}
        >
          <div className="relative">
            <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow">
              {formatPrice(property.price)}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45 -mt-1"></div>
          </div>
        </motion.div>
      ))}
      
      {/* Selected property info */}
      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 z-10"
        >
          <Card className="p-4">
            <div className="flex items-start space-x-4">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-20 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-display font-bold text-primary">
                      {formatPrice(selectedProperty.price)}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {selectedProperty.title}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ApperIcon name="X" size={16} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
                  <div className="flex items-center">
                    <ApperIcon name="Bed" size={12} className="mr-1" />
                    <span>{selectedProperty.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Bath" size={12} className="mr-1" />
                    <span>{selectedProperty.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Square" size={12} className="mr-1" />
                    <span>{selectedProperty.squareFeet.toLocaleString()} sqft</span>
                  </div>
                </div>
                
                <Badge variant="primary" className="text-xs">
                  {selectedProperty.propertyType}
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyMap;
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const PropertyCard = ({ property, onSave, saved = false }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };
  
  const handleSaveClick = (e) => {
    e.stopPropagation();
    onSave(property);
    toast.success(saved ? 'Property removed from saved list' : 'Property saved successfully!');
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card hover className="cursor-pointer group" onClick={handleCardClick}>
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute top-4 left-4">
            <Badge variant="primary" className="text-white bg-primary">
              {property.propertyType}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveClick}
              className={`p-2 rounded-full ${saved ? 'text-danger bg-white/20' : 'text-white bg-black/20'} hover:bg-white/30`}
            >
              <ApperIcon name={saved ? "Heart" : "Heart"} size={20} fill={saved ? "currentColor" : "none"} />
            </Button>
          </div>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-2xl font-display font-bold text-white mb-1">
              {formatPrice(property.price)}
            </h3>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="font-display font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {property.title}
          </h4>
          
          <div className="flex items-center text-gray-600 mb-4">
            <ApperIcon name="MapPin" size={16} className="mr-2" />
            <span className="text-sm">{property.address.street}, {property.address.city}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <ApperIcon name="Bed" size={16} className="mr-1" />
                <span>{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Bath" size={16} className="mr-1" />
                <span>{property.bathrooms} baths</span>
              </div>
            </div>
            <div className="text-gray-500">
              {property.squareFeet.toLocaleString()} sqft
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
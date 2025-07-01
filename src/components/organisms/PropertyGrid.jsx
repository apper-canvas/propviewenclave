import { motion } from 'framer-motion';
import PropertyCard from '@/components/molecules/PropertyCard';

const PropertyGrid = ({ properties, onSaveProperty, savedProperties = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PropertyCard
            property={property}
            onSave={onSaveProperty}
            saved={savedProperties.some(saved => saved.Id === property.Id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyGrid;
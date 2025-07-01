import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  title = "No properties found",
  message = "Try adjusting your search criteria or filters to find more properties.",
  actionLabel = "Clear Filters",
  onAction,
  icon = "Home",
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="text-primary" size={40} />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {message}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="lg"
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Filter" size={16} />
          <span>{actionLabel}</span>
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;
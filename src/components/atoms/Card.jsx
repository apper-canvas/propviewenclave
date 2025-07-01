import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, ...props }) => {
  const baseClasses = 'bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden';
  const hoverClasses = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';
  
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
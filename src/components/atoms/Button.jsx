import { motion } from 'framer-motion';

const Button = ({ 
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl focus:ring-primary/50',
    secondary: 'bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white shadow-lg hover:shadow-xl focus:ring-secondary/50',
    accent: 'bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white shadow-lg hover:shadow-xl focus:ring-accent/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary/50',
    danger: 'bg-gradient-to-r from-danger to-danger/90 hover:from-danger/90 hover:to-danger text-white shadow-lg hover:shadow-xl focus:ring-danger/50'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg',
    xl: 'px-8 py-4 text-lg rounded-xl'
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && (
        <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Buy', href: '/', icon: 'Home' },
    { name: 'Rent', href: '/rent', icon: 'Key' },
    { name: 'Saved', href: '/saved', icon: 'Heart' },
    { name: 'Map View', href: '/map', icon: 'Map' }
  ];
  
  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Home" className="text-white" size={20} />
            </div>
            <span className="text-2xl font-display font-bold text-primary">PropView</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <ApperIcon name={item.icon} size={16} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <nav className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                }`}
              >
                <ApperIcon name={item.icon} size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
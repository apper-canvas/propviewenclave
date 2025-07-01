import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const SortDropdown = ({ currentSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const sortOptions = [
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'bedrooms-desc', label: 'Most Bedrooms' },
    { id: 'sqft-desc', label: 'Largest First' }
  ];
  
  const currentOption = sortOptions.find(option => option.id === currentSort);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <span className="text-sm font-medium text-gray-700">
          Sort: {currentOption?.label || 'Select'}
        </span>
        <ApperIcon 
          name="ChevronDown" 
          size={16} 
          className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {sortOptions.map(option => (
            <button
              key={option.id}
              onClick={() => {
                onSortChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                currentSort === option.id ? 'bg-primary/5 text-primary' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
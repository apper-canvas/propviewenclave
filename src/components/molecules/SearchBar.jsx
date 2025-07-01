import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search by location...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-lg"
        />
      </div>
      <Button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        size="sm"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
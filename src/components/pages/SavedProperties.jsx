import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import PropertyList from '@/components/organisms/PropertyList';
import ViewToggle from '@/components/molecules/ViewToggle';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { savedPropertiesService } from '@/services/api/savedPropertiesService';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('grid');
  
  useEffect(() => {
    loadSavedProperties();
  }, []);
  
  const loadSavedProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await savedPropertiesService.getAll();
      setSavedProperties(data);
    } catch (err) {
      setError('Failed to load saved properties. Please try again.');
      console.error('Error loading saved properties:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveProperty = async (property) => {
    try {
      await savedPropertiesService.delete(property.Id);
      setSavedProperties(prev => prev.filter(saved => saved.Id !== property.Id));
      toast.success('Property removed from saved list');
    } catch (err) {
      toast.error('Failed to remove property');
      console.error('Error removing property:', err);
    }
  };
  
  const renderContent = () => {
    if (loading) {
      return <Loading type={currentView} />;
    }
    
    if (error) {
      return <Error message={error} onRetry={loadSavedProperties} />;
    }
    
    if (savedProperties.length === 0) {
      return (
        <Empty
          title="No saved properties yet"
          message="Start exploring properties and save your favorites to see them here."
          actionLabel="Browse Properties"
          onAction={() => window.location.href = '/'}
          icon="Heart"
        />
      );
    }
    
    switch (currentView) {
      case 'list':
        return (
          <PropertyList
            properties={savedProperties}
            onSaveProperty={handleRemoveProperty}
            savedProperties={savedProperties}
          />
        );
      default:
        return (
          <PropertyGrid
            properties={savedProperties}
            onSaveProperty={handleRemoveProperty}
            savedProperties={savedProperties}
          />
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
          
          {savedProperties.length > 0 && (
            <div className="mt-4 sm:mt-0">
              <ViewToggle
                currentView={currentView}
                onViewChange={setCurrentView}
              />
            </div>
          )}
        </div>
        
        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SavedProperties;